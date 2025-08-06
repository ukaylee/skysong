import React from "react";
import '@clardiza/react-osmd-player/dist/index.css';          // this is required
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Directory from "./Directory.js";
import Song from "./Song.js";
import ErrorPage from "./ErrorPage.js";
import { Resend } from 'resend';

function App() {

// const handleClick = () => {

//   // const resend = new Resend(RESEND_API_KEY);

//   resend.emails.send({
//     from: 'onboarding@resend.dev',
//     to: 'kaylee.ulep@gmail.com',
//     subject: 'Hello World Test',
//     html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
//   });
// }

  return (
    <div style={{ padding: 40 }}>


      <div className="header">
        <div className="left">
          OSMD Player Demo - Kaylee
        </div>
        <div className="right">
         <button onClick={() => window.location.replace('/')}>Home</button>
         {/* <button onClick={handleClick}>Email Test</button> */}
        </div>
      </div>

      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Directory />} />
            <Route path="/song/:id" element={<Song />} />
            <Route exact path="/404" element={<ErrorPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;