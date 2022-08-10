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
  let { data } = await axios.get("https://rickandmortyapi.com/api/character");

  let infoLimpia = data.results;

  let promesa = await Promise.all(
    infoLimpia.map(async (ele) => {
      let url = ele.episode;
      return {
        name: ele.name,
        id: ele.id,
        image: ele.image,
        species: ele.species,
        created: ele.created,
        listadoEpisodes: await auxNamesEpisodes(url),
        episodes: ele.episode.length,
      };
    })
  );

  return promesa;
}
getCharacterApi();

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
      created: ele.created,
      listadoEpisodes: ele.episodes.map((ele) => ele.name),
      episodes: ele.episodes.length,
      createdInDb: ele.createdInDb,
    };
  });
  console.log(mapLimpieza);
  return mapLimpieza;
  // console.log(mapeados);
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
    console.log(data, "ID DE CHARACTER CREADO");
    let arr = [];
    arr.push(data);
    return arr;
  } else {
    //traigo character desde la api
    const { data } = await axios.get(
      `https://rickandmortyapi.com/api/character/${id}/`
    );

    let urls = data.episode;
    console.log(urls, "URLSSS");
    let apiId = {
      name: data.name,
      id: data.id,
      image: data.image,
      species: data.species,
      created: data.created,
      listadoEpisodes: await auxNamesEpisodes(urls),
      episodes: data.episode.length,
    };
    console.log(apiId), "ACA ESTOYY";
    return apiId;
  }
}

async function getConecatenado(name) {
  const getDb = await getCharacterDb();
  const getApi = await getCharacterApi();

  const getFinal = getApi.concat(getDb);
  console.log(getDb);
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
