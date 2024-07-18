import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'


function App() {
  let key = import.meta.env.VITE_apiKey
  useEffect(()=>{
    async function spoonacular() {
      let response = await axios.get()
    }
  },[])
  const [count, setCount] = useState(0)


  return (
    <>
      
    </>
  )
}

export default App
