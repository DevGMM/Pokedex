const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokemonWeight = document.getElementById('weight');
const pokemonHeight = document.getElementById('height');
const pokemonTypes = document.getElementById('types');
const pokemonHP = document.getElementById('hp');
const pokemonAttack = document.getElementById('attack');
const pokemonDefesnse = document.getElementById('defense');
const pokemonSpecialAttack = document.getElementById('special-attack');
const pokemonSpecialDefense = document.getElementById('special-defense');
const pokemonSpeed = document.getElementById('speed');

const fetchPokemon = async (pokemonNameOrId) => {

    nameOrId = !isNaN(pokemonNameOrId) ? parseInt(pokemonNameOrId) : pokemonNameOrId.toLowerCase()

    try {
        const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`);

        const dados = await res.json();

        showPokemon(dados);
    } catch (erro) {
        alert('Pokemon não encontrado');
    }
}

const showPokemon = (pokemon) => {

    const { id, weight, height, name, sprites, types, stats } = pokemon;

    pokemonName.textContent = name.toUpperCase();
    pokemonId.textContent = `#${id}`;
    pokemonWeight.textContent = `Peso: ${weight}`;
    pokemonHeight.textContent = `Altura: ${height}`;

    const spriteContainer = document.getElementById('sprite-container');
    spriteContainer.innerHTML = '';
    const img = document.createElement('img');
    img.id = 'sprite'
    img.src = sprites.front_default;
    img.alt = name;
    spriteContainer.appendChild(img);

    pokemonTypes.innerHTML = '';
    types.forEach((typeInfo) => {
        const typeElement = document.createElement('span');
        typeElement.textContent = typeInfo.type.name.toUpperCase();
        typeElement.classList.add('type', typeInfo.type.name.toLowerCase());
        pokemonTypes.appendChild(typeElement);
    })

    pokemonHP.textContent = stats[0].base_stat;
    pokemonAttack.textContent = stats[1].base_stat;
    pokemonDefesnse.textContent = stats[2].base_stat;
    pokemonSpecialAttack.textContent = stats[3].base_stat;
    pokemonSpecialDefense.textContent = stats[4].base_stat;
    pokemonSpeed.textContent = stats[5].base_stat;
    
}

searchButton.addEventListener('click', (event) => {
    event.preventDefault()

    const pokemon = searchInput.value.trim()

    if (!pokemon) {
        alert('Por favor entre com um nome ou ID existente')
    }

    fetchPokemon(pokemon)
})