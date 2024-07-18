import { useEffect, useState} from 'react'
import { getRecipes } from '../../Services/API/Database'

import Recipes from '../../Services/Interfaces/Recipes'
import Recipe from './Recipe'

export default function RecipeList () {
  const [recipes, setRecipes] = useState([])

  const recipesList = async () => {
    try {
      const response = await getRecipes()
      console.log("La reponse de la requete : ", response)
      setRecipes(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    recipesList()
  }, [])

  return (
    <>
     <main className="m-8 ">
     <h1>Les recettes du moment</h1>
     <aside className='bg-red-500'>

     </aside>
     <section className="grid grid-cols-1 gap-4 md:grid-cols-3 gap-4 p4 ">
       {recipes.map((recipe: Recipes) => (
          <Recipe key={recipe.id}
           recipe={recipe} 
           />
       ))}

     </section>
     </main>
    </>

  )
}