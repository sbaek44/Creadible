import React, { useState, useEffect } from 'react'
import axios from 'axios'
import token from '../../../config.js'
import Ingredients from './Ingredients.jsx'

function App() {
  const [recipeOfTheDay, updateRecipeOfTheDay] = useState([])

  useEffect(() => {
    const storedRecipe = localStorage.getItem('recipeOfTheDay')
    // storedRecipe ? updateRecipeOfTheDay(JSON.parse(storedRecipe)) : getRecipeOfTheDay()
    storedRecipe ? updateRecipeOfTheDay(JSON.parse(storedRecipe)) : null
  }, [])

  useEffect(() => {
    if (recipeOfTheDay.length > 0) {
      let hours = 24
      let now = new Date().getTime()
      let setupTime = localStorage.getItem('setupTime')
      if (setupTime === null) {
        localStorage.setItem('setupTime', now)
        localStorage.setItem('recipeOfTheDay', JSON.stringify(recipeOfTheDay))
      } else {
        if (now-setupTime > hours*60*60*1000) {
          localStorage.clear()
          localStorage.setItem('setupTime', now)
        }
      }
    }
  }, [recipeOfTheDay])

  const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
    headers: {
      'x-rapidapi-key': token,
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  }

  const getRecipeOfTheDay = () => {
    axios.request(options)
    .then((results) => (updateRecipeOfTheDay(results.data.recipes)))
    .catch((err) => (console.log(err)))
  }

  if (recipeOfTheDay.length === 0) {
    return (
      <h1>Welcome To Creadible!</h1>
    )
  } else {
    return (
      <div>
        <h1>Welcome To Creadible</h1>
        <h3>Creating edible yummy dishes with the ingredients you already have!</h3>
        <h4>Recipe Of The Day: <br />
        {recipeOfTheDay[0].title}</h4>
        <div id="recipe">
          <img src={recipeOfTheDay[0].image}/>
          <h5>Time: {recipeOfTheDay[0].readyInMinutes} minutes</h5>
          <h5>Servings: {recipeOfTheDay[0].servings}</h5>
          <h5>Ingredients</h5>
          <ul>
            {recipeOfTheDay[0].extendedIngredients.map((item, i) => (
              <li key={i}>{item.originalString}</li>
            ))}
          </ul>
          <h5>Directions</h5>
          <ul>
            {recipeOfTheDay[0].analyzedInstructions[0].steps.map((step, i) => (
              <li key={i}>Step {step.number}: {step.step}
              </li>
            ))}
          </ul>
        </div>
        <Ingredients />
      </div>
    )
  }
}

export default App