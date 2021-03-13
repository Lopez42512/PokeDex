const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  // res.sendFile(__dirname + "index.html")
  io.on("connection", (socket) => {
    socket.emit("news", { hello: "world" });
  });
  res.sendFile(__dirname + "/html/index.html");
});

app.get("/pokedex:region", function (req, res) {
  const region = req.params.region.slice(1);
  let pokemon = []
  async function getPokemon() {
    try {
      // offset=151&
      await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then((res) => res.json())
        .then((data) => {
            if(pokemon[0] === undefined) {
                pokemon = data
            }
            
          io.on("connection", (socket) => {
            socket.emit("pokedex", { region: pokemon });
            pokemon = []
          });
        })
        .then(() => res.sendFile(__dirname + "/html/pokedex.html"))
    } catch (e) {
      console.log(e);
    }
  }
  getPokemon();

  
});
// app.get('/pokemon')
app.post("/pokedex", function (req, res) {
  const region = req.body.region;
  res.redirect("/pokedex:" + region);
});

http.listen(process.env.PORT || 3000, function (req, res) {
  console.log("APP listening on PORT 3000");
});
