const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// Syncing all the models at once.

// Para la precarga cuando se levanta el server, ejecutar la funcion getEpisodes(). Al ser una peticion vamos a usar async await.

conn.sync({ force: true }).then(() => {
  // getEpisodes();
  server.listen(3001, () => {
    console.log("TODO OK!!"); // eslint-disable-line no-console
  });
});
