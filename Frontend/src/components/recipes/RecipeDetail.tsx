import { useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react";


import Header from "../header/Header";
import Recipes from "../../services/interfaces/Recipes";
import { getRecipeById } from "../../services/API/Database";

export default function RecipeDetail() {

  let { id } = useParams();

  const [recipe, setRecipe] = useState<Recipes>([]);

  const getRecipe = async () => {
    try {
      const response = await getRecipeById(id)
      console.log("Les données : ", response)
      setRecipe(response)
    } catch (error) {
      console.log("Erreur : ", error)
    }
  }

  useEffect(() => {
    getRecipe()
  }, [id]);

  const addToFavorites = () => {

  }


  // const addToFavorites = () => {
  //   // Add the recipe to the user's favorites
  // };

  return (
    <>
      <Header />

      <main className="recipe-detail flex m-6 p-6 gap-10 items-center ">
        <section className="recipe-detail-section-left">
          <img src={recipe.image} alt="" className="rounded-2xl recipe-detail-img" />
        </section>
        <section className="recipe-detail-section-right">
          <h1>{recipe.name}</h1>
          <h2>{recipe.origin}</h2>
          <h5>Temps de préparation : {recipe.prepTime} </h5>
          <p>Catégorie : {recipe.category}</p>
          <h3>Ingredients : </h3>


          {/* {recipe.ingredients.map((ingredient, index) => (
              <p key={index}>{ingredient}</p>
            ))} */}

          <p>Portions : {recipe.servings}</p>

          {/* <h3>Etapes de préparation : </h3>{
            recipe.preparationSteps.map((step, index) => (
              <h6 key={index}>{index + 1}. {step}</h6>
            ))} */}

          <h3>Conseils de cuisine : </h3>
          <h6> {recipe.cookingTips}</h6>
          <button onClick={addToFavorites}>Ajouter à mes recettes préférées</button>
          {/* <button onClick={deleteRecipe}>Supprimer cette recette</button> */}
        </section>
      </main>





      {/* <button onClick={deleteRecipe}>Supprimer cette recette</button> */}
    </>
  )
}