import React, { useEffect, useState } from "react";
// import "@clardiza/react-osmd-player/dist/index.css"; // this is required

// import "../App.css";
// import "../Directory.css";
import { supabase } from "../supabaseClient";
import SearchBar from "../Components/SearchBar";
import SongList from "../Components/SongList";

function Directory() {
  const [songs, setSongs] = useState([]); // raw data
  const [filtered, setFiltered] = useState([]); // list to display
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const { data } = await supabase
          .from("songs_data") // table name
          .select("*"); // select all columns

        if (data == null) {
          data = [];
        }

        setSongs(data);
        setFiltered(data);
      } catch (error) {
        console.log("Error fetching songs");
      } finally {
        setLoading(false);
      }
    };
    loadSongs();
  }, []);

  if (loading) {
    return <h3>Loading Songs...</h3>;
  }

  return (
    <main className="min-h-[calc(100dvh-210px)] pt-6 mt-4 w-full">
      <div className="card w-full  mx-auto shadow-2xl bg-white rounded-2xl">
        <h1 className="p-[20px] pb-[15px] text-2xl sm:text-3xl md:text-4xl font-bold">
          Directory
        </h1>

        <div className="p-[20px] pt-0 font-sans">
          <SearchBar
            // value={searchTerm}
            // onChange={(e) => {setSearchTerm(e.target.value)}}
            songs={songs}
            onResult={setFiltered}
            filterBy={["title", "artist", "arranger"]}
          />
          {/* the search bar takes songs (all songs). onResult is a function that basically the filtered list that search bar returns and 
                sets it to the state in here. filterby is the list of categories to look for */}
          <SongList songs={filtered} />{" "}
          {/* renders what search bar sends back */}
        </div>
      </div>
    </main>
  );
}

export default Directory;
