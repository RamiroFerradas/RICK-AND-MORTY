import React from "react";
import FiltradoAz from "./FiltradoAz";
// import FiltradoEpisodes from "./FiltradoEpisodes";
import FiltradoCreacion from "./FiltradoCreacion";

export default function Filtrados({ setOrder }) {
  return (
    <div>
      <div>
        <FiltradoAz setOrder={setOrder} />
      </div>
      <div>{/* <FiltradoEpisodes /> */}</div>
      <div>
        <FiltradoCreacion />
      </div>
    </div>
  );
}
