let pokemonRepository = (function() {
    //This array contains Pokémon data to display in the application.
    let pokemonList = [
        {
            name:"Pikachu",
            height: 4,
            colors: ["yellow", "black", "red"],
            type: ["electric"],
        },
        {
            name:"Bulbasaur",
            height: 7,
            color: ["blue", "green", "turquoise"],
            type: ["grass", "poison"],
        },
        {
            name:"Charmander",
            height: 6,
            color: ["orange", "yellow", "red"],
            type: ["fire"],
        }
    ];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function getAll(){
        return pokemonList;
    }

    function add(pokemon){
        if (typeof pokemon === "object" && JSON.stringify(Object.keys(pokemon)) === JSON.stringify(['name', 'height', 'colors', 'type'])) {
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
