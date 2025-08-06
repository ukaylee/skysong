import React from "react";
import '@clardiza/react-osmd-player/dist/index.css';          // this is required
import Song from "./Song";
import songs from "./songs.js";
import "./App.css";

function SongPage() {
  return (
    <div>
      {songs.map((song) => (
        <Song 
        // song={song}
        />
      ))
      }
    </div>
  );
}

export default SongPage;