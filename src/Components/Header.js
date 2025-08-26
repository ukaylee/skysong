import React from "react";
import { supabase } from "../supabaseClient";

function Header() {
  return (
    <div className=" flex justify-between items-center p-[20px] bg-blue-300 ">
      <div
        onClick={() => (window.location.href = "/")}
        className="flex items-center"
      >
        <img
          src="/assets/images/logo.png"
          alt="logo"
          // style={{ height: "80px", width: "auto", marginRight: '10px', lineHeight: 0, marginTop: '10px' }}
          className="h-[100px] w-auto mr-2.5"
        />
        <p className="text-[60px] font-cloudy leading-none text-white">
          SkySong
        </p>
      </div>

      <div className="flex gap-10">
        <button
          onClick={() => window.location.replace("/")}
          className="text-white hover:underline header-button"
        >
          Home
        </button>
        {/* <button onClick={() => window.location.replace('/todo')}
              className="text-white hover:underline header-button">Todo</button> */}
        <button
          onClick={() => window.location.replace("/info")}
          className="text-white hover:underline header-button"
        >
          Info
        </button>
        <button
          onClick={() => (window.location.href = "/new")} //for some reason replace was bugging just for this one so did this instead
          className="text-white hover:underline header-button"
        >
          Add Song
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="white"
          className="bi bi-person-circle "
          viewBox="0 0 16 16"
          onClick={() => window.location.replace("/account")}
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37
              C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
          />
        </svg>
      </div>
    </div>
  );
}

export default Header;
