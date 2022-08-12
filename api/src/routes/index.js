const { Router } = require("express");
const { Character } = require("../db");
const modelsCh = require("./character");
const modelsEp = require("./episode");

const router = Router();

router.get("/characters", async (req, res, next) => {
  const { name } = req.query;
  try {
    res.status(200).json(await modelsCh.getConecatenado(name));
    // res.json(resultado);
  } catch (error) {
    next(error);
  }
});
router.get("/episodes", async (req, res, next) => {
  // const { name } = req.query;
  try {
    res.status(200).json(await modelsEp.getEpisodes());
    // res.json(resultado);
  } catch (error) {
    next(error);
  }
});

router.post("/character", async (req, res, next) => {
  let { name, image, species, origin, episodes } = req.body;
  if (
    !image ||
    image === undefined ||
    image === "" ||
    !/(https?:\/\/.*\.(?:png|jpg|jpeg))/i.test(image)
  ) {
    image =
      " https://cinematicos.net/wp-content/uploads/l-intro-1659557579.jpg";
  }

  try {
    let newCharacter = await Character.create({
      name: name,
      image: image,
      species: species,
      origin: origin,
    });
    await newCharacter.addEpisode(episodes);

    res.status(200).send(newCharacter);
    console.log(
      newCharacter,
      `CREASTE UN CHARACTER "${newCharacter.name.toUpperCase()}" CON EXITO!!`
    );
  } catch (error) {
    next(error);
  }
});

router.get("/character/:id", async (req, res) => {
  const { id } = req.params;

  try {
    res.status(200).json(await modelsCh.getOneCharacter(id));
  } catch (error) {
    res.status(400).json({ msj: "No se encuentra el id solicitado" });
  }
});
// Configurar los routers

module.exports = router;
