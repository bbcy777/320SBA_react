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
        <div id="navLink">
            <Link to ='/inventory'>
                <div>Food Inventory</div>
            </Link>
            <Link to ='/recipes'>
                <div>Recipes</div>
            </Link>
        </div>
    </nav>
  )
}

export default Nav