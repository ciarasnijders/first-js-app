let pokemonRepository = (function () {
  //This array contains Pokémon data to display in the application.
  let pokemonList = [];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      JSON.stringify(Object.keys(pokemon)) ===
        JSON.stringify(['name', 'detailsUrl'])
    ) {
      pokemonList.push(pokemon);
    }
  }

  function addListItem(pokemon) {
    let divSelector = document.querySelector('#pokemon-list');
    let button = document.createElement('button');
    button.classList.add('list-group-item', 'list-group-item-action');
    button.setAttribute('type', 'button');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#Modal');

    addClickEvent(button, pokemon);

    button.innerText = pokemon.name;
    // button.classList.add('pokemon-button'); adds styling
    divSelector.appendChild(button);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
    });
  }

  function addClickEvent(button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function findByName(name) {
    return pokemonList.filter(function (pokemon) {
      return pokemon.name === name;
    });
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then((response) => response.json())
      .then(function (json) {
        hideLoadingMessage();
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        console.log({ details });
        //sometimes response.json can take longer so hiding the loading message here
        hideLoadingMessage();
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function showLoadingMessage() {
    let message = document.querySelector('.loading-message-container');
    message.innerText = 'Loading ...';
  }

  function hideLoadingMessage() {
    let message = document.querySelector('.loading-message-container');
    message.innerText = '';
  }

  function showModal(name, height, imageUrl) {
    let modalTitle = document.querySelector('#ModalTitle');
    modalTitle.innerText = name;

    let contentElement = document.querySelector('#pokemon-height');
    contentElement.innerText = `height: ${height}`;

    let imageElement = document.querySelector('#pokemon-img');
    imageElement.src = imageUrl;

    let modal = document.querySelector('#modal-container');

    // Only add pointermove listener for mobile devices
    let widthMatch = window.matchMedia('(max-width: 500px)');
    if (widthMatch.matches) {
      modal.addEventListener('pointermove', () => {
        const currentPokemon = pokemonList.find(
          (pokemon) => pokemon.name === name
        );
        let currentPokemonIndex = pokemonList.indexOf(currentPokemon);
        if (currentPokemonIndex + 1 === pokemonList.length) {
          currentPokemonIndex = -1;
        }
        const nextPokemon = pokemonList[currentPokemonIndex + 1];
        showDetails(nextPokemon);
      });
    }
  }

  //creates a search bar
  const searchBar = document.getElementById('searchBar');
  searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredPokemons = pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(searchString));
    displayPokemonsList(filteredPokemons)
    });


  return {
    getAll: getAll,
    add: add,
    findByName: findByName,
    loadList: loadList,
    loadDetails: loadDetails,
    displayPokemonsList: displayPokemonsList
  };
})();

function pokemonLoopFunction() {
  pokemonRepository.loadList().then(() => {
    const pokemonList = pokemonRepository.getAll();
    pokemonRepository.displayPokemonsList(pokemonList);
  });
}

pokemonLoopFunction();
