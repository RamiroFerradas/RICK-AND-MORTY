const { Router } = require("express");
const axios = require("axios");
const { Episode, Character } = require("../db");
const e = require("express");
const router = Router();

async function auxNamesEpisodes(arr) {
  let result = arr.map(async (cur) => {
    let { data } = await axios.get(cur);
    return data.name;
  });
  let r = await Promise.all(result);

  return r;
}

async function getCharacterApi() {
  //hago 5 pedidos a la api para traer 100 (20x5)
  let { data } = await axios.get("https://rickandmortyapi.com/api/character");
  let pedido2 = await axios.get(data.info.next);
  let pedido3 = await axios.get(pedido2.data.info.next);
  let pedido4 = await axios.get(pedido3.data.info.next);
  let pedido5 = await axios.get(pedido4.data.info.next);
  let infoLimpia = data.results;
  let infoLimpia2 = pedido2.data.results;
  let infoLimpia3 = pedido3.data.results;
  let infoLimpia4 = pedido4.data.results;
  let infoLimpia5 = pedido5.data.results;

  let concat = infoLimpia.concat(
    infoLimpia2,
    infoLimpia3,
    infoLimpia4,
    infoLimpia5
  );

  let promesa = await Promise.all(
    concat.map((ele) => {
      // let url = ele.episode;
      return {
        name: ele.name,
        id: ele.id,
        image: ele.image,
        species: ele.species,
        origin: ele.origin.name,
        // episodes: await auxNamesEpisodes(url),
        episodes: ele.episode.length,
      };
    })
  );

  return promesa;
}

async function getCharacterDb() {
  const characterDb = await Character.findAll({
    include: {
      model: Episode,
      attributes: ["name"],
    },
  });
  let mapeados = characterDb.map((ele) => {
    return ele.dataValues;
  });
  let mapLimpieza = mapeados.map((ele) => {
    return {
      name: ele.name,
      id: ele.id,
      image: ele.image,
      species: ele.species,
      origin: ele.origin,
      // episodes: ele.episodes.map((ele) => ele.name),
      episodes: ele.episodes.length,
      createdInDb: ele.createdInDb,
    };
  });

  return mapLimpieza;
}

async function getOneCharacter(id) {
  if (id.includes("-")) {
    //traigo character creado desde la base de datos
    let data = await Character.findByPk(id, {
      include: {
        model: Episode,
        attributes: ["name"],
      },
    });
    // let limpieza = data;
    // console.log(data.dataValues, "SOY DATA");
    console.log("ID DE CHARACTER CREADO");
    let arr = [];
    arr.push(data.dataValues);
    return arr;
  } else {
    //traigo character desde la api
    const { data } = await axios.get(
      `https://rickandmortyapi.com/api/character/${id}/`
    );

    let urls = data.episode;

    let apiId = {
      name: data.name,
      id: data.id,
      image: data.image,
      species: data.species,
      origin: data.origin.name,
      episodes: await auxNamesEpisodes(urls),
    };

    let arr2 = [];
    arr2.push(apiId);
    return arr2;
  }
}

async function getConecatenado(name) {
  const getDb = await getCharacterDb();
  const getApi = await getCharacterApi();

  const getFinal = getApi.concat(getDb);

  if (name) {
    let buscar = getFinal.filter(
      (ele) => ele.name.toLowerCase() === name.toLowerCase()
    );

    if (buscar.length > 0) {
      return buscar;
    }
    return alert("No se encontro el pokemon");
  } else {
    return getFinal;
  }
  // return getFinal;
}

module.exports = {
  getConecatenado,

  getOneCharacter,
};
