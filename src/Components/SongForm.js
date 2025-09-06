import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import FileUpload from "./FileUpload";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../AuthContext.js";

function SongForm() {
  const [formValues, setFormValues] = useState({
    title: "",
    artist: "",
    arranger: "",
    year: "",
    album: "",
    // link: "",
  });

  const [submittedValues, setSubmittedValues] = useState(null);

  const [imgUrl, setImgUrl] = useState("");
  const [xmlUrl, setXmlUrl] = useState("");

  const { session } = useAuth();

  if (session === undefined) {
    // still loading session
    return <p>Loading...</p>;
  }

  if (session === null) {
    // not logged in
    return <p>You must be logged in.</p>;
  }

  // session is an object here
  const user = session.user;

  // check for the correct user
  if (user.is_admin === false) {
    return <p>Access denied: Not an Admin</p>;
  }

  // Update formValues on every input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const DEFAULT_IMAGE_URL =
    "https://vkwhwvnikhgazzsfhlqx.supabase.co/storage/v1/object/public/songs-data/img/404.png";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit fired");
    setSubmittedValues(formValues);
    // Optionally reset the form:
    // setFormValues({ name: '', email: '' });

    // Check for empty text fields
    const isEmptyField = Object.values(formValues).some(
      (value) => value.trim() === ""
    );
    if (isEmptyField) {
      alert("Please fill out all form fields.");
      return;
    }

    // Check for missing files
    if (!xmlUrl) {
      alert("Please upload an XML file.");
      return;
    }

    const imageToUse = imgUrl || DEFAULT_IMAGE_URL;

    try {
      const { data, error } = await supabase.from("songs_data").insert([
        {
          ...formValues, //all form values instead of just whatever
          img: imageToUse,
          file: xmlUrl,
          link: "https://open.spotify.com/track/5wyRzU2e13V1X3tAuTVH7b",
        },
      ]);
      console.log("registered");

      if (error) throw error; // ⇠ will jump to catch
      toast.success("Song uploaded successfully!");
      console.log("row inserted", data);

      setFormValues({
        title: "",
        artist: "",
        arranger: "",
        year: "",
        album: "",
      });
      setImgUrl("");
      setXmlUrl("");
    } catch (err) {
      toast.error("Failed to upload song");
      console.error("Supabase insert error:", err);
    }
  };

  return (
    <main className="min-h-[calc(100dvh-210px)] pt-6 mt-8">
      <div className="card w-full max-w-3xl mx-auto shadow-2xl bg-white rounded-2xl">
        <div className="card-body p-8">
          <h2 className="card-title justify-center text-3xl">Add a New Song</h2>

          <form onSubmit={handleSubmit} className="p-5">
            <fieldset className="fieldset border border-base-300 rounded-box p-6 bg-base-100">
              <legend className="fieldset-legend">Song Details</legend>

              {/* spacing BETWEEN groups */}
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
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default SongForm;
