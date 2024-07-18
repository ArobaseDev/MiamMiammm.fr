import { NavLink } from "react-router-dom"
import topChef from '../../assets/img/top-chef.png'
import hummm from '../../assets/img/hummm.png'

export default function Header () {
  return (
    <>
    <header className=" header text-red">
        <h3>Hummmm Trop Bon !!!</h3>    <img src={hummm} alt="" className="header-brand-logo hummm" />
    <NavLink className="brand-nav" to="/">
    <img src={topChef} alt="" className="header-brand-logo top-chef" />
    <h1 className="title">Miam.Miammm.fr</h1>

    </NavLink>
  
    
      <nav className="navbarTop">
     
          
          <NavLink to="/recipe/1">Ajouter une recette</NavLink>
          <NavLink to="/favorites-recipes">Mes recettes préférées</NavLink>
        
      </nav>
    </header>
    </>
  )
}