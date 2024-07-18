import React, { useState } from 'react'

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  return (
    <div>
      <ul>
        <li>
          <input type="checkbox" />
          <input type="text" placeholder='item name' value={newItem.name}/>
          <button onClick={handleAdd}>Add Item</button>
          <button onClick={handleDelete}>Delete Item</button>
        </li>

      </ul>
    </div>
  )
}

export default Inventory