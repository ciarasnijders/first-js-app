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

//a forEach loop that iterates over each item in pokemonList
function pokemonLoopFunction(pokemon) {
    let partial = `${pokemonList[i].name} (height: ${pokemonList[i].height}) `;
    if (pokemon.height >= 7){
        document.write(`<p class="pokemon-list__item special">${partial} - Wow, that’s big! </p>`);
    } else {
        document.write(`<p class="pokemon-list__item special">${partial} </p>`);
    }
  }
  pokemonList.forEach(pokemonLoopFunction);