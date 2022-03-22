//creating new pokemonList variable containing 3 pokemons & their stats

//IIFE
let pokemonRepository = (function (){

let pokemonList = [
    {name: "Squirtle", height: 0.5, type: ['water']},
    {name: 'Charizard', height: 1.7, type: ['fire', ' flying']},
    {name: 'Pidgey', height: 0.3, type: ['normal', ' flying']}
];

//new public functions

function add (pokemon){
    pokemonList.push(pokemon);
}
function getAll(){
    return pokemonList;
}

return {
    add: add,
    getAll: getAll
};

})(); //end IIFE

//create forEach loop
pokemonRepository.getAll().forEach(function (pokemon){
    pokemonRepository.add(pokemon)
});

