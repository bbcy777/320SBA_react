import React, { useState, useReducer, useContext } from 'react'
import {IngredientsContext} from '../contexts/Context'
import { Link } from 'react-router-dom'

function reducer(state, action) {
  switch(action.type) {
    case('edit'): 
      return state.map(ingredient => 
        ingredient.id === action.payload.id
        ? {...ingredient, title: action.payload.title} 
        : ingredient)
    case('delete'):
      return state.filter(ingredient => ingredient.id !== action.payload.id)
    case('add'):
      return [action.payload, ...state]
    default:
      return state
  }
}
const Inventory = () => {
  const [inventory, dispatch] = useReducer(reducer, []);
  const [newItem, setNewItem] = useState('');
  const [editInfo, setEditInfo] = useState({id: null, title: ''})
  const [isChecked, setIsChecked] = useState(false)
  const {setSelectedIngredients} = useContext(IngredientsContext)

  function handleChange(e) {
    setNewItem(e.target.value)
  }
  function handleAdd(e) {
    e.preventDefault()
    if (newItem.trim() === '') return;
    addItem(newItem)
    setNewItem('')
  }

  function addItem(value) {
    const newItem = {
      id: inventory.length + 1,
      title: value.trim(), 
    }
    dispatch({type: 'add', payload: newItem})
  }

  function removeItem(id) {
    dispatch({type: 'delete', payload: {id}})
  }

  function updateEdit(e) {
    setEditInfo({...editInfo, title: e.target.value})
  }

  function handleEdit(id, title) {
    setEditInfo({id, title})
  }

  function updateTitle() {
    dispatch({type: 'edit', payload: {id: editInfo.id, title: editInfo.title}})
    setEditInfo({ id: null, title: ''})
  }

  function handleAllSubmit() {
    setSelectedIngredients(inventory)
  }
  function handleSubmit() {
    const selectedIngredients = inventory.filter((ingredient) => ingredient.isChecked);
    console.log(selectedIngredients);
    setSelectedIngredients(selectedIngredients)
  }

  return (
    <>
      <div className='addItem'>
        <form onSubmit={handleAdd}>
            <input type="text" onChange={handleChange} value={newItem}/>
            <button type='submit'>Add</button>
        </form>
      </div>
      <ul>
        {inventory.map((ingredient) => (
        <li key={ingredient.id}  className='list'> 
            <label className="ingredientList">
              <input 
                type="checkbox" 
                checked={ingredient.isChecked || false}
                onChange={()=>{
                  ingredient.isChecked = !ingredient.isChecked;
                  setIsChecked(!isChecked)
                }}/>
              {editInfo === ingredient.id ? (
                <>
                  <input
                    type="text"
                    value={editInfo.title}
                    onChange={(e) => updateEdit(e)}
                  />
                  <button onClick={updateTitle}>Save</button>
                </>
              ) : (
                <>
                  <div>{ingredient.title}</div>
                  <button onClick={() => handleEdit(ingredient.id, ingredient.title)}>Edit</button>
                  <button onClick={() => removeItem(ingredient.id)}>
                    Delete
                  </button>
                </>
              )}
            </label>
        </li>
      ))}
      </ul>
      <Link to='/recipe' >
        <button onClick={handleAllSubmit}>Select All and explore Recipe</button>
        <button onClick={handleSubmit}>Get Recipes with Selected List</button>
      </Link>
    </>
  )
}

export default Inventory