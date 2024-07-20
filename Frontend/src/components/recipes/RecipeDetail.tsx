import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";


import Header from "../header/Header";
import Recipes from "../../services/interfaces/Recipes";
import { getRecipeById } from "../../services/API/Database";

export default function RecipeDetail() {

  let { id } = useParams();

  const [recipe, setRecipe] = useState<Recipes>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);

  const getRecipe = async () => {
    try {
      const response = await getRecipeById(id)
      console.log("Les données : ", response)
      const ingredients = response.ingredients;
      const steps = response.preparationSteps;
      setRecipe(response)
      setIngredients(ingredients)
      setSteps(steps)
    } catch (error) {
      console.log("Erreur : ", error)
    }
  }

  useEffect(() => {
    getRecipe()
  }, [id]);

  return (
    <>
      <Header />

      <div className="recipe-detail flex items-center  p-6 gap-10 justify-start ">
        <section className="recipe-detail-section-left w-1/2">
          <h1 className="text-center mb-8">{recipe.name}</h1>
          <img src={recipe.image} alt="" className="rounded-2xl recipe-detail-img" />
        </section>
        <section className="recipe-detail-section-right items-center  w-[50%] text-center">
          
          <h3>Spécialité : {recipe.origin}</h3>
          <h5>Temps de préparation : {recipe.prepTime} </h5>
          <p>Catégorie : {recipe.category}</p>
          <h3>Ingredients : </h3>
          {ingredients.map((ingredient) => (
              <h5>{ingredient}</h5>
            ))}
          <h4>Portions : {recipe.servings}</h4>

          <h3>Etapes de préparation : </h3>{
            steps.map((step) => (
              <h6> {step}</h6>
            ))}

          <h3>Conseils de cuisine : </h3>
          <h6> {recipe.cookingTips}</h6>
          {/* <button onClick={addToFavorites}>Ajouter à mes recettes préférées</button> */}
          {/* <button onClick={deleteRecipe}>Supprimer cette recette</button> */}
        </section>
      </div>

    </>
  )
}