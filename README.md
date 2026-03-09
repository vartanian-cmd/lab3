Checkpoint 0
1. The file acting as my main screen is the index.tsx file.
2. The state variable is the pokemonName by storing what the user types in the search box, and it gets the pokemon that was typed.

Checkpoint 1
1. When fetch receives a non-200 response, it doesn't reject the response; instead, we check if the response is ok.
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

Checkpoint 5
1. It is a win because it keeps the API Service its own thing, so we can reuse it and change the UI separately without it being together in one file.
2. The service takes the Pokémon name typed as input, returns the Pokémon object from the API as output, and throws an error if the input isn't a valid Pokémon. 

Checkpoint 7
1. It provides the service a clear way to build the Pokémon object, telling it the fields we want to store and where to store them.
2. The model is safer than the raw JSON because it takes the info drawn from the API and builds it exactly how we want it, so we can easily match that with the UI and avoid any errors.

Checkpoint 8
1. The controller did what the index used to do: it handles the state of the app, validates the input, fetches data, and handles errors.
2. The controller is a better place because validation is data logic and not UI logic. The view only needs to validate data, it doesn't need to do the validation in the view.

Checkpoint 9
1. The view needs the props: pokemonName, loading(either true or false), error, pokemon, favorites, isFavorite.
2. If the view called the API directly, it would skip through validation and state changes, which could break, as states are not being changed, and validation is skipped. 

Checkpoint 10
1. Because the favorites are a state, the view will make UI changes based on the state of whether a Pokémon is a favorite or not. 
2. The derived state for isFavorite is the favorites list to make sure the list of favorite Pokémon always matches the Pokémon that have isFavorite = true.

Checkpoint 11
1. It deals with storage, so it belongs in a service layer as it is not part of the UI. Keeping it by itself allows for repeated usage for multiple files.
2. A "state" is reset upon app restart, while a "persisted state" is saved even if the app is restarted.

Checkpoint 12
1. The animation belongs in the view layer because it is handled by the UI, it spins the picture that the UI displays so it belongs in the view.
2. The animation gets triggered when the Pokémon's state changes, it detects a new Pokémon, and then spins the picture each time.
