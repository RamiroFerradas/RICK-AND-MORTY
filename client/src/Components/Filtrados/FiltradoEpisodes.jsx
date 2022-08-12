// import React from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import filterEpisodes from "../../redux/actions";
// import { getEpisodes } from "../../redux/actions";

// export default function FiltradoEpisodes() {
//   const dispatch = useDispatch();
//   let allEpisodes = useSelector((state) => state.episodes);
//   let currentPage = useSelector((state) => state.page);

//   useEffect(() => {
//     dispatch(getEpisodes());
//   }, [dispatch]);

//   const handlerFilterEpisodes = (e) => {
//     e.preventDefault();
//     dispatch(filterEpisodes(e.target.value));
//     currentPage();
//   };

//   return (
//     <div>
//       <select onChange={(e) => handlerFilterEpisodes(e)}>
//         <option value="all"> all</option>
//         {allEpisodes?.map((epi) => (
//           <option key={epi.id} value={epi.name}>
//             {epi.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }
