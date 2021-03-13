// async function getPokemon() {
//     try {
//         let gameResp = await fetch ('https://pokeapi.co/api/v2/pokemon/kanto', {mode: 'cors'});
//         let games = await gameResp.json();
//         console.log(games);
//      } catch (e) {
//          console.log(e);
//      }
// }
// getPokemon()
// how to get a poke img
{
  /* <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt=""> */
}

var socket = io();
socket.on("news", function (data) {
  // listen to news event raised by the server
  console.log(data);
});
