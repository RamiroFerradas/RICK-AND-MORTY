import React from "react";

export default function Card({ image, origin, species, episodes, name }) {
  return (
    <div>
      <div>
        <h1>{name}</h1>
        <img src={image} alt="imagen" />
      </div>
      <div>
        <p>Origin: {origin}</p>
        <p>Specie:{species}</p>
        <p>Episodes:{episodes}</p>
      </div>
    </div>
  );
}
