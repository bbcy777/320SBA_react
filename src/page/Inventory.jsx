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

function handleSubmit() {
  const selectedIngredients = state.selectedIngredients;
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
        <li key={ingredient.id}>
            <label className="ingredientList">
              <input type="checkbox"/>
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
        <button onClick={handleSubmit}>Get Recipes!</button>
      </Link>
    </>
  )
}

export default Inventory