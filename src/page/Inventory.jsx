import React, { useState, useReducer, useRef } from 'react'

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
  const [ingredients, dispatch] = useReducer(reducer, []);
  const [newItem, setNewItem] = useState('');
  const [editTitle, setEditTitle] = useState('')
  const [editId, setEditId] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  function handleChange(e) {
    setNewItem(e.target.value)
  }
  function handleAdd(e) {
    e.preventDefault()
    addItem(newItem)
    setNewItem('')
  }

  function addItem(value) {
    const newItem = {
      id: ingredients.length + 1,
      title: value, 
      // date: new Date(),
    }
    dispatch({type: 'add', payload: newItem})
  }

  function removeItem(id) {
    dispatch({type: 'delete', payload: {id}})
  }

  function updateItem(id, title) {
    dispatch({type: 'edit', payload: {id, title}})
  }

  const checkRef=useRef()
  function handleCheck(e) {
    const isChecked = e.target.checked
    console.log(isChecked);

  }



  function handleEdit(id) {
    setEditId(id)
  }

  function updateEdit(e) {
    setEditTitle(e.target.value)
    // console.log(e.target.value);
  }

  function updateTitle(id) {
    // console.log(editTitle);
    updateItem(id, editTitle)
    setEditId(null)
  }

function handleSubmit() {
  
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
        {ingredients.map((ingredient) => (
        <li key={ingredient.id}>
            <label className="ingredientList">
              <input type="checkbox" onChange={handleCheck}/>
              {editId === ingredient.id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={updateEdit}
                  />
                  <button onClick={() => updateTitle(ingredient.id)}>Save</button>
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
      <button onClick={handleSubmit}>Get Recipes!</button>
    </>
  )
}

export default Inventory