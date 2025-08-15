import React from "react";

function Header2() {
  return (
    <div className="navbar bg-base-100 shadow-lg rounded-2xl min-h-[5px] items-center">
      {/* left */}
      <div
        className="navbar-start cursor-pointer"
        onClick={() => (window.location.href = "/")}
      >
        <div className="flex items-center gap-3">
          <img
            src="/assets/images/logo.png"
            alt="logo"
            className="h-[100px] w-auto"
          />
          <span className="text-[60px] font-cloudy leading-none text-sky-400/60">
            SkySong
          </span>
        </div>
      </div>

      {/* right */}
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1 h-[100px] items-center gap-4">
          <li>
            <button
              onClick={() => (window.location.href = "/")}
              className="text-white hover:underline header-button"
            >
              Home
            </button>
          </li>
          {/* <li><button onClick={() => (window.location.href = "/todo")} className="text-white hover:underline header-button">Todo</button></li> */}
          {/* <li><button onClick={() => (window.location.href = "/info")} className="text-white hover:underline header-button">Info</button></li> */}
          <li>
            <button
              onClick={() => (window.location.href = "/new")}
              className="text-white hover:underline header-button"
            >
              Add Song
            </button>
          </li>
          <li className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-18 w-18"
              viewBox="0 0 16 16"
              fill="skyblue"
              onClick={() => (window.location.href = "/account")}
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header2;
