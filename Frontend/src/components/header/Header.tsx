import { NavLink } from "react-router-dom"

export default function Header () {
  return (
    <>
    <header className=" header text-red">
    <h1 className="title">Miam.Miammm.fr</h1>
      <nav className="navbarTop">
     
          <NavLink to="/">Home</NavLink>
          <NavLink to="/recipe/1">Recettes</NavLink>
          <NavLink to="/favorites-recipes">Mes recettes préférées</NavLink>
        
      </nav>
    </header>
    </>
  )
}