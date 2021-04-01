import React, { useState, useEffect } from 'react'
import axios from 'axios'
import token from '../../../config.js'
import Ingredients from './Ingredients.jsx'
import FeaturedDishes from './FeaturedDishes.jsx'
import WinePairing from './WinePairing.jsx'

function App() {

  return (
    <div>
      <h1>Creadible</h1>
      <h3>Creating edible yummy dishes with the ingredients you already have!</h3>
      <Ingredients />
      <FeaturedDishes />
      <WinePairing />
    </div>
  )
}

export default App