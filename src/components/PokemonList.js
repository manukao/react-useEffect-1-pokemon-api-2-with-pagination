import { useState, useEffect } from "react";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);

  useEffect(() => {
    async function loadPokemon() {
      try {
        const response = await fetch(currentPageUrl);
        const data = await response.json();
        setNextPageUrl(data.next);
        setPreviousPageUrl(data.previous);
        setPokemon(data.results);
      } catch (error) {
        console.log(error);
      }
    }

    loadPokemon();
  }, [currentPageUrl]);

  function handleNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function handlePreviousPage() {
    setCurrentPageUrl(previousPageUrl);
  }

  return (
    <main>
      <button
        type="button"
        onClick={handlePreviousPage}
        disabled={previousPageUrl === null}
      >
        Previous Page
      </button>
      <button
        type="button"
        onClick={handleNextPage}
        disabled={nextPageUrl === null}
      >
        Next Page
      </button>
      <ul>
        {pokemon.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </main>
  );
}
