var socket = io();
socket.on("pokedex", function (data) {
  // listen to news event raised by the server
  var pokemon = data.region.results
  for (var i = 1; i <= pokemon.length; i++) {
    var div = document.createElement('div');
    div.setAttribute('class', 'col-lg-2 col-md-3 col-sm-6 cards');
    var card = document.createElement('div')
    card.setAttribute('class', 'card');
    var image = document.createElement('img');
    image.setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`);
    card.appendChild(image)
    var pokeName = document.createElement('h3');
    pokeName.innerHTML = pokemon[i-1].name
    card.appendChild(pokeName)
    div.appendChild(card);
    document.getElementById('pokemonContainer').appendChild(div);
}
});


