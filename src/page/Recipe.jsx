import {useState, useEffect, useContext} from 'react'
import { IngredientsContext } from '../contexts/Context'
import axios from 'axios'

const Recipe = () => {
  const [recipes, setRecipes] = useState([])
  const {selectedIngredients} = useContext(IngredientsContext)

  let key = import.meta.env.VITE_apiKey
  console.log(key);
  const ingredients = selectedIngredients.map(el => el.title ).join(',')

  useEffect(()=>{
    async function spoonacular() {
      try{
        let response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=2&apiKey=${key}`);
        let data = response.data;
        console.log(data);
      } catch (err) {
        console.error(err)
      }
    }
    if(selectedIngredients.length > 0) {
      spoonacular()
    }
  },[])   
      
  return (
    <div>
      <h3>Recipe Idea with {ingredients}</h3>
      
    </div>
  )
}

export default Recipe