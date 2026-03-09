import { useEffect, useMemo, useState } from "react";
import { Pokemon } from "../models/Pokemon";
import { getPokemon } from "../services/pokemonApi";
import { loadFavorites, saveFavorites } from "../services/favoritesStorage";

export function usePokemonController() {
  const [pokemonName, setPokemonName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const isFavorite = useMemo(() => {
    if (!pokemon) return false;
    return favorites.includes(pokemon.name);
  }, [pokemon, favorites]);

  useEffect(() => {
    async function fetchFavorites() {
      const storedFavorites = await loadFavorites();
      setFavorites(storedFavorites);
    }

    fetchFavorites();
  }, []);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  async function searchPokemon() {
    const q = pokemonName.trim();

    if (!q) {
      setError("Please enter a Pokemon name.");
      setPokemon(null);
      return;
    }

    setLoading(true);
    setError("");
    setPokemon(null);

    try {
      const result = await getPokemon(q);
      setPokemon(result);
      setPokemonName(result.name);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  }

  async function loadFavorite(name: string) {
    const q = name.trim();

    if (!q) {
      setError("Invalid favorite Pokemon.");
      return;
    }

    setLoading(true);
    setError("");
    setPokemon(null);
    setPokemonName(q);

    try {
      const result = await getPokemon(q);
      setPokemon(result);
      setPokemonName(result.name);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  }

  function toggleFavorite() {
    if (!pokemon) return;

    const name = pokemon.name;

    setFavorites((prev) => {
      if (prev.includes(name)) {
        return prev.filter((fav) => fav !== name);
      }

      return [...prev, name];
    });
  }

  return {
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
  };
}