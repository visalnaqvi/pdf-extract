import React from 'react';
import NavBar from './components/navbar/nav';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home/home.js';
import LoginComponent from './components/login/login';
import PreviousFiles from './components/previousFiles/previousFiles';
function App() {
  return (
    <div>
     
      <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/previous-files" element={<PreviousFiles />} />
        <Route path="/" element={<Home showFileInput={true} />}></Route>
      </Routes>
    </BrowserRouter>
     
      


      {/* <h1>Upload and Modify PDF</h1>
      <input type="file" onChange={handleFileChange} accept=".pdf" />
      <button onClick={handleUpload}>Upload PDF and Modify</button> */}

    </div>
  );
}

export default App;
