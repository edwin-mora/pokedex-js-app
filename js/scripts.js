//create IIFE()

let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
    function add(pokemon) {
      pokemonList.push(pokemon);
    };
  
    function getAll() {
      return pokemonList;
    };
  
    function addListItem(pokemon) {
      let newList = $(".pokemon-list");
      let listItem = $("<li></li>");
      let button = $("<button>" + pokemon.name + "</button>")
      button.addClass("btn-primary");
      button.attr("data-toggle", "modal");
      button.attr("data-target", "#pokemonModal");
      listItem.append(button);
      newList.append(listItem);
  
      button.on("click", function(event) {
        showDetails(pokemon);
      });
    }
  
    function showDetails(pokemon){
      loadDetails(pokemon).then(function () {
        showModal(pokemon);
      });
    }
  
    function loadList() {
      return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    };
  
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.name = details.name;
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight / 10;
        item.abilities = [];
        for (let i = 0; i < details.abilities.length; i++){
          item.abilities.push(" " + details.abilities[i].ability.name)
        }
        item.types = [];
         for (let j = 0; j < details.types.length; j++){
           item.types.push(" " + details.types[j].type.name)
         }
      })
      .catch(function (e) {
        console.error(e);
      });
    };

    // jQuery modal function
    
    function showModal(pokemon) {
        let modalTitle = $(".modal-title");
        let modalBody = $(".modal-body");
        modalTitle.empty();
        modalBody.empty();
        let nameElement = $("<h1>" + pokemon.name + "</h1>");

        //abilities Content
        let abilitiesElement = $("<p> Abilities: " + pokemon.abilities + "</p>");

        //types Content
        let typesElement = $("<p> Types: " + pokemon.types + "</p>");

        //Height content
        let heightElement = $("<p> Height: " + pokemon.height + " m </p>");

        //Weight content
        let weightElement = $("<p> Weight: " + pokemon.weight + " kg </p>");

        //Image content
        let imageElement = $("<img class='modal-img' style='width:50%'>");
        imageElement.attr("src", pokemon.imageUrl);

        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(abilitiesElement);
        modalBody.append(typesElement);
        modalContainer.append(modal);
      }






  
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      showDetails: showDetails,
      loadList: loadList,
      loadDetails: loadDetails
    };
  })();
  
  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
      });
    });
  
  