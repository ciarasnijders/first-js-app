const pokemonRepository=function(){const e=[],t="https://pokeapi.co/api/v2/pokemon/?limit=20";function n(e){const t=document.querySelector("#pokemon-list"),n=e.map(e=>`<button class="list-group-item list-group-item-action pokemon-buttons" id=${e.name} type="button" data-toggle="modal" data-target="#Modal">${e.name}</button>`);t.innerHTML=n.join(""),e.forEach(e=>{!function(e,t){e.addEventListener("click",function(){o(t)})}(document.querySelector(`#${e.name}`),e)})}function o(t){i(t).then(function(){!function(t,n,i,c,r){console.log({types:r}),document.querySelector("#ModalTitle").innerText=t,document.querySelector("#pokemon-height").innerText=`height: ${n}`,document.querySelector("#pokemon-weight").innerText=`weight: ${c}`,document.querySelector("#pokemon-types").innerText=`type(s): ${r}`,document.querySelector("#pokemon-img").src=i;const s=document.querySelector("#modal-container");window.matchMedia("(max-width: 500px)").matches&&s.addEventListener("pointermove",()=>{const n=e.find(e=>e.name===t);let i=e.indexOf(n);i+1===e.length&&(i=-1);const c=e[i+1];o(c)})}(t.name,t.height,t.imageUrl,t.weight,t.types)})}function i(e){c();const t=e.detailsUrl;return fetch(t).then(function(e){return e.json()}).then(function(t){console.log({details:t}),r(),e.imageUrl=t.sprites.front_default,e.height=t.height,e.types=t.types,e.weight=t.weight,e.types=t.types.map(e=>` ${e.type.name}`)}).catch(function(e){r(),console.error(e)})}function c(){document.querySelector(".loading-message-container").innerText="Loading ..."}function r(){document.querySelector(".loading-message-container").innerText=""}return document.getElementById("searchBar").addEventListener("keyup",t=>{const o=t.target.value.toLowerCase();n(e.filter(e=>e.name.toLowerCase().includes(o)))}),{getAll:function(){return e},loadDetails:i,displayPokemonsList:n,loadList:function(){return c(),fetch(t).then(e=>e.json()).then(function(t){r(),t.results.forEach(function(t){!function(t){"object"==typeof t&&JSON.stringify(Object.keys(t))===JSON.stringify(["name","detailsUrl"])&&e.push(t)}({name:t.name,detailsUrl:t.url})})}).catch(function(e){r(),console.error(e)})}}}();function pokemonLoopFunction(){pokemonRepository.loadList().then(()=>{const e=pokemonRepository.getAll();pokemonRepository.displayPokemonsList(e)})}pokemonLoopFunction();