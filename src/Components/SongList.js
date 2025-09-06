import { memo } from "react";
// import { Link } from "react-router-dom"; // optional

const SongList = memo(({ songs = [] }) => {
  if (!songs.length) return <p>No Songs</p>;

  return (
    <div className="overflow-x-auto rounded-box border border-gray-300 bg-base-100 p-4 sm:p-6">
      {/* Headers */}
      <div className="mb-5">
        <div className="hidden md:!block">
          <div className="flex items-center gap-4 ">
            <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center overflow-hidden">
              {/* Placeholder for image column */}
            </div>
            <div className="flex-1 min-w-0 grid grid-cols-3 gap-x-4">
              <div className="text-xs sm:!text-sm font-bold truncate">
                TITLE
              </div>
              <div className="text-xs sm:!text-sm font-bold truncate">
                ARTIST
              </div>
              <div className="text-xs sm:!text-sm font-bold truncate">
                ARRANGER
              </div>
            </div>
            <div className="flex-shrink-0 w-[100px]" />{" "}
            {/* match approximate button width */}
          </div>
        </div>
        {/* Small screen generic header */}
        <div className="block md:!hidden text-xs sm:!text-sm font-bold">
          SONG DETAILS
        </div>
      </div>
      {/* Song List */}
      <div>
        {songs.map((song) => (
          <div key={song.id} className="flex items-center gap-4 mb-5">
            {/* Left: fixed image */}
            <div className="h-12 w-12 flex-shrink-0 rounded bg-base-200 flex items-center justify-center overflow-hidden">
              <img
                src={song.img}
                alt={`${song.title} cover`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Middle: truncating text */}
            <div className="flex-1 min-w-0 grid grid-cols-1 md:!grid-cols-3 gap-x-4">
              <div className="text-xs sm:!text-sm font-semibold truncate">
                {song.title}
              </div>
              <div className="text-xs sm:!text-sm truncate">{song.artist}</div>
              <div className="text-xs sm:!text-sm truncate">
                arr. {song.arranger}
              </div>
            </div>

            {/* Right: button with natural width */}
            <div className="flex-shrink-0">
              <button
                onClick={() => (window.location.href = `/song/${song.id}`)}
                className="btn btn-xs sm:btn-sm md:btn-md btn-primary whitespace-nowrap"
              >
                Go to Song
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default SongList;
