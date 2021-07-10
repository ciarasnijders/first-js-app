let pokemonRepository = (function() {
    //This array contains Pokémon data to display in the application.
    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

    function getAll(){
        return pokemonList;
    }

    function add(pokemon){
        if (typeof pokemon === "object" && JSON.stringify(Object.keys(pokemon)) === JSON.stringify(['name', 'detailsUrl'])) {
                pokemonList.push(pokemon)
        }
    }

    function addListItem(pokemon){
        let ulSelector = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        
        addClickEvent(button, pokemon);
        
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
        listItem.appendChild(button);
        ulSelector.appendChild(listItem);
    };

    function showDetails(pokemon){
        console.log(pokemon); 
    }

    function addClickEvent(button, pokemon){
        button.addEventListener('click',function () {
            showDetails(pokemon)
        });
    }

    function findByName(name) {
        return pokemonList.filter(function(pokemon) {
            return pokemon.name === name
        })
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
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
      }
    
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            
            return response.json();
            }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            }).catch(function (e) {
            console.error(e);
            });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        findByName: findByName,
        loadList: loadList,
        loadDetails: loadDetails
    };

}) ();


function pokemonLoopFunction(pokemon) {
    pokemonRepository.addListItem(pokemon);
}
