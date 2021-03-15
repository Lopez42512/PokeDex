var socket = io();
socket.on("pokedex", function (data) {
  // listen to news event raised by the server
  var pokemon = data.region.results;
  var str = data.limit;
  let pokeId = 0;
  // grabs the offset params to know where to starts counting the pokemon id to specify each pokemon
  var mySubString = str.substring(
    str.lastIndexOf("offset=") + 7,
    str.lastIndexOf("&")
  );
  console.log(mySubString)
  myStartingPokemon = parseInt(mySubString);
  if (pokemon !== undefined) {
    for (var i = 1; i <= pokemon.length; i++) {
      // if the mysubstring var doesn't exist I know the pokedex choosen was gen 1 so id will start at 1
      if (mySubString == 'limit=') {
        pokeId = i;
      } else {
        // the pokeid will start with the substring and count up to know which pokemon is which
        pokeId = i + myStartingPokemon;
      }
      // Create a card div to store the pokemon name and img
      var div = document.createElement("div");
      div.setAttribute("class", "col-lg-2 col-md-3 col-sm-6 cards");
      var card = document.createElement("div");
      card.setAttribute("class", "card");
      // This is where the img is created
      var image = document.createElement("img");
      image.setAttribute(
        "src",
        // The image is on this website with the param being the poke id that tells which pokemon to select
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`
      );
      card.appendChild(image);
      var pokeName = document.createElement("h3");
      pokeName.innerHTML = pokemon[i - 1].name;
      card.appendChild(pokeName);
      // Creating a form for each pokemon to post which pokemon was selected to know which one to display on the next page
      var pokeForm = document.createElement("form");
      pokeForm.setAttribute("action", "/pokemon");
      pokeForm.setAttribute("method", "POST");
      var pokeSubmit = document.createElement("button");
      pokeSubmit.setAttribute("type", "submit");
      pokeSubmit.setAttribute("name", "pokemon");
      // The pokeId value is what is used on the backend to know which api to fetch 
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
