import React, { useEffect, useState } from "react";
import '@clardiza/react-osmd-player/dist/index.css';          // this is required

import "./App.css";
import { supabase } from './supabaseClient';
import { Link } from "react-router-dom";


function Directory() {
    const [songResults, setSongResults]=useState([]); //list of songs that were searched
    const [loading, setLoading]=useState(true);
    const [searchTerm, setSearchTerm]=useState("");



    useEffect(() =>{
        const loadSongs=async()=>{
            try {

                const { data  } = await supabase
                .from('songs_data')      // table name
                .select('*');       // select all columns

                if (data == null){
                    data = [];
                }

                setSongResults(data);
            }catch(error){
                console.log('Error fetching songs')
            } finally { 
                setLoading(false)
            }
        }
        loadSongs();
    }, [])

    const filteredSongs = songResults.filter((song) => song.title.toLowerCase().includes(searchTerm.toLowerCase()));

    if (loading){
        return <h3>Loading Songs...</h3>
    }

  return (
    <div className="song-search">
        <input
        type="text"
        placeholder="Search for a Song"
        className='search-input'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} //make it so that whatevers being typed is stored in the variable searchTerm
        />

        {filteredSongs.length===0 ? (
            <h3>No Songs</h3>
        ) : (
            <div className="song-grid">
            {filteredSongs.map((song) => (
                <div className="entry" key={song.id}>
                    <a href={`/song/${song.id}`}>
                    {song.title} by {song.artist}
                    </a>

                    {/* later i want this to be a table */}
                </div>
            ))
            }
        </div> 
        )}
        

            
    </div>
  );
}

export default Directory;