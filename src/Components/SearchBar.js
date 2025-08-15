import React, { useEffect, useState } from "react";

function SearchBar({ songs, onResult, filterBy = ["title"] }) {
  const [term, setTerm] = useState("");

  useEffect(() => {
    const low_term = term.trim().toLowerCase();

    // const filtered = songs.filter(song =>
    // (song.title    ?? '').toLowerCase().includes(low_term) ||
    // (song.artist   ?? '').toLowerCase().includes(low_term) ||
    // (song.arranger ?? '').toLowerCase().includes(low_term)
    // );

    const filteredList = !low_term
      ? songs //if the term is blank, then just display all songs
      : songs.filter((song) =>
          filterBy.some(
            (
              filter //this is similar to array.map or array.filter
            ) =>
              // safeguard: coerce null/undefined to '' (that's why ?? '')
              (song[filter] ?? "").toLowerCase().includes(low_term) //song's attribute of the filter gets lowercased and you see if it includes the term
          )
        );
    //basically, for each song, we filter by each filter. if the song.filter includes search term, then it gets added to filtered list

    onResult(filteredList); //use the prop to send filtered up to the directory. directory gets this value and does setFiltered and now
    // the filtered in directory = this filtered
  }, [term, songs, onResult]);

  return (
    // <input
    // type="text"
    // placeholder="Search for a Song"
    // className='mb-[20px] p-[10px] w-full text-base border border-gray-300 rounded'
    // value={term}
    // onChange={e => setTerm(e.target.value)} //make it so that whatevers being typed is stored in the variable searchTerm
    // />

    <label className="input mb-[20px] w-full">
      <svg
        className="h-[1em] opacity-50 "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input
        type="search"
        required
        placeholder="Search"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
    </label>
  );
}

export default SearchBar;
