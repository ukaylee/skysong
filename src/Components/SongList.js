import { memo } from "react";
// import { Link } from "react-router-dom"; // optional

const SongList = memo(({ songs = [] }) => {
  if (!songs.length) return <p>No Songs</p>;

  return (
    <div className="overflow-x-auto rounded-box border border-gray-300 bg-base-100 p-4 sm:p-6">
      <table className="table w-full table-fixed">
        <colgroup>
          <col className="w-[60px]" />
          <col />
          <col />
          <col />
          <col className="w-[180px]" /> {/* was 140px */}
        </colgroup>

        <thead>
          <tr>
            <th scope="col" className="px-6 py-3">
              {" "}
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Artist
            </th>
            <th scope="col" className="px-6 py-3">
              Arranger
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>

        <tbody>
          {songs.map((song) => (
            <tr key={song.id} className="align-middle">
              <td className="py-4 pl-6 pr-2">
                <div className="h-12 w-12 rounded bg-base-200 flex items-center justify-center overflow-hidden">
                  <img
                    src={song.img}
                    alt={`${song.title} cover`}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </td>
              <td className="px-6 py-4 font-semibold truncate">{song.title}</td>
              <td className="px-6 py-4 truncate">{song.artist}</td>
              <td className="px-6 py-4 truncate">arr. {song.arranger}</td>
              <td className="py-4 pr-6">
                <button
                  type="button"
                  onClick={() => (window.location.href = `/song/${song.id}`)}
                  className="inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Go to Song
                </button>
                {/* or:
                <Link to={`/song/${song.id}`} className="btn btn-sm whitespace-nowrap">
                  Go to Song
                </Link> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default SongList;
