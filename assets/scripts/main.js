// main.js

// CONSTANTS
const RECIPE_URLS = [
    'https://adarsh249.github.io/Lab8-Starter/recipes/1_50-thanksgiving-side-dishes.json',
    'https://adarsh249.github.io/Lab8-Starter/recipes/2_roasting-turkey-breast-with-stuffing.json',
    'https://adarsh249.github.io/Lab8-Starter/recipes/3_moms-cornbread-stuffing.json',
    'https://adarsh249.github.io/Lab8-Starter/recipes/4_50-indulgent-thanksgiving-side-dishes-for-any-holiday-gathering.json',
    'https://adarsh249.github.io/Lab8-Starter/recipes/5_healthy-thanksgiving-recipe-crockpot-turkey-breast.json',
    'https://adarsh249.github.io/Lab8-Starter/recipes/6_one-pot-thanksgiving-dinner.json',
];

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
async function init() {
  // initialize ServiceWorker
  initializeServiceWorker();
  // Get the recipes from localStorage
  let recipes;
  try {
    recipes = await getRecipes();
  } catch (err) {
    console.error(err);
  }
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
}

/**
 * Detects if there's a service worker, then loads it and begins the process
 * of installing it and getting it running
 */
function initializeServiceWorker() {
  // EXPLORE - START (All explore numbers start with B)
  /*******************/
  // ServiceWorkers have many uses, the most common of which is to manage
  // local caches, intercept network requests, and conditionally serve from
  // those local caches. This increases performance since users aren't
  // re-downloading the same resources every single page visit. This also allows
  // websites to have some (if not all) functionality offline! I highly
  // recommend reading up on ServiceWorkers on MDN before continuing.
  /*******************/
  // We first must register our ServiceWorker here before any of the code in
  // sw.js is executed.
  // B1. TODO - Check if 'serviceWorker' is supported in the current browser
  // B2. TODO - Listen for the 'load' event on the window object.
  // Steps B3-B6 will be *inside* the event listener's function created in B2
  // B3. TODO - Register './sw.js' as a service worker (The MDN article
  //            "Using Service Workers" will help you here)
  // B4. TODO - Once the service worker has been successfully registered, console
  //            log that it was successful.
  // B5. TODO - In the event that the service worker registration fails, console
  //            log that it has failed.
  // STEPS B6 ONWARDS WILL BE IN /sw.js
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage, network requests are made to all
 * of the URLs in RECIPE_URLs, an array is made from those recipes, that
 * array is saved to localStorage, and then the array is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
async function getRecipes() {
  // EXPOSE - START (All expose numbers start with A)
  // A1. Check local storage to see if there are any recipes.
  //     If there are recipes, return them.
  const recipesFromStorage = localStorage.getItem('recipes');
  if (recipesFromStorage) {
    return JSON.parse(recipesFromStorage);
  }

  // A2. Create an empty array to hold the recipes that you will fetch
  let recipes = [];

  // A3. Return a new Promise.
  return new Promise(async (resolve, reject) => {
    try {
      // A4. Loop through each recipe in the RECIPE_URLS array constant declared above
      for (let url of RECIPE_URLS) {
        // A6. Fetch the URL
        let response = await fetch(url);
        // A7. Retrieve the JSON from the response
        let recipe = await response.json();
        // A8. Add the new recipe to the recipes array
        recipes.push(recipe);
      }
      // A9. Save the recipes to storage and resolve the promise
      saveRecipesToStorage(recipes);
      resolve(recipes);
    } catch (error) {
      // A10. Log any errors from catch using console.error
      console.error(error);
      // A11. Pass any errors to the Promise's reject() function
      reject(error);
    }
  });
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  if (!recipes) return;
  let main = document.querySelector('main');
  recipes.forEach((recipe) => {
    let recipeCard = document.createElement('recipe-card');
    recipeCard.data = recipe;
    main.append(recipeCard);
  });
}