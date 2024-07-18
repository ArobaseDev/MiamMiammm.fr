import React, { useState } from 'react';


  export async function searchRecipe  (e: React.FormEvent<HTMLFormElement>)  {
    const [listRecipes, setListRecipes] = useState()
 const query = "Tarte"
    e.preventDefault() // On limite le formulaire à la soumission
    // if (query.trim() === "") {
    //   setError("Merci de tapez un mot-clé de 3 caractères minimum")
    // } // Si le champ est vide ou trop court on affiche une erreur

    const url = `http://www.omdbapi.com/?apikey=e1741d2c&s=${query}`
    try {
      const res = await fetch(url) // On fetch l'API OMDB
      const data = await res.json() // On récupère les données et les converti
      if (data.Response === "False") { // S'il n'y a pas de résultat
        setListRecipes([]) // Le tableau est vide
      } else { // S'il y a un résultat
        setListRecipes(data.Search) // On l'ajoute au tableau
      }
    } catch (err) {
      console.log("Une erreur est survenue lors votre recherche : " + err.message)
    }
  }


