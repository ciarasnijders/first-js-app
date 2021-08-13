const pokemonRepository = (function () {
  // This array contains Pokémon data to display in the application.
  const pokemonList = []

  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20'

  function getAll () {
    return pokemonList
  }

  function add (pokemon) {
    if (
      typeof pokemon === 'object' &&
      JSON.stringify(Object.keys(pokemon)) ===
        JSON.stringify(['name', 'detailsUrl'])
    ) {
      pokemonList.push(pokemon)
    }
  }

  // displays a list of Pokemons (it is reusable)
  function displayPokemonsList (pokemons) {
    const divSelector = document.querySelector('#pokemon-list')
    const list = pokemons.map((pokemon) => {
      return (
          `<button class="list-group-item list-group-item-action pokemon-buttons" id=${pokemon.name} type="button" data-toggle="modal" data-target="#Modal">${pokemon.name}</button>`
      )
    })
    divSelector.innerHTML = list.join('')

    pokemons.forEach((pokemon) => {
      const buttonItem = document.querySelector(`#${pokemon.name}`)
      addClickEvent(buttonItem, pokemon)
    })
  }

  function showDetails (pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl, pokemon.weight, pokemon.types)
    })
  }

  function addClickEvent (button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon)
    })
  }

  function findByName (name) {
    return pokemonList.filter(function (pokemon) {
      return pokemon.name === name
    })
  }

  function loadList () {
    showLoadingMessage()
    return fetch(apiUrl)
      .then((response) => response.json())
      .then(function (json) {
        hideLoadingMessage()
        json.results.forEach(function (item) {
          const pokemon = {
            name: item.name,
            detailsUrl: item.url
          }
          add(pokemon)
        })
      })
      .catch(function (e) {
        hideLoadingMessage()
        console.error(e)
      })
  }

  function loadDetails (item) {
    showLoadingMessage()
    const url = item.detailsUrl
    return fetch(url)
      .then(function (response) {
        return response.json()
      })
      .then(function (details) {
        console.log({ details })
        // sometimes response.json can take longer so hiding the loading message here
        hideLoadingMessage()
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default
        item.height = details.height
        item.types = details.types
        item.weight = details.weight
        item.types = details.types.map((item) => ` ${item.type.name}`)
      })
      .catch(function (e) {
        hideLoadingMessage()
        console.error(e)
      })
  }

  function showLoadingMessage () {
    const message = document.querySelector('.loading-message-container')
    message.innerText = 'Loading ...'
  }

  function hideLoadingMessage () {
    const message = document.querySelector('.loading-message-container')
    message.innerText = ''
  }

  function showModal (name, height, imageUrl, weight, types) {
    console.log({ types })
    const modalTitle = document.querySelector('#ModalTitle')
    modalTitle.innerText = name

    const contentElement = document.querySelector('#pokemon-height')
    contentElement.innerText = `height: ${height}`

    const contentElementWeight = document.querySelector('#pokemon-weight')
    contentElementWeight.innerText = `weight: ${weight}`

    const contentElementTypes = document.querySelector('#pokemon-types')
    contentElementTypes.innerText = `type(s): ${types}`

    const imageElement = document.querySelector('#pokemon-img')
    imageElement.src = imageUrl

    const modal = document.querySelector('#modal-container')

    // Only add pointermove listener for mobile devices
    const widthMatch = window.matchMedia('(max-width: 500px)')
    if (widthMatch.matches) {
      modal.addEventListener('pointermove', () => {
        const currentPokemon = pokemonList.find(
          (pokemon) => pokemon.name === name
        )
        let currentPokemonIndex = pokemonList.indexOf(currentPokemon)
        if (currentPokemonIndex + 1 === pokemonList.length) {
          currentPokemonIndex = -1
        }
        const nextPokemon = pokemonList[currentPokemonIndex + 1]
        showDetails(nextPokemon)
      })
    }
  }

  // creates a search bar
  const searchBar = document.getElementById('searchBar')
  searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase()
    const filteredPokemons = pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(searchString))
    displayPokemonsList(filteredPokemons)
  })

  return {
    getAll,
    loadDetails,
    displayPokemonsList,
    loadList
  }
})()

function pokemonLoopFunction () {
  pokemonRepository.loadList().then(() => {
    const pokemonList = pokemonRepository.getAll()
    pokemonRepository.displayPokemonsList(pokemonList)
  })
}

pokemonLoopFunction()
