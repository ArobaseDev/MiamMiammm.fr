import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";


import Header from "../header/Header";
import Recipes from "../../services/interfaces/Recipes";
import { getRecipeById } from "../../services/API/Database";

export default function RecipeDetail() {

  let { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);




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

  // Vérifier si la recette est déjà dans les favoris
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('Miam-Miammm-favorites')) || [];
    setIsFavorite(favorites.some(favorite => favorite.id === recipe.id));
  }, [recipe.id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('Miam-Miammm-favorites')) || [];

    if (isFavorite) {
      // Retirer la recette des favoris
      favorites = favorites.filter(favorite => favorite.id !== recipe.id);
    } else {
      // Ajouter la recette aux favoris
      favorites.push(recipe);
    }

    localStorage.setItem('Miam-Miammm-favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <Header />

      <div className="recipe-detail flex items-center  p-6 gap-10 justify-start ">
        <section className="recipe-detail-section-left w-1/2">
         
          <img src={recipe.image} alt="" className="rounded-2xl recipe-detail-img" />
        </section>
        <section className="recipe-detail-section-right items-center  w-[50%] text-center">
          <h1 className="text-center mb-8">{recipe.name}</h1>
          <h3 className="bold extrabold text-bold">Spécialité : {recipe.origin}</h3>
          <h5>Temps de préparation : {recipe.prepTime} </h5>
          <p>Catégorie : {recipe.category}</p>
          <h3>Ingredients : </h3>
          {ingredients.map((ingredient) => (
              <h5>{ingredient}</h5>
            ))}
          <h3>Portions : </h3>
          <p>{recipe.servings}</p>

          <h3>Etapes de préparation : </h3>{
            steps.map((step) => (
              <h6> {step}</h6>
            ))}

          <h3>Conseils de cuisine : </h3>
          <h6> {recipe.cookingTips}</h6>

    <div className="container mt-10 bg-slate-200 py-5 rounded">
            <button onClick={toggleFavorite}
              className={` ${isFavorite ? "bg-red-600" : "bg-transparent btn-heart items-right"} `}>
              {
                isFavorite ? <FaRegHeart color="white" font-size="2.5rem" /> : <FaRegHeart color="red" font-size="2.5rem" />
              }
            </button>
    </div>
        </section>
      </div>

    </>
  )
}