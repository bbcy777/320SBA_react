import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <nav className="nav">
        <Link to ='/'>
        <div  id='navLogo'>
            <img src={'/img/logo-rice-bowl.png'} alt="ricebowl logo" />
            <p>Repurpose Kitchen</p>
        </div>
        </Link>
        <ul id="navLink">
            <Link to ='/inventory'>
                <li className="navLink">Food Inventory</li>
            </Link>
            <Link to ='/recipes'>
                <li className="navLink">Recipes</li>
            </Link>
        </ul>
    </nav>
  )
}

export default Nav