import {useState, useEffect} from 'react'
import axios from 'axios'

const Recipe = () => {

    let key = import.meta.env.VITE_apiKey
    useEffect(()=>{
        async function spoonacular() {
          let response = await axios.get()
        }
      },[])
      const [count, setCount] = useState(0)
      
  return (
    <div>Recipe</div>
  )
}

export default Recipe