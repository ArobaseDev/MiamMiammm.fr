import Recipes from "../../services/interfaces/Recipes"
import { NavLink } from "react-router-dom";
import { TfiEye } from "react-icons/tfi";
import { FaRegHeart } from "react-icons/fa";
import { TfiAlarmClock } from "react-icons/tfi";
import { useState, useEffect } from "react";


interface RecipeProps {
  recipe: Recipes;
}



export default function Recipe({ recipe }: RecipeProps) {
  const [isFavorite, setIsFavorite] = useState(false);

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
    <article
      key={recipe.id}
      className="recipe-card"

    >
      <h2 className="text-center">{recipe.name}</h2>
      <NavLink to={"/recipes/" + recipe.id}>
        <img src={recipe.image} alt={"image " + recipe.name} />
      </NavLink>

      <p className="text-center flex flex-column justify-center mt-2 gap-2"><TfiAlarmClock />  {recipe.prepTime} </p>
      <div className="card-footer flex justify-between xl-4 p-5">
        <NavLink
          to={"/recipes/" + recipe.id}
        >
          <span className="bg-transparent"> <TfiEye font-size="2.5rem" /> </span>
        </NavLink>
        <button onClick={toggleFavorite}
          className={` ${isFavorite ? "bg-red-600" : "bg-transparent btn-heart items-right"} `}>
          {
            isFavorite ? <FaRegHeart color="white" font-size="2.5rem" /> : <FaRegHeart color="red" font-size="2.5rem" />
          }
        </button>

      </div>


    </article>
  )
}