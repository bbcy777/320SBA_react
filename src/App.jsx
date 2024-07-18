import { Routes, Route } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import Home from './page/Home'
import Inventory from './page/Inventory'
import Recipe from './page/Recipe'


function App() {
    return (
    <>
      <Nav />
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/inventory' element={<Inventory />} />
        <Route path='/recipe' element={<Recipe />} />
      </Routes>
    </>
  )
}

export default App
