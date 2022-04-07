//creating new pokemonList variable containing 3 pokemons & their stats

//IIFE
let pokemonRepository = (function (){
    let pokemonList = []
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
function showDetails (item) {
    pokemonRepository.loadDetails(item).then(function (){
        console.log(item);
    });
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
    button.addEventListener('click', function(event) {
        showDetails(pokemon);
    });
}

function loadList (){
    return fetch(apiUrl).then(function (response) {
        return response.json();
    }).then(function (json) {
        json.results.forEach(function (item) {
            let pokemon = {
                name: item.name,
                detailsUrl: item.url
            };
            add(pokemon);
            //console.log(pokemon);
        });
    }).catch(function (e) {
        console.error(e);
    })
}

function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (details) {
        //add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
    }).catch(function (e) {
        console.error(e);
    });
}





return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,   
    loadList: loadList,
    loadDetails: loadDetails
};

})(); //end IIFE

//add a new pokemon


//call the button function from the IIFE
pokemonRepository.loadList().then(function() {
//data is loaded now
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
    });
});


