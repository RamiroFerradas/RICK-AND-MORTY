import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <Link to={"/home"}>
        <button>INGRESAR</button>
      </Link>
    </div>
  );
}
