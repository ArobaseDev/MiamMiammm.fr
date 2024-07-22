import { useEffect, useState, ChangeEvent } from 'react';
import { getRecipes } from '../../services/API/Database';

import Recipe from './Recipe';
import CardMessage from '../cards/CardMessage';
import { useSearch } from '../../services/providers/AppProvider';
import Recipes from '../../services/interfaces/Recipes';

export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipes[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [origins, setOrigins] = useState<string[]>([]);
  const [selectedOrigin, setSelectedOrigin] = useState<string>('');
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

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevCategories) => prevCategories.includes(category)
      ? prevCategories.filter((c) => c !== category)
      : [...prevCategories, category]
    );
  };

  const handleOriginChange = (event: ChangeEvent<HTMLSelectElement>) => {
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
      <aside className=" aside-bar w-1/6 p-4 h-full px-6 ">

        <section className='mr-'>

          <h2 className="text-slate-900 pl-5 pt-5">Nos types de plats</h2>
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
                className="form-checkbox ml-4"
              />
              <label
                htmlFor={category}
                className="text-3xl ml-2  font-medium text-gray-900 dark:text-indigo-800"
              >
                <h5>
                   {category}
                </h5>
               
              </label>
            </div>
          ))}
        </section>
        <section className='mt-5'>
          <h2 className='ml-5 text-red-900'>Voyage culinaire</h2>
          <h4 className="text-slate-900 pl-5 pt-5">Découvrez les Saveurs du Monde</h4>
          <select
            value={selectedOrigin}
            onChange={handleOriginChange}
            className="w-full mt-2 p-2 border rounded"
          >
            <option value=""></option>
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