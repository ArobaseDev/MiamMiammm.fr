import Header from "../header/Header";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import FormImg from '../../assets/img/regal-1.png'


import { createRecipe } from "../../services/API/Database";
import Recipes from "../../services/interfaces/Recipes";
import '../../assets/css/recipe.form.css'

export default function RecipeForm() {
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
  const [selectedFile, setSelectedFile] = useState(null)

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
      <Header />
      <main className="m-8 w-screen">
        <h1 className="ml-8">Ajouter une nouvelle recette</h1>

        <div className="recipe-form m-5 container-fluid b-  w-screen flex ">

          <div className='form-container'>
            <div className='left-container'>
    <h2 className="mx-9 ">Yay, Super! Nous avons hâte de déguster ça !!!</h2>


              <form onSubmit={handleSubmit} className="create-recipe-form">

              <header>



                <div className='set'>
                  <div className='recipe-name'>
                    <label htmlFor='recipe-name'><h6> Appelation</h6></label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={recipe.name}
                      onChange={handleChange}
                      placeholder="Nom de la recette"
                      required
                       />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>
                  <div className='recipe-name'>
                    <label htmlFor='recipe-description'><h6> Description</h6></label>
                    <input 
                      id="description"
                      name="description"
                      value={recipe.description}
                      onChange={handleChange}
                    placeholder="Un petit mot..." 
                    type='text' 
                    required
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                  </div>
                  <div className='recipe-origin'>
                    <label htmlFor='origin'><h6> Spécialité - Origine</h6></label>
                    <input id='origin' 
                    name="origin"
                        value={recipe.origin}
                        onChange={handleChange}
                    placeholder="Ou voyageons nous ?" 
                    type='text' />
                      {errors.origin && <p className="text-red-500 text-sm">{errors.origin}</p>}
                  </div>
           
                </div>

                  <div className="set m-5 radios" >
                    <div className='recipe-category'>
                      <label htmlFor='recipe-category-entree'><h6> Catégorie</h6></label>
                      <div className='radio-container'>

                        <input 
                        type='radio' 
                        name='category' 
                        id='recipe-category-entree' 
                        value='Entrée' 
                        onChange= {handleChange}
                        />
                        <label htmlFor='recipe-category-entree'>Entrée</label>

                        <input id='recipe-category-plat' name='category' type='radio' value='Plat principal' onChange={handleChange} />
                        <label htmlFor='recipe-category-plat'>Plat principal</label>
                        <input id='recipe-category-dessert' name='category' type='radio' value='Dessert' onChange={handleChange} />
                        <label htmlFor='recipe-category-dessert'>Dessert</label>
                      </div>
                    </div>


                    <div className='recipe-difficulty'>
                      <label htmlFor='recipe-difficulty-facile'><h6>Difficulté</h6></label>
                      <div className='radio-container'>
                        <input id='recipe-difficulty-facile' name='difficulty' type='radio' value='Facile'  onChange= {handleChange}/>
                        <label htmlFor='recipe-difficulty-facile'>Facile</label>
                        <input id='recipe-difficulty-moyenne' name='difficulty' type='radio' value='Moyenne'  onChange= {handleChange}/>
                        <label htmlFor='recipe-difficulty-moyenne'>Moyenne</label>
                        <input id='recipe-difficulty-dure' name='difficulty' type='radio' value='Dure'  onChange= {handleChange}/>
                        <label htmlFor='recipe-difficulty-dure'>Dure </label>
                      </div>
                    </div>

                  </div>

               
                <div className="set">
                  <div className='recipe-prep-time'>
                    <label htmlFor='prepTime-'><h6> Temps de préparation</h6></label>
                    <input
                      id="prepTime"
                      name="prepTime"
                      value={recipe.prepTime}
                      onChange={handleChange}
                      placeholder="Saisir le temps en minutes"
                      type='text'
                      required
                    />
                  </div>
                  <div className='recipe-servings'>
                    <label htmlFor='servings'><h6> Portions</h6></label>
                    <input
                      id="servings"
                      name="servings"
                      value={recipe.servings}
                      onChange={handleChange}
                      placeholder="Nombre de parts"
                      type='number'
                      required
                    />
                  </div>
                  <div className='recipe-image'>
                    <label htmlFor='image'><h6> Téléchargement image</h6></label>
                    <input
                      id="image"
                      name="image"
                      // value={selectedFile}
                      value={recipe.image}
                      onChange={handleChange}
                      // type='file'
                      type='text'
                      required
                    />
                  </div>
                </div>

                <div className='set'>
                 
                 
                  <div className='recipe-ingredients'>
                    <label htmlFor='ingredients'><h6 className="inline"> Ingrédients</h6>  <button type="button" onClick={() => handleAddField('ingredients')} className=" inline bg-transparent text-3xl  mt-2 text-indigo-500">+</button></label>
                    {recipe.ingredients?.map((ingredient, index) => (
                       <div key={index} className="flex items-center">
                    <input 
                    id='ingredients' 
                          value={ingredient}
                          onChange={(e) => handleArrayChange(e, index, 'ingredients')}
                    placeholder="Eau , Sel, Poivre..." 
                    type='text' 
                    />
                      <button type="button" onClick={() => handleRemoveField(index, 'ingredients')} className=" text-3xl text-red-900 bg-transparent">-</button>
                    </div>
                   ))}                 
                  </div>
                  <div className='recipe-preparation-steps'>
                    <label htmlFor='preparationSteps'><h6 className="inline"> Etapes de préparation</h6>  <button type="button" onClick={() => handleAddField('preparationSteps')} className=" inline bg-transparent text-3xl  mt-2 text-indigo-500">+</button></label>
                    {recipe.preparationSteps?.map((step, index) => (
                       <div key={index} className="flex items-center">
                    <input 
                          id='preparationSteps' 
                          value={step}
                          onChange={(e) => handleArrayChange(e, index, 'preparationSteps')}
                    placeholder="Etape ..." 
                    type='text' 
                    />
                        <button type="button" onClick={() => handleRemoveField(index, 'preparationSteps')} className=" text-3xl text-red-900 bg-transparent">-</button>
                    </div>
                   ))}                 
                  </div>
                  <div className='recipe-cooking-tips'>
                    <label htmlFor='cookingTips'><h6> Conseils de cuisine</h6></label>
                    <textarea
                      id="cookingTips"
                      name="cookingTips"
                      rows={10}
                      cols={50}
                        value={recipe.cookingTips}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  

                </div>




                <div className='set'>
                 
                 
                </div>
             
              </header>
              <footer>
                <div className='set'>
                  <button id='send'> <h3>SOUMETTRE AUX PAPILLES !!!</h3>   </button>
                </div>
              </footer>

                </form>
                
            </div>


            <div className='right-container'>

              <div className='img-container'>
                <img src={FormImg} />
              </div>
              <div className='puppy'>
                <img src={FormImg} />
              </div>
            </div>
          </div>


        </div>
      </main>
    </>
  )
}