try {
  const response = await fetch(`https://recettes-api.vercel.app/recettes`);
  const data: Recipe[] = await response.json(); // Utilisation de l'interface Recipe
  // Filtrage des résultats
  const filteredData = data.filter((item: Recipe) => // Utilisation de l'interface Recipe
      item.name.toLowerCase().includes(query.toLowerCase())
  );
  setResults(filteredData);
} catch (err) {
  if (err instanceof Error) {
      setError(err.message);
  } else {
      setError("Une erreur est survenue lors de la recherche");
  }
} finally {
  setLoading(false);
}


/////*****///

useEffect(() => {
  const storedFavorites = localStorage.getItem('Miam-Miammm-favorites');
  if (storedFavorites) {
    setIsFavorite(JSON.parse(storedFavorites).some(favorite => favorite.id === recipe.id));
    //   setIsFavorite(favorites.some(favorite => favorite.id === recipe.id));
  }
}, [recipe.id]);

const toggleFavorite = () => {
  const storedFavorites = localStorage.getItem('Miam-Miammm-favorites'); // Vérification si la clé existe dans le LocalStorage
  if (storedFavorites) {
    let favorites = JSON.parse(storedFavorites)   // Si elle existe alors transformation en objet JSON
    if (isFavorite) {
      favorites = favorites.filter(f => f.id !== recipe.id)  // Si la recette est déjà dans les favoris, alors nous la retirons
    } else {
      favorites.push(recipe)  // Ajout dans le tableau des favoris
    }
    localStorage.setItem('Miam-Miammm-favorites', JSON.stringify(favorites)); // Mise à jour du LocalStorage en transformant le tableau en chaîne de caractères valides (clé, valeur)
    setIsFavorite(!isFavorite)
  }


  <button onClick={toggleFavorite}

    className={` ${isFavorite ? "bg-red-600" : "bg-transparent btn-heart items-right"} `}>
    {
      isFavorite ? <FaRegHeart color="white" font-size="2.5rem" /> : <FaRegHeart color="red" font-size="2.5rem" />
    }


  </button>

}


///////////////////////////////////////// 
/**
 * RecipeList 1 avant modif  et intégration listes en head
 */

import { useEffect, useState } from 'react';
import { getRecipes } from '../../services/API/Database';
import Recipes from '../../services/interfaces/Recipes'
import Recipe from './Recipe';
import CardMessage from '../cards/CardMessage';
import { useSearch } from '../../services/contexts/AppProvider';

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


///////////////////////////////////////// 
/**
 * RecipeList 2 avant 2ème modif  
 */

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [categories, setCategories] = useState([]);
  const [origins, setOrigins] = useState([]);
  const { state } = useSearch();

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getRecipes();
      setRecipes(data);

      // Extract categories and origins from the recipes
      const uniqueCategories = [...new Set(data.map(recipe => recipe.category))];
      const uniqueOrigins = [...new Set(data.map(recipe => recipe.origin))];
      setCategories(uniqueCategories);
      setOrigins(uniqueOrigins);
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes
    .filter(recipe =>
      recipe.name.toLowerCase().includes(state.query.toLowerCase()) || recipe.origin.toLowerCase().includes(state.query.toLowerCase())
    )
    .filter(recipe =>
      selectedCategory ? recipe.category === selectedCategory : true
    )
    .filter(recipe =>
      selectedOrigin ? recipe.origin === selectedOrigin : true
    );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="text-3xl font-semibold text-center my-8">Recipes</h1>

      <div className="flex justify-center mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mx-2 p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={selectedOrigin}
          onChange={(e) => setSelectedOrigin(e.target.value)}
          className="mx-2 p-2 border rounded"
        >
          <option value="">All Origins</option>
          {origins.map((origin) => (
            <option key={origin} value={origin}>
              {origin}
            </option>
          ))}
        </select>
      </div>


      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <Recipe key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <div className="text-center mt-8 text-2xl">Aucune recette trouvée.</div>
        )}
      </div> */}

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
    </motion.div>
  );
}


/**
 *  Formulaire d'ajout  
 */

<form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label htmlFor="name" className="block text-lg font-medium text-gray-700">Nom</label>
    <input
      type="text"
      id="name"
      name="name"
      value={recipe.name}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required
    />
    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
  </div>

  <div>
    <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
    <textarea
      id="description"
      name="description"
      value={recipe.description}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required
    />
    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
  </div>

  <div>
    <label htmlFor="difficulty" className="block text-lg font-medium text-gray-700">Difficulté</label>
    <select
      id="difficulty"
      name="difficulty"
      value={recipe.difficulty}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required
    >
      <option value="">Sélectionnez une difficulté</option>
      <option value="Facile">Facile</option>
      <option value="Moyenne">Moyenne</option>
      <option value="Difficile">Difficile</option>
    </select>
    {errors.difficulty && <p className="text-red-500 text-sm">{errors.difficulty}</p>}
  </div>

  <div>
    <label htmlFor="image" className="block text-lg font-medium text-gray-700">Image</label>
    <input
      type="text"
      id="image"
      name="image"
      value={recipe.image}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required
    />
    {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
  </div>

  <div>
    <label htmlFor="prepTime" className="block text-lg font-medium text-gray-700">Temps de préparation (minutes)</label>
    <input
      type="number"
      id="prepTime"
      name="prepTime"
      value={recipe.prepTime}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required
    />
    {errors.prepTime && <p className="text-red-500 text-sm">{errors.prepTime}</p>}
  </div>

  <div>
    <label htmlFor="category" className="block text-lg font-medium text-gray-700">Catégorie</label>
    <input
      type="text"
      id="category"
      name="category"
      value={recipe.category}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required
    />
    {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
  </div>

  <div>
    <label htmlFor="origin" className="block text-lg font-medium text-gray-700">Origine</label>
    <input
      type="text"
      id="origin"
      name="origin"
      value={recipe.origin}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required
    />
    {errors.origin && <p className="text-red-500 text-sm">{errors.origin}</p>}
  </div>

  <div>
    <label className="block text-lg font-medium text-gray-700">Ingrédients</label>
    {recipe.ingredients?.map((ingredient, index) => (
      <div key={index} className="flex items-center">
        <input
          type="text"
          value={ingredient}
          onChange={(e) => handleArrayChange(e, index, 'ingredients')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
        <button type="button" onClick={() => handleRemoveField(index, 'ingredients')} className="ml-2 text-red-500">-</button>
      </div>
    ))}
    <button type="button" onClick={() => handleAddField('ingredients')} className="mt-2 text-indigo-500">Ajouter un ingrédient</button>
  </div>

  <div>
    <label className="block text-lg font-medium text-gray-700">Étapes de préparation</label>
    {recipe.preparationSteps?.map((step, index) => (
      <div key={index} className="flex items-center">
        <input
          type="text"
          value={step}
          onChange={(e) => handleArrayChange(e, index, 'preparationSteps')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
        <button type="button" onClick={() => handleRemoveField(index, 'preparationSteps')} className="ml-2 text-red-500">-</button>
      </div>
    ))}
    <button type="button" onClick={() => handleAddField('preparationSteps')} className="mt-2 text-indigo-500">Ajouter une étape</button>
  </div>

  <div>
    <label htmlFor="servings" className="block text-lg font-medium text-gray-700">Portions</label>
    <input
      type="number"
      id="servings"
      name="servings"
      value={recipe.servings}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required
    />
    {errors.servings && <p className="text-red-500 text-sm">{errors.servings}</p>}
  </div>

  <div>
    <label htmlFor="cookingTips" className="block text-lg font-medium text-gray-700">Conseils de cuisson</label>
    <textarea
      id="cookingTips"
      name="cookingTips"
      value={recipe.cookingTips}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required
    />
    {errors.cookingTips && <p className="text-red-500 text-sm">{errors.cookingTips}</p>}
  </div>

  <button type="submit" className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md">Ajouter la recette</button>
</form>
