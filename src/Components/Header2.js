import React from "react";

function Header2() {
  return (
    <div className="navbar bg-base-100 shadow-lg rounded-2xl flex items-center px-4 py-2 flex-wrap">
      {/* left */}
      <div
        className="navbar-start cursor-pointer flex items-center gap-3 flex-shrink-0"
        onClick={() => (window.location.href = "/")}
      >
        <img
          src="/assets/images/logo.png"
          alt="logo"
          className="h-16 sm:h-20 md:h-24 w-auto object-contain"
        />
        <span className="text-2xl sm:text-3xl md:text-5xl font-cloudy leading-none text-sky-400/60">
          SkySong
        </span>
      </div>

      {/* right */}
      <div className="navbar-end flex items-center gap-4 flex-wrap mt-2 md:mt-0">
        <button
          onClick={() => (window.location.href = "/")}
          className="text-white hover:underline header-button"
        >
          Home
        </button>

        <button
          onClick={() => (window.location.href = "/new")}
          className="text-white hover:underline header-button"
        >
          Add Song
        </button>

        <button
          onClick={() => (window.location.href = "/account")}
          className="flex items-center"
          aria-label="Account"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
            viewBox="0 0 16 16"
            fill="skyblue"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Header2;
