import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Pokemon } from "../models/Pokemon";

type PokemonViewProps = {
  pokemonName: string;
  onChangePokemonName: (text: string) => void;
  onSearch: () => void;
  loading: boolean;
  error: string;
  pokemon: Pokemon | null;
  favorites: string[];
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onLoadFavorite: (name: string) => void;
};

export default function PokemonView({
  pokemonName,
  onChangePokemonName,
  onSearch,
  loading,
  error,
  pokemon,
  favorites,
  isFavorite,
  onToggleFavorite,
  onLoadFavorite,
}: PokemonViewProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!pokemon) return;

    fadeAnim.setValue(0);
    rotateAnim.setValue(0);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [pokemon]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pokemon name (e.g., pikachu)"
        value={pokemonName}
        onChangeText={onChangePokemonName}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Button title="Get Pokemon" onPress={onSearch} />

      <View style={styles.favoriteButton}>
        <Button
          title={isFavorite ? "Unfavorite Current Pokemon" : "Favorite Current Pokemon"}
          onPress={onToggleFavorite}
          disabled={!pokemon}
        />
      </View>

      {loading && <ActivityIndicator size="large" />}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {pokemon ? (
        <Animated.View
          style={[
            styles.resultBox,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.pokemonName}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Text>

          {pokemon.image ? (
            <Animated.Image
              source={{ uri: pokemon.image }}
              style={[
                styles.sprite,
                {
                  transform: [{ rotate: spin }],
                },
              ]}
            />
          ) : (
            <Text>No image available.</Text>
          )}

          <Text style={styles.label}>
            Types: <Text style={styles.value}>{pokemon.types.join(", ")}</Text>
          </Text>

          <Text style={styles.label}>
            Abilities:{" "}
            <Text style={styles.value}>{pokemon.abilities.join(", ")}</Text>
          </Text>

          <Text style={styles.label}>First 5 Moves:</Text>

          {pokemon.moves.map((move, index) => (
            <Text key={index} style={styles.move}>
              • {move}
            </Text>
          ))}
        </Animated.View>
      ) : null}

      <View style={styles.favoritesBox}>
        <Text style={styles.favoritesTitle}>Favorites</Text>

        {favorites.length === 0 ? (
          <Text style={styles.emptyFavorites}>No favorites yet.</Text>
        ) : (
          favorites.map((favorite) => (
            <Pressable
              key={favorite}
              onPress={() => onLoadFavorite(favorite)}
              style={styles.favoriteItem}
            >
              <Text style={styles.favoriteText}>
                {favorite.charAt(0).toUpperCase() + favorite.slice(1)}
              </Text>
            </Pressable>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 12,
    backgroundColor: "#636363", 
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
    color: "#fff",
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },

  favoriteButton: {
    width: "100%",
  },

  error: {
    color: "red",
    fontSize: 16,
  },

  resultBox: {
    marginTop: 20,
    width: "100%",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    elevation: 4,
  },

  pokemonName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "capitalize",
    textAlign: "center",
  },

  sprite: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 6,
    textAlign: "center",
  },

  value: {
    fontWeight: "400",
  },

  move: {
    fontSize: 16,
    marginTop: 2,
    textAlign: "center",
  },

  favoritesBox: {
    marginTop: 20,
    width: "100%",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },

  favoritesTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  emptyFavorites: {
    fontSize: 16,
    color: "#666",
  },

  favoriteItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  favoriteText: {
    fontSize: 16,
    textTransform: "capitalize",
  },
});