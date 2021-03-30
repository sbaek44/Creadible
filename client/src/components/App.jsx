import React, { useState, useEffect } from 'react'
import axios from 'axios'
import headers from '../../../config.js'
import Ingredients from './Ingredients.jsx'

function App() {
  const [recipeOfTheDay, updateRecipeOfTheDay] = useState([])

  useEffect(() => {
    getRecipeOfTheDay()
  }, [recipeOfTheDay])

  const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
    headers: headers
  }

  const getRecipeOfTheDay = () => {
    axios.get(options)
    .then((results) => (updateRecipeOfTheDay(results.recipes)))
    .catch((err) => (console.log(err)))
  }

  return (
    <div>
      <h1>Creadible!</h1>
      <h3>Recipe Of The Day</h3>
      <Ingredients />
    </div>
  )
}

export default App