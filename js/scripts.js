//creating new pokemonList variable containing 3 pokemons & their stats

let pokemonList = [
    {name: "Squirtle", height: 0.5, type: ['water']},
    {name: 'Charizard', height: 1.7, type: ['fire', ' flying']},
    {name: 'Pidgey', height: 0.3, type: ['normal', ' flying']}
];
// create a for loop that iterates over each item in pokemonList

for (let i = 0; i < pokemonList.length; i++){
    document.write("<p>" +pokemonList[i].name + "</p>")
    document.write("<p>" +pokemonList[i].height + "</p>")
    document.write("<p>" +pokemonList[i].type + "</p>")
}















//create conditionals for the pokemon's height
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 1.0) {
        document.write('<p>'+ pokemonList[i].name + " " + "(height:" + " " + pokemonList[i].height + ")" + " -whoa that's a big pokemon!")
    } else if (pokemonList.height > 0.5 && pokemonList.height < 1.5){
        document.write('<p>' + pokemonList[i].name + " " + "(height:" + " " + pokemonList[i].height + ")" + " -this is an avg pokemon")
    } else{
        document.write('<p>' + pokemonList[i].name + " "+ "(height:" + " " + pokemonList[i].height + ")" + " -this is a small pokemon")
    }
}
