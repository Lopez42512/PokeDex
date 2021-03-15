var socket = io();
console.log("hello");
socket.on("pokemon", function (data) {
  let pokeData = data.pokemon;
  console.log(data.entry);
  if (pokeData.name !== undefined) {
    const name = pokeData.name;
    var div = document.createElement("h1");
    div.innerHTML = name;

    document.getElementById("header").appendChild(div);
    document
      .getElementById("pokeImg")
      .setAttribute(
        "src",
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeData.id}.png`
      );
    // loop through the pokemon stats to fill out the stat bar display
    pokeData.stats.forEach((element, i) => {
      let stat = element.base_stat;
      let statString = stat.toString();
      document.getElementById("stat" + (i + 1)).style.width = `${statString}%`;
    });

    // add the poke entry to the summary part of the page
      if (data.entry !== "") {
        console.log("not empty");
        document.getElementById("pokeSummary").innerHTML = data.entry;
      } else {
        document.getElementById("pokeSummary").innerHTML = "No Entry for this Pokemon";
      }
    
    //  add buttons to go to the previous or next pokemon
    document.getElementById("prevPoke").setAttribute("value", pokeData.id - 1);
    var prevImage = document.createElement("img");
    prevImage.setAttribute(
      "src",
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        pokeData.id - 1
      }.png`
    );
    prevImage.style.height = "50px";
    document.getElementById("prevPoke").appendChild(prevImage);

    document
      .getElementById("nextPoke")
      .setAttribute("value", parseInt(pokeData.id + 1));
    document
      .getElementById("nextPokePic")
      .setAttribute(
        "src",
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          pokeData.id + 1
        }.png`
      );
    // document.getElementById("headerName").appendChild = "name";
  }
});
