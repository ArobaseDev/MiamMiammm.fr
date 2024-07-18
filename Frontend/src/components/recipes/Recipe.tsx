import Recipes from "../../Services/Interfaces/Recipes"
import { NavLink } from "react-router-dom";
import { TfiEye } from "react-icons/tfi";
import { FaRegHeart } from "react-icons/fa";
import { TfiAlarmClock } from "react-icons/tfi";
import { useState } from "react";


interface RecipeProps {
recipe : Recipes;
}



export default function Recipe ({recipe}: RecipeProps) {
  const [favorites, setFavorites] = useState()

  const addToFavorites = () => {
    const storedFavorites = localStorage.getItem('Miam-Miammm-favorites')
    if (storedFavorites) {
      const currentFavorites = JSON.parse(storedFavorites)
      if (!currentFavorites.includes(recipe.id)) {
        currentFavorites.push(recipe)
        localStorage.setItem('Miam-Miammm-favorites', JSON.stringify(currentFavorites))
        setFavorites(currentFavorites)
      }
    } else {
      localStorage.setItem('Miam-Miammm-favorites', JSON.stringify([recipe]))
      setFavorites([recipe])
  
  }
}

  return (
    <article 
    key={recipe.id}
    className="recipe-card"
    
    >
      <h2 className="text-center">{recipe.name}</h2>
      <NavLink to={"/recipes/"+recipe.id}>
      <img src={recipe.image} alt={"image " + recipe.name} />
      </NavLink>
      
      <p className="text-center flex flex-column justify-center"> <h4><TfiAlarmClock/></h4>  {recipe.prepTime} </p>
      <div className="card-footer flex justify-between xl-4 p-5">
      <NavLink
      to={"/recipes/"+recipe.id}
      >
      <span className="bg-transparent"> <TfiEye font-size="2.5rem" /> </span>
      </NavLink>
      <button onClick = {addToFavorites}
      className="bg-red-600 btn-heart items-right"> 
      <FaRegHeart color="white" font-size="2.5rem"   /> 
      
      </button>
      </div>
      
     
    </article>
  )
}