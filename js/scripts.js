//  IIFE
let pokemonRepository = ( function () {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
    let modalContainer = document.querySelector('#modal-container');

    //retrieve all pokemon
    function getAll() {
        return pokemonList;
    }

    //to add pokemon
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function showLoadingMessage() {
        let loadingMessage = document.querySelector('.loading-pokedex')
        loadingMessage.classList.remove('hidden')
    }

    function hideLoadingMessage() {
        let loadingMessage = document.querySelector('.loading-pokedex')
        loadingMessage.classList.add('hidden')
    }

    function addListItem(pokemon) {
       
        let pokedexList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');
        let button = document.createElement('button');

     
        button.innerText = pokemon.name ;
        button.classList.add('button-style');

      //apend
        listPokemon.appendChild(button);
        pokedexList.appendChild(listPokemon);
        //event listender tha shows pokeomen detailes
        button.addEventListener('click', function(event){
            showDetails(pokemon);
        });
    }

    // to show the modal with img and info
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function (){
            showModal(pokemon);
        });
    }

    function loadList () {
        showLoadingMessage();

        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function(json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add (pokemon);
                hideLoadingMessage();
            });
        }).catch(function (e) {
            console.log(e);
            hideLoadingMessage();
        });
    }


    function loadDetails(item) {
        showLoadingMessage();

        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types;
            hideLoadingMessage();
        }).catch(function (e) {
            console.error(e);
            hideLoadingMessage();
        });
    }

    //showModal event
    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal();
    });

    //  event for escape button
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    // event listener when user clicks outside
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });


   //showModal function
    function showModal(pokemon) {

        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal')

       //modal content
        let closeButtonElement =  document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'X';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h2');
        titleElement.innerText = pokemon.name;

        let heightElement = document.createElement('p');
        heightElement.innerText = 'Height: ' + pokemon.height;

        let weightElement = document.createElement('p');
        weightElement.innerText = 'Height: ' + pokemon.weight;

        let typeElement = document.createElement('p');
        typeElement.innerText = 'Types: ';
        pokemon.types.forEach((type, numberOfTypes) => {
            numberOfTypes = pokemon.types.pokemon; 
            
            if (numberOfTypes === 1) {
                typeElement.innerText += type.type.name;
            } else {
                typeElement.innerText += type.type.name + " ";
            }
        })

        let imageElement = document.createElement('img');
        imageElement.classList.add('modal-image');
        imageElement.src = pokemon.imageUrl;

        //append
        modal.appendChild(closeButtonElement);
        modal.appendChild(imageElement);
        modal.appendChild(titleElement);
        modal.appendChild(heightElement);
        modal.appendChild(weightElement);
        modal.appendChild(typeElement);
        modalContainer.appendChild(modal);

       
        modalContainer.classList.add('is-visible');
    }

   //hideModal function
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach( function (pokemon) {
        pokemonRepository.addListItem(pokemon)
    });     
});