//creating new pokemonList variable containing 3 pokemons & their stats

//IIFE
let pokemonRepository = (function (){

let pokemonList = [
    {name: "Squirtle", height: 0.5, type: ['water']},
    {name: 'Charizard', height: 1.7, type: ['fire', ' flying']},
    {name: 'Pidgey', height: 0.3, type: ['normal', ' flying']}
];

//new public functions
function add(pokemon) {
    if (
        typeof pokemon === 'object' &&
        'name' in pokemon &&
        'height' in pokemon &&
        'type' in pokemon
    ) {
        pokemonList.push(pokemon);
    } else {
        console.log('pokemon is not correct!');
    }
}

function add (pokemon){
    pokemonList.push(pokemon);
}
function getAll(){
    return pokemonList;
}

//shows the pokemon when clicked
function showDetails (pokemon){
    console.log(pokemon.name);
}

//add event listener
function addListener (button, pokemon) {
    button.addEventListener ('click', function (){
        showDetails(pokemon);
    });
}

//adds buttons displaying the pokemon's name
function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    addListener(button, pokemon);
}

return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
};

})(); //end IIFE

//add a new pokemon
console.log(pokemonRepository.getAll());
pokemonRepository.add({name: 'Pikachu', height: 0.3, type: ['electric']});

console.log(pokemonRepository.getAll());

//call the button function from the IIFE
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});


