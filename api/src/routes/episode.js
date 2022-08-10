const { Router } = require("express");
const axios = require("axios");
const { Episode, Character } = require("../db");
const e = require("express");
const router = Router();

async function getEpisodes() {
  episodesDB = await Episode.findAll();
  if (episodesDB.length) {
    let results1 = episodesDB.map((ele) => ele.dataValues);
    return results1;
  } else {
    let { data } = await axios.get("https://rickandmortyapi.com/api/episode");
    let results2 = data.results.map((ele) => {
      return {
        name: ele.name,
      };
    });
    let final = results2.map(async (ele) => Episode.create(ele));

    return final, console.log(episodesDB, "Episodios guadardados en db");
    // return results;
  }
}
getEpisodes();

module.exports = {
  getEpisodes,
};
