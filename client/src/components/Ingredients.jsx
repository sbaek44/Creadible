import React, { useState, useEffect } from 'react'
import axios from 'axios'
import token from '../../../config.js'

function Ingredients(props) {
  const [ingredients, updateIngredients] = useState([])
  const [recipes, updateRecipes] = useState([])
  const [selectedRecipe, updateSelectedRecipe] = useState([])

  const handleChange = (e) => {
    updateIngredients(e.target.value)
  }

  const backToRecipes = () => {
    updateSelectedRecipe([])
  }
  const backToIngredients = () => {
    updateRecipes([])
  }

  const submitIngredients = (e) => {
    e.preventDefault()
    axios.request({
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
      params: {
        ingredients: ingredients,
        number: 20,
        ranking: 1,
        ignorePantry: true
      },
      headers: {
        'x-rapidapi-key': token,
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    })
    .then((results) => (updateRecipes(results.data)))
    .catch((err) => (console.log(err)))
  }

  const onRecipeClick = (id) => {
    axios.request({
      method: 'GET',
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
      headers: {
        'x-rapidapi-key': token,
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    })
    .then((results) => (updateSelectedRecipe(results.data)))
    .catch((err) => (console.log(err)))
  }

  if (recipes.length === 0) {
    return (
      <div>
        <h5>Type in your ingredients below and see all the Creadible dishes you can make!</h5>
        <form onSubmit={submitIngredients}>
          <label>
            Ingredients on hand: <br />
            <textarea onChange={handleChange} value={ingredients} type="text" name="ingredients" placeholder="chicken, lemon"></textarea>
          </label>
          <button type="submit">Get Recipes</button>
        </form>
      </div>
    )
  } else if (selectedRecipe.id) {
    return (
      <div>
        <h3>{selectedRecipe.title}</h3>
        <img src={selectedRecipe.image} />
        <h4>Ready in {selectedRecipe.readyInMinutes} minutes</h4>
        <h4>Serves {selectedRecipe.servings}</h4>
        <h4>Ingredients</h4>
        <ul>
          {selectedRecipe.extendedIngredients.map((item, i) => (
            <li key={i}>{item.name}</li>
          ))}
        </ul>
        <h4>Directions</h4>
          {selectedRecipe.analyzedInstructions.length === 0 || selectedRecipe.analyzedInstructions === undefined ? <p>{selectedRecipe.summary}</p> : selectedRecipe.analyzedInstructions[0].steps.map((item, i) => (
            <p id="steps" key={i}>Step {item.number}: {item.step}</p>
          ))}
          <button onClick={backToRecipes}>Back To Recipes List</button>
      </div>
    )
  } else {
    return (
      <div>
        <h4>Recipes using {ingredients}:</h4>
        {recipes.map((recipe, i) => (
          <div key={i}>
            <h4 onClick={() => (onRecipeClick(recipe.id))}>{recipe.title}</h4>
            <img onClick={() => (onRecipeClick(recipe.id))} src={recipe.image} />
          </div>
        ))}
        <button onClick={backToIngredients}>Use Different Ingredients</button>
      </div>
    )
  }
}

export default Ingredients