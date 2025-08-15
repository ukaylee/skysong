import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import FileUpload from "./FileUpload";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../AuthContext.js";

function EditSong({ songId: propSongId }) {
  // allow either prop or route param
  const params = useParams?.() ?? {};
  const songIdParam = propSongId ?? params.songId;

  const { session } = useAuth();

  // data state
  const [song, setSong] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [xmlUrl, setXmlUrl] = useState("");

  // initialize form with empty strings so inputs render safely
  const [formValues, setFormValues] = useState({
    title: "",
    artist: "",
    arranger: "",
    year: "",
    album: "",
  });

  const DEFAULT_IMAGE_URL =
    "https://vkwhwvnikhgazzsfhlqx.supabase.co/storage/v1/object/public/songs-data/img/404.png";

  // fetch session once and subscribe to auth changes.... this should maybe be a component
  //   useEffect(() => {
  //     let mounted = true;

  //     const init = async () => {
  //       try {
  //         const { data } = await supabase.auth.getSession();
  //         if (!mounted) return;
  //         setSession(data?.session ?? null);
  //       } catch (err) {
  //         console.error("Failed to get session", err);
  //         if (mounted) setSession(null);
  //       }
  //     };

  //     init();

  //     const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
  //       setSession(newSession ?? null);
  //     });

  //     return () => {
  //       mounted = false;
  //       if (authListener && authListener.subscription) {
  //         authListener.subscription.unsubscribe();
  //       }
  //     };
  //   }, []);

  // load the song when component mounts or songId/session changes
  useEffect(() => {
    // we use songIdParam (string from params) but rely on fetched song.id for updates
    if (!songIdParam) return;
    if (session === undefined) return; // still loading session
    // optionally require auth to view/edit; if you want to allow anonymous view, remove the session === null check
    if (session === null) {
      toast.warn("You must be signed in to edit this song.");
      return;
    }

    const loadSong = async () => {
      try {
        const { data, error } = await supabase
          .from("songs_data")
          .select("*")
          .eq("id", songIdParam)
          .single();

        if (error) {
          console.error("Supabase error fetching song:", error);
          toast.error("Failed to fetch song data.");
          return;
        }

        if (!data) {
          toast.warn("Song not found.");
          return;
        }

        // ownership check
        if (data.user_id !== session?.user?.id) {
          toast.warn("No permissions to edit this song.");
          window.location.href = `/404/invalid-auth`;
          return;
        }

        setSong(data);
        setFormValues({
          title: data.title ?? "",
          artist: data.artist ?? "",
          arranger: data.arranger ?? "",
          year: data.year ?? "",
          album: data.album ?? "",
        });
        setImgUrl(data.img ?? "");
        setXmlUrl(data.file ?? "");
      } catch (err) {
        console.error("Unexpected error loading song:", err);
        toast.error("Unexpected error loading song.");
      }
    };

    loadSong();
  }, [songIdParam, session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // handle submit (update if song exists, insert if not)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // logs for debugging
    console.log("handleSubmit fired", {
      songIdParam,
      song,
      formValues,
      imgUrl,
      xmlUrl,
      session,
    });

    // basic validation
    const isEmptyField = Object.values(formValues).some(
      (v) => String(v ?? "").trim() === ""
    );
    if (isEmptyField) {
      toast.warn("Please fill out all form fields.");
      return;
    }
    if (!xmlUrl) {
      toast.warn("Please upload an XML file.");
      return;
    }

    const imageToUse = imgUrl || DEFAULT_IMAGE_URL;
    const payload = { ...formValues, img: imageToUse, file: xmlUrl };

    try {
      if (song) {
        // EDIT existing row — prefer the id from fetched song to avoid type mismatches
        const idToUse = song.id ?? songIdParam;
        console.log("DEBUG: updating id:", idToUse, "payload:", payload);

        const { data, error } = await supabase
          .from("songs_data")
          .update(payload)
          .eq("id", idToUse)
          .select();

        console.log("DEBUG: update response", { data, error });

        if (error) {
          console.error("Supabase update error:", error);
          toast.error(
            "Update failed: " + (error.message || JSON.stringify(error))
          );
          return;
        }

        if (!data || data.length === 0) {
          console.warn(
            "Update returned no rows — possible RLS or id mismatch."
          );
          toast.warn(
            "Update did not change any rows. Check permissions and id."
          );
          return;
        }

        // success
        toast.success("Song updated successfully!");
        setSong(data[0]);
      } else {
        // INSERT new row (create mode) — include user_id from session if desired
        const toInsert = {
          ...payload,
          link: "https://open.spotify.com/track/5wyRzU2e13V1X3tAuTVH7b",
          user_id: session?.user?.id ?? null,
        };

        console.log("DEBUG: inserting", toInsert);

        const { data, error } = await supabase
          .from("songs_data")
          .insert([toInsert])
          .select();

        console.log("DEBUG: insert response", { data, error });

        if (error) {
          console.error("Supabase insert error:", error);
          toast.error(
            "Insert failed: " + (error.message || JSON.stringify(error))
          );
          return;
        }

        toast.success("Song uploaded successfully!");
        // reset form
        setFormValues({
          title: "",
          artist: "",
          arranger: "",
          year: "",
          album: "",
        });
        setImgUrl("");
        setXmlUrl("");
        // optional: navigate to the created song or setSong(data[0])
      }
    } catch (err) {
      console.error("Supabase error:", err);
      toast.error("Failed to save song.");
    }
  };

  return (
    <main className="min-h-[calc(100dvh-210px)] pt-6 mt-8">
      <div className="card w-full max-w-3xl mx-auto shadow-2xl bg-white rounded-2xl">
        <div className="card-body p-8">
          <h2 className="card-title justify-center text-3xl">
            {song ? "Edit Song" : "Add a New Song"}
          </h2>

          <form onSubmit={handleSubmit} className="p-5">
            <fieldset className="fieldset border border-base-300 rounded-box p-6 bg-base-100">
              <legend className="fieldset-legend">Song Details</legend>

              <div className="space-y-5">
                {/* Title */}
                <div className="form-control w-full">
                  <label htmlFor="title" className="label p-0">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formValues.title}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Artist */}
                <div className="form-control w-full">
                  <label htmlFor="artist" className="label p-0">
                    <span className="label-text">Artist</span>
                  </label>
                  <input
                    id="artist"
                    name="artist"
                    type="text"
                    value={formValues.artist}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Arranger */}
                <div className="form-control w-full">
                  <label htmlFor="arranger" className="label p-0">
                    <span className="label-text">Arranged by</span>
                  </label>
                  <input
                    id="arranger"
                    name="arranger"
                    type="text"
                    value={formValues.arranger}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Year */}
                <div className="form-control w-full">
                  <label htmlFor="year" className="label p-0">
                    <span className="label-text">Release year</span>
                  </label>
                  <input
                    id="year"
                    name="year"
                    type="text"
                    value={formValues.year}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Album */}
                <div className="form-control w-full">
                  <label htmlFor="album" className="label p-0">
                    <span className="label-text">Album</span>
                  </label>
                  <input
                    id="album"
                    name="album"
                    type="text"
                    value={formValues.album}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
            </fieldset>

            {/* Uploads */}
            <div className="mt-6 space-y-4">
              <div>
                <p className="mb-2">Image upload</p>
                <FileUpload
                  folder="img"
                  type="image"
                  onUploadComplete={setImgUrl}
                />
                {imgUrl && (
                  <p className="text-success mt-1">✅ Image uploaded</p>
                )}
              </div>

              <div>
                <p className="mb-2">XML file upload</p>
                <FileUpload
                  folder="file"
                  type="xml"
                  onUploadComplete={setXmlUrl}
                />
                {xmlUrl && <p className="text-success mt-1">✅ XML uploaded</p>}
              </div>
            </div>

            <button type="submit" className="btn btn-info mt-6 w-full">
              {song ? "Save Changes" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default EditSong;
