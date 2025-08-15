import OsmdPlayer from "@clardiza/react-osmd-player";
import React, { useEffect, useState } from "react";
// import '../index.css'
// import '../Song.css'
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

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
      <main className="min-h-[calc(100dvh-210px)] pt-6 mt-8 w-full">
        <div className="card w-full  mx-auto shadow-2xl bg-white rounded-2xl">
          <div className="relative flex">
            {/* <img src={`/assets/images/${img}`} className='max-w-[300px] aspect-square p-[30px]'></img> */}
            <img
              src={img}
              className="max-w-[300px] aspect-square p-[30px]"
            ></img>

            <div className="p-[30px]">
              <h2 className="font-sunflower text-[70px] mt-0 mb-0">{title}</h2>
              <p>By {artist}</p>
              <p>Arranged by {arranger}</p>
              <p>Released: {year}</p>
              <p>Album: {album}</p>
              <button className="btn btn-success" onClick={handleClick}>
                Listen on Spotify
              </button>
            </div>
            <button
              onClick={handleBackClick}
              className="p-[30px] m-[30px] btn btn-dark absolute top-0 right-0 text-center text-[16px] leading-[0] ml-auto"
            >
              Back
            </button>
          </div>
          <p></p>

          <div className="p-[30px]">
            {/* <OsmdPlayer filename={`/assets/songs/${file}`} height="600px"/> */}
            <OsmdPlayer filename={file} height="600px" />
          </div>
        </div>
      </main>
    </>
  );
}

export default Song;
