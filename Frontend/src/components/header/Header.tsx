import { NavLink } from "react-router-dom"
import { ChangeEvent, useEffect, useState } from "react"
import {motion} from 'framer-motion'
import topChef from '../../assets/img/top-chef.png'
import hummm from '../../assets/img/hummm.png'
import { FaRegHeart } from "react-icons/fa";
import './header.css'

export default function Header () {
 // const [searchTerm, setSearchTerm] = useState("")
 const [favoritesNumber, setFavoritesNumber] = useState()

  useEffect(() => {
    getFavoritesNumber()

  }, [favoritesNumber])
  
 const getFavoritesNumber = () => {
  const favorites = JSON.parse(localStorage.getItem('Miam-Miammm-favorites')) || [];
   setFavoritesNumber(favorites.length)
  return favorites.length;
 }

  const [query, setQuery] = useState("")

  const searchRecipe = (query: string) => {
    console.log("Recherche : " + query)
  }

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  e.preventDefault()
  const value = e.target.value;
  setQuery(value);
  searchRecipe(query)

}



  return (
    <>
    <header className=" header text-red">
        <div className="flex items-center">
          <h3>Hummmm Trop Bon !!!</h3>
          <img src={hummm} alt="" className="header-brand-logo hummm" />
        </div>

        <div>
          <NavLink className="brand-nav" to="/">
            <img src={topChef} alt="" className="header-brand-logo top-chef" />
            <h1 className="title">Miam.Miammm.fr</h1>
          </NavLink>

        </div>

      
        
        
    
    <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="recipe-search-form"
        >
          <form 
            className=" search-form max-w-sm mx-auto  flex justify-center  gap-1 p-2 my-5"
           
            >
              

            <input 
            className="font-light text-center border rounded-full border-neutral-200 w-full py-4 text-2xl      "
            placeholder="Un plaisir ?"
            type="text"
            onChange={handleChange}
          
            />
            <button
            className=" px-4 py-2 font-light transition-all duration-300 rounded-full bg-neutral-200 text-slate-50 bg-gradient-to-r from-red-900 to-orange-500 hover:bg-gradient-to-b hover:from-orange-500 hover:to-red-900 hover:text-slate-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
            </button>
          </form>
          {/* <p className="text-center text-red-500">{error ? error : ""}</p> */}
        </motion.div>

    </header>

      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-6 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <NavLink to="/favorites-recipes" className="flex items-center">
              <span className="mr-3 h-6 sm:h-9"><FaRegHeart color="red" font-size="2rem" /></span>
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"> Mes recettes favorites </span><span className="text-cyan-500 mx-2 text-2xl">({favoritesNumber})</span>
            </NavLink>
            <div className="flex items-center lg:order-2">
              <a href="#" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</a>
              <a href="#" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Get started</a>
              <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </button>
            </div>
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <NavLink to="/" className="block py-2 pr-4 text-2xl pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/recipes/add" className="block py-2 pr-4 text-2xl pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Ajouter une recette</NavLink>
                </li>
                <li>
                  <a href="#" className="block py-2 pr-4 text-2xl pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Marketplace</a>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      </header>


    
    </>
  )
}