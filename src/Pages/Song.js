import OsmdPlayer from "@clardiza/react-osmd-player";
import React, { useEffect, useState } from "react";
// import '../index.css'
// import '../Song.css'
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "@clardiza/react-osmd-player/dist/osmd-player.css";

function Song() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [song, setSong] = useState(null);
  // const song = songs.find((song) => song.id === parseInt(id)); old way if you have json

  useEffect(() => {
    async function loadSong() {
      const { data, error } = await supabase
        .from("songs_data")
        .select("*")
        .eq("id", id) // filter where id = 2
        .single(); // return a single object instead of an array

      if (error) {
        // window.location.href = '/404';
        console.log("hello");
      } else {
        console.log("Single song row:", data);
        setSong(data);
        // data is { id: 2, title: "...", artist: "...", … }
      }
      setLoading(false);
    }
    loadSong();
  }, []);

  // While fetching
  if (loading) {
    return <p>Loading song…</p>;
  }

  // At this point, `song` is guaranteed non-null so i can do this, i guess?
  const { title, artist, file, arranger, year, album, link, img } = song;

  const handleClick = () => {
    window.open(link, "_blank");
  };

  const handleBackClick = () => {
    window.location.href = "/"; // Navigate to the root page
  };
  return (
    <>
      <main className="min-h-[calc(100dvh-210px)] pt-6 mt-4 w-full">
        <div className="card w-full  mx-auto shadow-2xl bg-white rounded-2xl">
          <div className="relative flex p-[30px] gap-4">
            {/* Important to use ! when it starts with hidden. */}
            <div className="hidden sm:!block sm:min-w-40 sm:max-w-40 md:min-w-60 md:max-w-60 ">
              <img src={img} className="w-full aspect-square"></img>
            </div>
            <div className="w-full">
              <p className="font-sunflower text-xl sm:!text-2xl md:!text-4xl font-bold mt-0 mb-0">
                {title}
              </p>
              {/* Bug in tailwind responsive behavior when starting the size with text-xs. 
                  Using text-[12px] as a workaround 
                  <p className="text-[12px] sm:text-sm md:text-base"><span className="font-semibold">By:</span> {artist}</p>
                  FIX: Use ! to override 
                  <p className="text-xs sm:!text-sm md:!text-base"><span className="font-semibold">By:</span> {artist}</p>
              */}
              <p className="text-xs sm:!text-sm md:!text-base">
                <span className="font-semibold">By:</span> {artist}
              </p>
              <p className="text-xs sm:!text-sm md:!text-base">
                <span className="font-semibold">Arranged by:</span> {arranger}
              </p>
              <p className="text-xs sm:!text-sm md:!text-base">
                <span className="font-semibold">Released:</span> {year}
              </p>
              <p className="text-xs sm:!text-sm md:!text-base">
                <span className="font-semibold">Album:</span> {album}
              </p>

              {/* <button className="btn btn-success" onClick={handleClick}>
                Listen on Spotify
              </button> */}
            </div>
            <div>
              <button
                onClick={handleBackClick}
                className="btn btn-sm md:!btn-md"
              >
                Back
              </button>
            </div>
          </div>
          <p></p>

          <div className="p-[30px]">
            {/* <OsmdPlayer filename={`/assets/songs/${file}`} height="600px"/> */}
            <OsmdPlayer
              filename={file}
              height="600px"
              inheritHostTheme={true}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default Song;
