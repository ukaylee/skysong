import React from "react";
// import "@clardiza/react-osmd-player/dist/index.css"; // this is required
// import "@clardiza/react-osmd-player/dist/osmd-player.css";
import { BrowserRouter as Router, Routes, Route, Form } from "react-router-dom";

import Directory from "./Pages/Directory.js";
import Song from "./Pages/Song.js";
import ErrorPage from "./Pages/ErrorPage.js";
import Todo from "./Pages/Todo.js";
import Header from "./Components/Header.js";
import Info from "./Pages/Info.js";
import SongForm from "./Components/SongForm.js";
import LogIn from "./Pages/LogIn.js";
import ProtectedRoute from "./Components/ProtectedRoute.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header2 from "./Components/Header2.js";
import EditSong from "./Components/EditSong.js";

function App() {
  return (
    <>
      <main className="bg-sky-50 font-sans">
        <div className="p-5 sm:p-8">
          {/* <Header /> */}
          <Header2 />

          <Router>
            <div>
              <Routes>
                <Route exact path="/" element={<Directory />} />
                <Route path="/song/:id" element={<Song />} />
                <Route exact path="/404" element={<ErrorPage />} />
                <Route exact path="/todo" element={<Todo />} />
                <Route exact path="/info" element={<Info />} />
                <Route exact path="/edit" element={<EditSong songId="0" />} />
                <Route
                  path="/new"
                  element={
                    <ProtectedRoute>
                      <SongForm />
                    </ProtectedRoute>
                  }
                />
                <Route exact path="/account" element={<LogIn />} />
              </Routes>
            </div>
          </Router>
          <ToastContainer position="top-center" autoClose={3000} />
        </div>
      </main>
    </>
  );
}

export default App;
