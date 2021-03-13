fetch('/pokedex') 
.then(resp => resp.json())
.then(data => console.log(data))