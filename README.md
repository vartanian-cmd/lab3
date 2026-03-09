Checkpoint 0
1. The file acting as my main screen is the index.tsx file.
2. The state variable is the pokemonName by storing what the user types in the search box, and it gets the pokemon that was typed.

Checkpoint 1
1.
2. We shouldn't assume the JSON fields exist as if the API returns values that are missing, null, etc., it can cause errors.

Checkpoint 2
1. The app truth currently is in the index.tsx and the states are controlled using "useState" based on what the user types.
2. If loading is not set back to false, we will be stuck in a loading state forever, and the loading indicator will be there forever.

Checkpoint 3
1. A raw JSON file is unstyled and organized data that we pull from the API. A shaped object is better because it has exactly what the UI needs and displays it without the mess of a raw JSON file.
2. The UI is responsible for displaying the text, styling, and images, while the logic is responsible for giving the fetched response and giving the information for the UI to display.

Checkpoint 4
1. Index.tsx currently
- Displays the title, input for the search engine, images, texts, the buttons, and styling
- Manages the state of the pokemonName, loading, errors
- It fetches the input using fetch
2. To reuse the API we could move the API into a different file and call a function instead of keeping it inside one file
3. If I wanted to test the logic, I would launch the website, type in any Pokémon, and check the browser console to see what got passed.

  
