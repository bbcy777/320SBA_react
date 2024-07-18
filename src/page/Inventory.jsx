import React, { useState, useReducer, useRef } from 'react'

function reducer(state, action) {
  switch(action.type) {
    case 'set':
      return action.payload
    case('edit'): 
      return state.map(ingredient => ingredient.id === action.id? {...ingredients, title: action.payload.title, completed: action.payload.completed} : ingredients)
    case('delete'):
      return state.filter(ingredient => ingredient.id !== action.payload.id)
    case('add'):
      return [action.payload, ...state]
    default:
      return state
  }
}
const Inventory = () => {
  const [ingredients, setIngredients] = useReducer(reducer, []);
  const [newItem, setNewItem] = useState('');
  const [isDisabled, setIsDisable] = useState (true)
  
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
      date: new Date(),
    }
    dispatch({type: 'add', payload: newItem})
  }

  function removeItem(id) {
    dispatch({type: 'delete', payload: {id}})
  }

  function updateItem(id, value, completed) {
    dispatch({type: 'edit', payload: {id, value, completed}})
  }

  const checkRef=useRef()
  function handleCheck(e) {
    const isChecked = e.target.checked
    console.log(isChecked);
    setCheck(isChecked)
    //update the todo item in the parent component
    updateItem(list.id, editTitle, isChecked)
    // display or show delete button according to completed status
    setIsDisable(!isChecked)
    console.log(list);
  }

  const titleRef = useRef()
  // console.log(titleRef)

  const deleteRef = useRef()
  const todoRef = useRef()
  const [saveButton, setSaveButton] = useState(false)

  function handleEdit(e) {
    titleRef.current.style.display = "none"
    deleteRef.current.style.display = "none"
    todoRef.current.style.display = "none"
    setSaveButton(true)
  }

  function updateEdit(e) {
    setEditTitle(e.target.value)
    // console.log(e.target.value);
  }

  function updateTitle() {
    // console.log(editTitle);
    updateItem(list.id, editTitle, check)
    titleRef.current.style.display = "block"
    deleteRef.current.style.display = "block"
    todoRef.current.style.display = "block"
    setSaveButton(false)
  }


  return (
    <div>
      <div className='addItem'>
        <form action="">
            <input type="text" onChange={handleChange} value={newItem}/>
            <button onClick={handleAdd}>Add</button>
        </form>
      </div>
      <ul>
        <li>
          <input type="checkbox" />
          <input type="text" placeholder='item name' value={newItem.name}/>
          <button onClick={handleAdd}>Add Item</button>
          <label className='todoList'>
          {/* <input ref={checkRef}type="checkbox" onChange={handleCheck} checked={check}/> */}
          <div ref={todoRef}>{ingredients}</div>
          <button ref={titleRef} onClick={handleEdit}>Edit</button>
          <button ref={deleteRef} disabled={isDisabled} onClick={()=>removeItem(list.id)}>Delete</button>
          {saveButton && (
            <>
              <input type='text' placeholder={list.title} onChange={updateEdit}/>
              <button onClick={updateTitle}>Save</button> 
            </>
          )}
        </label> 
        </li>

      </ul>
    </div>
  )
}

export default Inventory