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

//a for loop that iterates over each item in pokemonList
for (let i = 0; i < pokemonList.length; i++) {
    let partial = `${pokemonList[i].name} (height: ${pokemonList[i].height}) `;
    if (pokemonList[i].height >= 7){ 
        document.write(`${partial} - Wow, that’s big! <br>`);
    } else {
        document.write(`${partial} <br>`);
    }
};