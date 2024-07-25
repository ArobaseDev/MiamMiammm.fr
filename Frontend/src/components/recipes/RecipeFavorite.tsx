import Recipes from "../../services/interfaces/Recipes"
import {useState, useEffect} from 'react'
import { NavLink } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { TfiAlarmClock } from "react-icons/tfi";
import { TfiEye } from "react-icons/tfi";



interface RecipeProps {
  recipe: Recipes;
} 

export default function RecipeFavorite({ recipe }: RecipeProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentRecipe, setCurrentRecipe] =useState(recipe)

  // Vérifier si la recette est déjà dans les favoris
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('Miam-Miammm-favorites') || '[]');
    setIsFavorite(favorites.some((favorite: Recipes) => favorite.id === recipe.id));
    setCurrentRecipe(recipe);
  }, [recipe.id]);

  // Alterner le statut favori
  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('Miam-Miammm-favorites') || '[]');

    if (isFavorite) {
      // Retirer la recette des favoris
      favorites = favorites.filter((favorite: Recipes) => favorite.id !== recipe.id);
    } else {
      // Ajouter la recette aux favoris
      favorites.push(recipe);
    }

    localStorage.setItem('Miam-Miammm-favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };
  return (
    <>
      <article
        key={currentRecipe.id}
        className="recipe-card"

      >
        <h2 className="text-center">{currentRecipe.name}</h2>
        <NavLink to={"/recipes/" + currentRecipe.id}>
          <div className="card-recipe-img-zoom"><img src={currentRecipe.image} alt={"image " + currentRecipe.name} className="card-recipe-img" /></div>
        </NavLink>

        <p className="text-center flex  justify-center mt-2 gap-2">
          <TfiAlarmClock font-size="2rem" align-center />  {currentRecipe.prepTime} </p>
        <div className="card-footer flex justify-between xl-4 p-5">
          <NavLink
            to={"/recipes/" + currentRecipe.id}
          >
            <TfiEye font-size="2.5rem" />
          </NavLink>
          <h6 className=" text-2xl items-start mt-4"> Difficulté de préparation : {currentRecipe.difficulty}</h6>
          <button onClick={toggleFavorite}
            className={` ${isFavorite ? "bg-red-600" : "bg-transparent btn-heart items-right"} `}>
            {
              isFavorite ? <FaRegHeart color="white" font-size="2.5rem" /> : <FaRegHeart color="red" font-size="2.5rem" />
            }
          </button>

        </div>


      </article>
    </>
  )
}