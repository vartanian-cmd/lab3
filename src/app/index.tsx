import PokemonView from "../components/PokemonView";
import { usePokemonController } from "../controllers/usePokemonController";

export default function HomeScreen() {
  const {
    pokemonName,
    setPokemonName,
    loading,
    error,
    pokemon,
    favorites,
    isFavorite,
    searchPokemon,
    toggleFavorite,
    loadFavorite,
  } = usePokemonController();

  return (
    <PokemonView
      pokemonName={pokemonName}
      onChangePokemonName={setPokemonName}
      onSearch={searchPokemon}
      loading={loading}
      error={error}
      pokemon={pokemon}
      favorites={favorites}
      isFavorite={isFavorite}
      onToggleFavorite={toggleFavorite}
      onLoadFavorite={loadFavorite}
    />
  );
}