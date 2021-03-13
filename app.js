const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  console.log("I work");
  // res.sendFile(__dirname + "index.html")
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.emit("news", { hello: "world" });
    console.log("data was recieved");
  });
  res.sendFile(__dirname + "/html/index.html");
});

app.get("/pokedex:region", function (req, res) {
  console.log("this was meet");
  const region = req.params.region.slice(1);
  async function getPokemon() {
    try {
      // offset=151&
      await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then((res) => res.json())
        .then((data) => {
            let pokemon = data
          io.on("connection", (socket) => {
            console.log(data);
            socket.emit("pokedex", { region: pokemon });
            pokemon = []
            console.log("data was recieved");
          });
        });
    } catch (e) {
      console.log(e);
    }
  }
  getPokemon();

  res.sendFile(__dirname + "/html/pokedex.html");
});
// app.get('/pokemon')
app.post("/pokedex", function (req, res) {
  console.log("post logged");
  const region = req.body.region;
  console.log(region);
  res.redirect("/pokedex:" + region);
});

http.listen(process.env.PORT || 3000, function (req, res) {
  console.log("APP listening on PORT 3000");
});
