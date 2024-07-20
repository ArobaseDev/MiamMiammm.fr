import Header from "../header/Header";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import { createRecipe } from "../../services/API/Database";
import Recipes from "../../services/interfaces/Recipes";

export default function RecipeForm () {
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    difficulty: '',
    image: '',
    prepTime: '',
    category: '',
    origin: '',
    ingredients: [''],
    preparationSteps: [''],
    servings: 1,
    cookingTips: '',
  });

  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
    if (value.length < 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'Minimum 3 caractères requis',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: 'ingredients' | 'preparationSteps') => {
    const { value } = e.target;
    const updatedArray = [...(recipe[field] || [])];
    updatedArray[index] = value;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [field]: updatedArray,
    }));
  };

  const handleAddField = (field: 'ingredients' | 'preparationSteps') => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [field]: [...(prevRecipe[field] || []), ''],
    }));
  };

  const handleRemoveField = (index: number, field: 'ingredients' | 'preparationSteps') => {
    const updatedArray = (recipe[field] || []).filter((_, i) => i !== index);
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [field]: updatedArray,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createRecipe(recipe as Recipes);
    navigate('/');
  };

  return (
    <>
    <Header/>
    <main>
      <div className="recipe-form">

          <h1>Ajouter une recette</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">Nom</label>
              <input
                type="text"
                id="name"
                name="name"
                value={recipe.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                name="description"
                value={recipe.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div>
              <label htmlFor="difficulty" className="block text-lg font-medium text-gray-700">Difficulté</label>
              <select
                id="difficulty"
                name="difficulty"
                value={recipe.difficulty}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Sélectionnez une difficulté</option>
                <option value="Facile">Facile</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Difficile">Difficile</option>
              </select>
              {errors.difficulty && <p className="text-red-500 text-sm">{errors.difficulty}</p>}
            </div>

            <div>
              <label htmlFor="image" className="block text-lg font-medium text-gray-700">Image</label>
              <input
                type="text"
                id="image"
                name="image"
                value={recipe.image}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
              {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
            </div>

            <div>
              <label htmlFor="prepTime" className="block text-lg font-medium text-gray-700">Temps de préparation (minutes)</label>
              <input
                type="text"
                id="prepTime"
                name="prepTime"
                value={recipe.prepTime}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
              {errors.prepTime && <p className="text-red-500 text-sm">{errors.prepTime}</p>}
            </div>

            <div>
              <label htmlFor="category" className="block text-lg font-medium text-gray-700">Catégorie</label>
              <input
                type="text"
                id="category"
                name="category"
                value={recipe.category}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>

            <div>
              <label htmlFor="origin" className="block text-lg font-medium text-gray-700">Origine</label>
              <input
                type="text"
                id="origin"
                name="origin"
                value={recipe.origin}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
              {errors.origin && <p className="text-red-500 text-sm">{errors.origin}</p>}
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">Ingrédients</label>
              {recipe.ingredients?.map((ingredient, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleArrayChange(e, index, 'ingredients')}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                  <button type="button" onClick={() => handleRemoveField(index, 'ingredients')} className="ml-2 text-red-500">-</button>
                </div>
              ))}
              <button type="button" onClick={() => handleAddField('ingredients')} className="mt-2 text-indigo-500">Ajouter un ingrédient</button>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">Étapes de préparation</label>
              {recipe.preparationSteps?.map((step, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => handleArrayChange(e, index, 'preparationSteps')}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                  <button type="button" onClick={() => handleRemoveField(index, 'preparationSteps')} className="ml-2 text-red-500">-</button>
                </div>
              ))}
              <button type="button" onClick={() => handleAddField('preparationSteps')} className="mt-2 text-indigo-500">Ajouter une étape</button>
            </div>

            <div>
              <label htmlFor="servings" className="block text-lg font-medium text-gray-700">Portions</label>
              <input
                type="number"
                id="servings"
                name="servings"
                value={recipe.servings}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
              {errors.servings && <p className="text-red-500 text-sm">{errors.servings}</p>}
            </div>

            <div>
              <label htmlFor="cookingTips" className="block text-lg font-medium text-gray-700">Conseils de cuisson</label>
              <textarea
                id="cookingTips"
                name="cookingTips"
                value={recipe.cookingTips}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
              {errors.cookingTips && <p className="text-red-500 text-sm">{errors.cookingTips}</p>}
            </div>

            <button type="submit" className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md">Ajouter la recette</button>
          </form>
      </div>
      </main>
    </>
  )
}