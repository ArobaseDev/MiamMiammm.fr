import Header from "../header/Header";
import { useNavigate } from "react-router-dom";
import Recipes from "../../services/interfaces/Recipes";
import { addRecipe}

export default function RecipeForm () {
  return (
    <>
    <Header/>
    <main>
      <h1>Ajouter une recette</h1>
      </main>
    </>
  )
}