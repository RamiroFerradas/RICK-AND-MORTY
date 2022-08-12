import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { characterDetails, cleanCache } from "../../redux/actions";
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

  return details.image ? (
    <div>
      <div>
        <img src={details.image} alt={details.name} />
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
        {details.episodes?.map((ele) => {
          return <p key={ele}>- {ele}</p>;
        })}
      </div>
      <div>
        <Link to={"/home"}>
          <button>Back</button>
        </Link>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
