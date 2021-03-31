import React, { useState, useEffect } from 'react'
import axios from 'axios'
import token from '../../../config.js'

function Ingredients(props) {
  const [ingredients, updateIngredients] = useState([])
  const [recipes, updateRecipes] = useState([])

  useEffect(() => {
    // getRecipes()
    console.log('ingredients', ingredients)
  }, [ingredients])

  const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
    params: {
      ingredients: ingredients,
      number: 10,
      ranking: 1,
      ignorePantry: true
    },
    headers: {
      'x-rapidapi-key': token,
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  }

  const handleChange = (e) => {
    let input = [e.target.value]
    updateIngredients(input.join(','))
  }

  const submitIngredients = (e) => {
    e.preventDefault()
    axios.request(options)
    .then((results) => (updateRecipes(results.data)))
    .then(() => ('recipes', console.log(recipes)))
    .catch((err) => (console.log(err)))
  }

  if (recipes.length === 0) {
    return (
      <div>
        <h2>What's For Dinner Tonight?</h2>
        <h4>Type in your ingredients below and see all the Creadible dishes you can make!</h4>
        <form onSubmit={submitIngredients}>
          <label>
            Ingredients on hand: <br />
            <textarea onChange={handleChange} value={ingredients} type="text" name="ingredients"></textarea>
          </label>
          <button type="submit">Get Recipes</button>
        </form>

      </div>
    )
  } else {
    return (
      <div>
        <h2>What's For Dinner Tonight?</h2>
        <h4>Recipes using {ingredients}:</h4>
      </div>
    )
  }
}

export default Ingredients