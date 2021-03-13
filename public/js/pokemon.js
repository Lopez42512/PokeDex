var socket = io();
console.log('hello')
socket.on("pokemon", function (data) {
  let pokeData = data;
  console.log(pokeData.pokemon)
  if (pokeData.pokemon.name !== undefined) {
    const name = pokeData.pokemon.name;
    console.log(name);
    var div = document.createElement("h1");
    div.innerHTML = name;
    document.getElementById('header').appendChild(div)
    // document.getElementById("headerName").appendChild = "name";
  }
});
