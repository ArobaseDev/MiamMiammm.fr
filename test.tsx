try {
  const response = await fetch(`https://recettes-api.vercel.app/recettes`);
  const data: Recipe[] = await response.json(); // Utilisation de l'interface Recipe
  // Filtrage des résultats
  const filteredData = data.filter((item: Recipe) => // Utilisation de l'interface Recipe
      item.name.toLowerCase().includes(query.toLowerCase())
  );
  setResults(filteredData);
} catch (err) {
  if (err instanceof Error) {
      setError(err.message);
  } else {
      setError("Une erreur est survenue lors de la recherche");
  }
} finally {
  setLoading(false);
}


/////*****///

useEffect(() => {
  const storedFavorites = localStorage.getItem('Miam-Miammm-favorites');
  if (storedFavorites) {
    setIsFavorite(JSON.parse(storedFavorites).some(favorite => favorite.id === recipe.id));
    //   setIsFavorite(favorites.some(favorite => favorite.id === recipe.id));
  }
}, [recipe.id]);

const toggleFavorite = () => {
  const storedFavorites = localStorage.getItem('Miam-Miammm-favorites'); // Vérification si la clé existe dans le LocalStorage
  if (storedFavorites) {
    let favorites = JSON.parse(storedFavorites)   // Si elle existe alors transformation en objet JSON
    if (isFavorite) {
      favorites = favorites.filter(f => f.id !== recipe.id)  // Si la recette est déjà dans les favoris, alors nous la retirons
    } else {
      favorites.push(recipe)  // Ajout dans le tableau des favoris
    }
    localStorage.setItem('Miam-Miammm-favorites', JSON.stringify(favorites)); // Mise à jour du LocalStorage en transformant le tableau en chaîne de caractères valides (clé, valeur)
    setIsFavorite(!isFavorite)
  }


  <button onClick={toggleFavorite}

    className={` ${isFavorite ? "bg-red-600" : "bg-transparent btn-heart items-right"} `}>
    {
      isFavorite ? <FaRegHeart color="white" font-size="2.5rem" /> : <FaRegHeart color="red" font-size="2.5rem" />
    }


  </button>

}