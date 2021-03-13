var socket = io();
socket.on("pokedex", function (data) {
  // listen to news event raised by the server
  var pokemon = data.region.results;
  var str = data.limit;
  let pokeId = 0;
  var mySubString = str.substring(
    str.lastIndexOf("offset=") + 7,
    str.lastIndexOf("&")
  );
  myStartingPokemon = parseInt(mySubString);
  if (pokemon !== undefined) {
    for (var i = 1; i <= pokemon.length; i++) {
      if (mySubString == 'limit=') {
        pokeId = i;
      } else {
        pokeId = i + myStartingPokemon;
      }

      var div = document.createElement("div");
      div.setAttribute("class", "col-lg-2 col-md-3 col-sm-6 cards");
      var card = document.createElement("div");
      card.setAttribute("class", "card");
      var image = document.createElement("img");
      image.setAttribute(
        "src",
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`
      );
      card.appendChild(image);
      var pokeName = document.createElement("h3");
      pokeName.innerHTML = pokemon[i - 1].name;
      card.appendChild(pokeName);
      var pokeForm = document.createElement("form");
      pokeForm.setAttribute("action", "/pokemon");
      pokeForm.setAttribute("method", "POST");
      var pokeSubmit = document.createElement("button");
      pokeSubmit.setAttribute("type", "submit");
      pokeSubmit.setAttribute("name", "pokemon");
      pokeSubmit.setAttribute("value", pokeId);
      pokeSubmit.classList.add("btn");
      pokeSubmit.classList.add("btn-primary");
      pokeSubmit.innerHTML = 'CATCH!'
      pokeForm.appendChild(pokeSubmit);
      card.appendChild(pokeForm);
      div.appendChild(card);
      document.getElementById("pokemonContainer").appendChild(div);
    }
  }
});
