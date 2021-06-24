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

    function getAll(){
        return pokemonList;
    }

    function add(pokemon){
        if (typeof pokemon === 'object'){
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

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    };

}) ();


function pokemonLoopFunction(pokemon) {
    pokemonRepository.addListItem(pokemon);
}


pokemonRepository.getAll().forEach(pokemonLoopFunction);
