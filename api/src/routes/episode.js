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
    let pedido2 = await axios.get(data.info.next);
    let pedido3 = await axios.get(pedido2.data.info.next);

    let infoLimpia = data.results;
    let infoLimpia2 = pedido2.data.results;
    let infoLimpia3 = pedido3.data.results;

    let concat = infoLimpia.concat(infoLimpia2, infoLimpia3);

    let results2 = concat.map((ele) => {
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

module.exports = {
  getEpisodes,
};
