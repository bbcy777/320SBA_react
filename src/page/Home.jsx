import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div className='welcome'>
        <h2>Welcome to Repurpose Kitchen!</h2>
        <p>This is your kitchen manager that </p>
      </div>
      <div className='inventoryHome'>
        <p>Track your kitchen inventory and get recipe suggestions to reduce waste</p>
        <Link to='/inventory' >
          <button>Go to Your Kitchen</button>
        </Link>
      </div>
    </>
  )
}

export default Home