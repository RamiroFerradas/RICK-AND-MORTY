import { Routes, Route } from "react-router-dom";
// import React from "react";

//componentes:
import Landing from "./Components/Landing/Landing";
import Home from "./Components/Home/Home";
import CharacterDetail from "./Components/Character Detail/CharacterDetail";
import CharacterCreate from "./Components/Character Create/CharacterCreate";
import About from "./Components/About/About";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/create" element={<CharacterCreate />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
