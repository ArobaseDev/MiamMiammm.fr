import { useEffect, useState } from 'react';
import { getRecipes } from '../../services/API/Database';
import Recipes from '../../services/interfaces/Recipes';
import Recipe from './Recipe';
import CardMessage from '../cards/CardMessage';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({
    entree: false,
    platPrincipal: false,
    dessert: false,
  });
  const [origin, setOrigin] = useState('all'); // État pour l'origine
  const [origins, setOrigins] = useState<string[]>([]); // État pour stocker les origines uniques



  const recipesList = async () => {
    try {
      const response = await getRecipes();
      setRecipes(response);
      extractOrigins(response); // Extrait les origines uniques des recettes récupérées

    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour extraire les origines uniques
  const extractOrigins = (recipes: Recipes[]) => {
    console.log("Extract Origin : ", recipes)
    const allOrigins = recipes.map(recipe => recipe.origin); // Récupère toutes les origines
    const uniqueOrigins = Array.from(new Set(allOrigins)); // Crée un tableau avec les origines uniques
    setOrigins(uniqueOrigins); // Met à jour le state origins avec les origines uniques
  };

  useEffect(() => {
    recipesList();
  }, []);



  const handleFilterChange = (e) => {
    const { id, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: checked,
    }));
  };

  const handleOriginChange = (e) => {
    console.log(e.target.value)
    setOrigin(e.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const categoryFilter =
      (filters.entree && recipe.category === 'Entrée') ||
      (filters.platPrincipal && recipe.category === 'Plat principal') ||
      (filters.dessert && recipe.category === 'Dessert');

    const originFilter = origin === 'all' || recipe.origin === origin;

    return (!filters.entree && !filters.platPrincipal && !filters.dessert ? true : categoryFilter) && originFilter;
  });
  return (
    <div className="h-full w-full flex flex-column">
      <aside className="aside-bar w-1/6 h-full gap-5">
        <section>
          <h4 className="text-slate-900 pl-5 pt-5">Nos types de plats</h4>

          <div className="flex items-center mx-5 px-9">
            <input
              id="entree"
              type="checkbox"
              className="text-3xl w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={handleFilterChange}
            />
            <label
              htmlFor="entree"
              className="text-3xl mx-5 my-3 font-medium text-gray-900 dark:text-indigo-800"
            >
              <h4>Entrée</h4>
            </label>
          </div>

          <div className="flex items-center mx-5 px-9">
            <input
              id="platPrincipal"
              type="checkbox"
              className="text-3xl w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={handleFilterChange}
            />
            <label
              htmlFor="platPrincipal"
              className="text-3xl mx-5 my-3 font-medium text-gray-900 dark:text-indigo-800"
            >
              <h4>Plat principal</h4>
            </label>
          </div>

          <div className="flex items-center mx-5 px-9">
            <input
              id="dessert"
              type="checkbox"
              className="text-3xl w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={handleFilterChange}
            />
            <label
              htmlFor="dessert"
              className="text-3xl mx-5 my-3 font-medium text-gray-900 dark:text-indigo-800"
            >
              <h4>Dessert</h4>
            </label>
          </div>
        </section>

        <section>
          <h4 className="text-slate-900 pl-5 pt-5">Nos Spécialités</h4>
          <div className="mx-5 px-9">
            <select
              className="text-3xl px-0.5 w-full text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-slate-300 dark:border-gray-600"
              onChange={handleOriginChange}
            >
              <option value="all"></option>
              {origins.map((origin) => (
                <option key={origin} value={origin}>{origin}</option>
              ))}
            </select>
          </div>
        </section>

        <section id="suggestions">
          <h4 className="text-slate-900 pl-5 pt-5">Nos Suggestions</h4>
        </section>
      </aside>
      <main className="m-8 p-4">
        <h1>Les recettes du moment</h1>

        {
          filteredRecipes.length === 0 && (

            <CardMessage
              message=" Aucune recette ne correspond à vos critères de recherche."
            />
          )
        }


        <section className="grid grid-cols-1 gap-4 md:grid-cols-3 gap-4 p4">
          {filteredRecipes.length > 0 ? (

            filteredRecipes.map((recipe: Recipes) => (
              <Recipe key={recipe.id} recipe={recipe} />
            ))

          ) : (
            <p></p>
          )}
        </section>
      </main>
    </div>
  );
}
