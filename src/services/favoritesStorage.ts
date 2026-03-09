import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "pokemon_favorites";

export async function loadFavorites(): Promise<string[]> {
  try {
    const stored = await AsyncStorage.getItem(FAVORITES_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export async function saveFavorites(favorites: string[]): Promise<void> {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}