import OsmdPlayer from '@clardiza/react-osmd-player';
import React, { useEffect, useState } from 'react'
import './Song.css'
import { Navigate, useParams } from 'react-router-dom';
import { supabase } from './supabaseClient';

function Song(){
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [song, setSong]     = useState(null);
    // const song = songs.find((song) => song.id === parseInt(id)); old way if you have json

    useEffect(() =>{
        async function loadSong() {
            const { data, error } = await supabase
            .from('songs_data')
            .select('*')
            .eq('id', id)    // filter where id = 2
            .single();           // return a single object instead of an array

            if (error) {
                // window.location.href = '/404';
                console.log("hello")
            } else {
                console.log('Single song row:', data);
                setSong(data);
                // data is { id: 2, title: "...", artist: "...", … }
            }
            setLoading(false);
        }
        loadSong();
    }, [])

    // While fetching
    if (loading) {
        return <p>Loading song…</p>;
    }

    // At this point, `song` is guaranteed non-null so i can do this, i guess?
    const { title, artist, file, arranger, year, album, link, img } = song;


    const handleClick = () => {
        window.open(link, '_blank');
    }

    const handleBackClick = () => {
        window.location.href = '/'; // Navigate to the root page
    };
    return (
        <>
            
            <div className='container'>
                <img src={`/assets/images/${img}`} className='image'></img>
                <div className='info'>
                    <h2>{title}</h2>
                    <p>By {artist}</p>
                    <p>Arranged by {arranger}</p>
                    <p>Released: {year}</p>
                    <p>Album: {album}</p>
                    <button className="sbutton" onClick={handleClick}>Listen on Spotify</button>
                </div>
                <button onClick={handleBackClick} className="back_button">Back</button>
            </div>
            <p></p>
            <OsmdPlayer filename={`/assets/songs/${file}`} height="600px"/>
        </>
    )
}

export default Song;