var socket = io();
console.log('hello')
socket.on("pokemon", function (data) {
  let pokeData = data.pokemon;
  console.log(pokeData.pokemon)
  if (pokeData.name !== undefined) {
    const name = pokeData.name;
    var div = document.createElement("h1");
    div.innerHTML = name;
    console.log(pokeData.stats)
    document.getElementById('header').appendChild(div)
    document.getElementById('pokeImg').setAttribute(
        "src",
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeData.id}.png`
    );
     pokeData.stats.forEach((element, i) => {
         console.log(element);
         console.log(i);
         console.log(typeof(element.base_stat));
         let stat = element.base_stat
         let statString = stat.toString();
         console.log(statString);
        //  document.getElementById('numberStat' + (i + 1)).innerHTML = stat
         document.getElementById('stat' + (i + 1)).style.width = `${statString}%`
     });   
    // document.getElementById("headerName").appendChild = "name";
  }
});
