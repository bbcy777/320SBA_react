import {useState, useEffect, useContext} from 'react'
import { IngredientsContext } from '../contexts/Context'
import axios from 'axios'

const Recipe = () => {
  const [recipes, setRecipes] = useState([])
  const [recipeCards, setRecipeCards] = useState('')
  const {selectedIngredients} = useContext(IngredientsContext)

  let key = import.meta.env.VITE_apiKey
  console.log(key);
  const ingredients = selectedIngredients.map(el => el.title ).join(',')

  useEffect(()=>{
    async function spoonacular() {
      try{
        let response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=2&apiKey=${key}`);
        let data = response.data;
        setRecipes(data)
        console.log(data);
      } catch (err) {
        console.error(err)
      }
    }
    if(selectedIngredients.length > 0) {
      spoonacular()
    }
  },[selectedIngredients, ingredients, key])   
      
  useEffect(()=>{
    async function cardFetch() {
      const cards = {}
      for(let recipe of recipes) {
        try {
          let result = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/card?apiKey=${key}`)
          cards[recipe.id] = result.data.url
        } catch (err) {
          console.error(err)
        }
      }
      setRecipeCards(cards)
    }
    if(recipes.length>0) cardFetch();
  },[recipes, key])
    
  return (
    <div>
      <h3>Recipe Idea with {ingredients}</h3>
      <div className='recipeCards'>
        {recipes.map(item =>(
          <div key={item.id} className='cardItem'>
            <h4>{item.title}</h4>
            {recipeCards[item.id]?
            (<img src={recipeCards[item.id]} alt={item.title} />
            ) : (
            <h4>No recipe card for {item.title}</h4>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Recipe