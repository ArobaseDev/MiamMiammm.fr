/**
 *  Ensemble des opérations CRUD  et méthodes permettant de gérer les appels à l'API.
 */


/**
 * Récupère toutes les recettes.
 * @returns Les recettes sous forme de tableau d'objets.
 */
const recipesUrl: string = `http://192.168.0.38:3001/recipes`

// interface Recipes {
//   id: number;
//   name: string;
//   description: string;
//   ingredients: string[];
//   steps: string[];
//   preparationTime: number;
//   cookingTime: number;
//   difficulty: number;
//   servings: number;
// }

import Recipes from "../interfaces/Recipes";

async function getRecipes(): Promise<Recipes[]> {
  const response = await fetch(recipesUrl);
  return await response.json();
}


/**
 * Récupère une recette par son ID.
 * @param id L'ID de la recette.
 * @returns La recette sous forme d'objet.
 * */

async function getRecipeById(id: number): Promise<Recipes> {
  const response = await fetch(`${recipesUrl}/?id=${id}`);
  const data = await response.json()
  return await data[0];
}


/**
 * Crée une nouvelle recette.
 * @param recipe La recette à créer.
 * @returns L'ID de la nouvelle recette créée.
 * */
async function createRecipe(recipe: Recipes): Promise<number> {
  const response = await fetch(recipesUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe),
  });
  return await response.json();
}

/**
 * Met à jour une recette.
 * @param id L'ID de la recette à mettre à jour.
 * @param recipe La nouvelle recette.
 * */

async function updateRecipe(id: number, recipe: Recipes): Promise<void> {
  await fetch(`${recipesUrl}/?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe),
  });
}

/**
 * Supprime une recette.
 * @param id L'ID de la recette à supprimer.
 * */

export async function deleteRecipe(id: number): Promise<void> {
  await fetch(`${recipesUrl}/?id=${id}`, { method: 'DELETE' });
}

/**
 * Rechercher des recette depuis le formulaire
 * 
 * */
export async function searchRecipe(query: string): Promise<Recipes[]> {

  const response = await fetch(`${recipesUrl}/&s=${query}`);
  return await response.json();
}



export { getRecipes, getRecipeById, createRecipe, updateRecipe };
