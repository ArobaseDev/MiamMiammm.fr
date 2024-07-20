import { useEffect, useState } from 'react';
import { getRecipes } from '../../services/API/Database';

import Recipe from './Recipe';
import CardMessage from '../cards/CardMessage';
import { useSearch } from '../../services/providers/AppProvider';
import Recipes from '../../Services/interfaces/Recipes';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState('');
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

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) => prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const handleOriginChange = (event) => {
    setSelectedOrigin(event.target.value);
  };

  const filteredRecipes = recipes
    .filter(recipe =>
      recipe.name.toLowerCase().includes(state.query.toLowerCase()) || 
      recipe.origin.toLowerCase().includes(state.query.toLowerCase()) ||
       recipe.category.toLowerCase().includes(state.query.toLowerCase())
    )
    .filter(recipe =>
      selectedCategories.length ? selectedCategories.includes(recipe.category) : true
    )
    .filter(recipe =>
      selectedOrigin ? recipe.origin === selectedOrigin : true
    );

  return (
    <div className="h-full w-full flex flex-column">
        <aside className=" aside-bar w-1/6 p-4 h-full">

        <section>

          <h4 className="text-slate-900 pl-5 pt-5">Nos types de plats</h4>
          {categories.map((category) => (
            <div 
            key={category}
              className="flex items-center mx-5 py-2"
            >
              <input
                type="checkbox"
                id={category}
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <label 
              htmlFor={category} 
                className="text-3xl ml-2  font-medium text-gray-900 dark:text-indigo-800"
              >
              {category}
              </label>
            </div>
          ))}
        </section>
        <section>
          <h4 className="text-slate-900 pl-5 pt-5">Nos Spécialités</h4>
          <select 
          value={selectedOrigin} 
          onChange={handleOriginChange} 
          className="w-full mt-2 p-2 border rounded"
          >
            <option value="">Select an origin</option>
            {origins.map((origin) => (
              <option key={origin} value={origin}>{origin}</option>
            ))}
          </select>
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
