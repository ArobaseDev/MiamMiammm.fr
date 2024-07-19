import { useEffect, useState} from 'react'
import { getRecipes } from '../../Services/API/Database'

import Recipes from '../../Services/Interfaces/Recipes'
import Recipe from './Recipe'

export default function RecipeList () {
  const [recipes, setRecipes] = useState([])
  const [filters, setFilters] = useState({
    entree: false,
    platPrincipal: false,
    dessert: false,
  })
  

  const recipesList = async () => {
    try {
      const response = await getRecipes()
      setRecipes(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    recipesList()
  }, [])

  const handleFilterChange = (e) => {
    const { id, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: checked,
    }));
  };

  const filteredRecipes = recipes.filter((recipe) => {
    if (filters.entree && recipe.category === 'Entrée') return true;
    if (filters.platPrincipal && recipe.category === 'Plat principal') return true;
    if (filters.dessert && recipe.category === 'Dessert') return true;
    return false;
  });



  return (
    <>
    <div className="h-full w-full  flex flex-column ">

        <aside className='dark:bg-green-400 w-1/6 h-full  gap-5'>
       <section>
        <h4 className='text-slate-200 pl-5 pt-5'>Nos types de plats</h4>

            <div className="flex items-center mx-5 px-9 ">
              <input 
              id="entree" 
              type="checkbox" value="categoryRecipes" 
              className="text-3xl w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={handleFilterChange}
              />
              <label 
              htmlFor="entree" 
              className="text-3xl mx-5 my-3 font-medium text-gray-900 dark:text-indigo-400"><h4>Entrée</h4></label>
            </div>
            <div className="flex items-center mx-5 px-9 ">
              <input 
                id="platPrincipal" 
              type="checkbox" value="categoryRecipes" 
              className="text-3xl w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={handleFilterChange}
              />
              <label 
                htmlFor="platPrincipal" 
                className="text-3xl mx-5 my-3  font-medium text-gray-900 dark:text-indigo-400"><h4>Plat principal</h4></label>
            </div>
            <div className="flex items-center mx-5 px-9 ">
              <input 
              id="dessert" 
              type="checkbox" value="categoryRecipes" 
              className="text-3xl w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={handleFilterChange}
              />
              <label 
              htmlFor="dessert" 
                className="text-3xl mx-5 my-3 font-medium text-gray-900 dark:text-indigo-400"><h4>Dessert</h4></label>
            </div>
            

       </section>
       <section>
        <h4 className='text-slate-200 pl-5 pt-5'>Nos Spécialités</h4>
       </section>
       <section id="suggestions">
        <h4 className='text-slate-200 pl-5 pt-5'>Nos Suggestions</h4>
       </section>



       
     </aside>
     <main className="m-8 p-4 ">
     <h1>Les recettes du moment</h1>
     
     <section className="grid grid-cols-1 gap-4 md:grid-cols-3 gap-4 p4 ">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe: Recipes) => (
                <Recipe key={recipe.id} recipe={recipe} />
              ))
            ) : (
              recipes.map((recipe: Recipes) => (
                <Recipe key={recipe.id} recipe={recipe} />
              ))
            )}

     </section>
     </main>

    </div>
    
    </>

  )
}