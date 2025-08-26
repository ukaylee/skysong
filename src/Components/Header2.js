import React from "react";

function Header2() {
  return (
    <div className="navbar bg-base-100 shadow-lg rounded-2xl h-[100px] px-6">
      {/* left */}
      <div
        className="navbar-start cursor-pointer flex items-center gap-3 h-full"
        onClick={() => (window.location.href = "/")}
      >
        <img
          src="/assets/images/logo.png"
          alt="logo"
          className="h-[80px] w-auto object-contain"
        />
        <span className="text-[60px] font-cloudy leading-none text-sky-400/60">
          SkySong
        </span>
      </div>

      {/* right */}
      <div className="navbar-end flex items-center h-full gap-4">
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
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
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
