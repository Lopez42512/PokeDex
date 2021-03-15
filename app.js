const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  // io.on("connection", (socket) => {
  //   socket.emit("news", { hello: "world" });
  // });
  res.sendFile(__dirname + "/html/index.html");
});

app.get("/pokedex:region", function (req, res) {
  // the region param is returned with a : attached so I have to remove it to get the proper api call
  const region = req.params.region.slice(1);
  let pokemon = [];
  async function getPokedex() {
    try {
      // offset=151&
      await fetch(`https://pokeapi.co/api/v2/pokemon?${region}`)
        .then((res) => res.json())
        .then((data) => {
          // Due to having to use a socket this function might be called mutliple times leading to dublicate on my page so i have to empty the array after every call this checks to see if an empty array exist before passing into data
          if (pokemon[0] === undefined) {
            pokemon = data;
          }

          io.on("connection", (socket) => {
            // using sockets to pass data to the front end
            socket.emit("pokedex", { region: pokemon, limit: region });
            // empty array to prevent dublicates 
            pokemon = [];
          });
        })
        .then(() => res.sendFile(__dirname + "/html/pokedex.html"));
    } catch (e) {
      console.log(e);
    }
  }
  getPokedex();
});
// app.get('/pokemon')
app.post("/pokedex", function (req, res) {
  const region = req.body.region;
  res.redirect("/pokedex:" + region);
});

app.get("/pokemon:pokemon", function (req, res) {
  const pokemon = req.params.pokemon.slice(1);
  let pokeData = [];
  let pokeEntry = ''
  console.log(pokemon);
  async function getPokemon() {
    try {
      await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((resp) => resp.json())
        .then((data) => {
          if (pokeData[0] === undefined) {
            pokeData = data;
          }
          // promise.all was breaking the function so called another fetch inside then to get needed data 
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
          .then((resp) => resp.json())
          .then((data) => pokeEntry = data.flavor_text_entries[0].flavor_text)
          io.on("connection", (socket) => {
            socket.emit("pokemon", { pokemon: pokeData, entry: pokeEntry});
            pokeData = [];
            pokeEntry = ''
          });
        })
        .then(() => res.sendFile(__dirname + "/html/pokemon.html"))
    
    } catch (e) {
      console.log(e);
    }
  }
  getPokemon();
  
});

app.post("/pokemon", function (req, res) {
  // added the selected pokemon id to the res.redirect param so I can do a fetch on that pokemon
  const pokemon = req.body.pokemon;
  res.redirect("/pokemon:" + pokemon);
});

http.listen(process.env.PORT || 3000, function (req, res) {
  console.log("APP listening on PORT 3000");
});
