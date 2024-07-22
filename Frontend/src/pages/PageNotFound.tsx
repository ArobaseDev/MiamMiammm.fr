import Header from "../components/header/Header";
import Img404 from '../assets/img/ustensiles-3.webp'

export default function PageNotFound() {
  return (
    <>
    <Header />
    <div className="flex flex-row items-center justify-center max-h -full w-screen">
        <img src={Img404} alt="top-chef" className="w-1/2 flex " />
        <div className="container flex flex-col justify-center ">
  <h1 className="text-8xl font-bold text-center text-gray-800 dark:text-red ">Erreur de ressources </h1>
      <h2 className=" text-center text-gray-600 dark:text-gray-400">Nous somme désolé mais ce que vous cherchez n'existe pas ici !!! </h2>
        </div>
      
      <a href="/" className="mt-4 text-lg font-medium text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 rounded-lg px-4 py-2.5">Back to home</a>
    </div>
      </>
  )
}