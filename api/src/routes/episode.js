const { Router } = require("express");
const axios = require("axios");
const { Episode, Character } = require("../db");
const e = require("express");
const router = Router();

async function getEpisodes() {
  episodesDB = await Episode.findAll();
  if (episodesDB.length) {
    let results1 = episodesDB.map((ele) => ele.dataValues);
    console.log("Episodios guadardados en db");

    return results1;
  } else {
    let { data } = await axios.get("https://rickandmortyapi.com/api/episode");
    let results2 = data.results.map((ele) => {
      return {
        name: ele.name,
      };
    });
    let final = await results2.map(async (ele) => Episode.create(ele));
    console.log("Episodios traidos de api");
    let promesa = await Promise.all(final);
    return promesa;
  }
}
getEpisodes();

module.exports = {
  getEpisodes,
};
