import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  characterDetails,
  cleanCache,
  recargarHome,
} from "../../redux/actions";
import Loading from "../Loading/Loading";

export default function CharacterDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const details = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(characterDetails(id));
    return function () {
      dispatch(cleanCache());
    };
  }, [dispatch, id]);

  let cleanAndBack = () => {
    navigate("/home");
    dispatch(recargarHome());
  };

  return details.image ? (
    <div>
      <div>
        <button onClick={(e) => cleanAndBack(e)}>Back</button>
      </div>
      <div>
        <img
          width="400rem"
          height="600rem"
          src={details.image}
          alt={details.name}
        />
      </div>
      <div>
        <h1>Name: {details.name}</h1>
      </div>
      <div>
        <p>Origin: {details.origin}</p>
      </div>
      <div>
        <p>Species: {details.species}</p>
      </div>
      <div>
        Episodes:
        <p>{details.episodes}</p>
        {/* {details.episodes?.map((ele) => {
          return <p key={ele}>- {ele}</p>;
        })} */}
      </div>
    </div>
  ) : (
    <Loading />
  );
}
