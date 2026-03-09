import { Pokemon } from "../models/Pokemon";
import { PokemonBuilder } from "../models/PokemonBuilder";

type PokemonApiResponse = {
  name: string;
  sprites: {
    front_default: string | null;
  };
  types: {
    type: { name: string };
  }[];
  abilities: {
    ability: { name: string };
  }[];
  moves: {
    move: { name: string };
  }[];
};

export async function getPokemon(name: string): Promise<Pokemon> {
  const q = name.trim().toLowerCase();

  if (!q) {
    throw new Error("Please enter a Pokemon name.");
  }

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${q}`);

  if (!response.ok) {
    throw new Error("Pokemon not found.");
  }

  const data: PokemonApiResponse = await response.json();

  const pokemon = new PokemonBuilder()
    .setName(data.name)
    .setImage(data.sprites.front_default ?? "")
    .setTypes(data.types.map(t => t.type.name))
    .setAbilities(data.abilities.map(a => a.ability.name))
    .setMoves(data.moves.slice(0, 5).map(m => m.move.name))
    .build();

  return pokemon;
}