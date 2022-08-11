import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { characterDetails } from "../../redux/actions";

export default function CharacterDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const character = useSelector((state) => state.characters);

  useEffect(() => {
    dispatch(characterDetails(id));
  });
  return (
    <div>
      <h1>HOLAA</h1>
    </div>
  );
}
