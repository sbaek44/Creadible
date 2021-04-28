import React, { useState, useEffect } from 'react'
import axios from 'axios'
import token from '../../../config.js'

function Ingredients({ addToCookbook }) {
  const [ingredients, updateIngredients] = useState([])
  const [recipes, updateRecipes] = useState([])
  const [selectedRecipeFromIngredients, updateSelectedRecipeFromIngredients] = useState([])

  useEffect(() => {
    console.log(selectedRecipeFromIngredients)
  }, [selectedRecipeFromIngredients])

  const handleChange = (e) => {
    updateIngredients(e.target.value)
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
    .then((results) => (updateSelectedRecipeFromIngredients([results.data])))
    .catch((err) => (console.log(err)))
  }

  if (recipes.length === 0) {
    return (
      <div>
        <h4 id="typeIn">Type in your ingredients below and see all the Creadible dishes you can make!</h4>
        <form onSubmit={submitIngredients}>
            <textarea onChange={handleChange} value={ingredients} type="text" name="ingredients" placeholder="chicken, lemon"></textarea>
          <button id="ingredientButton" type="submit">Get Recipes</button>
        </form>
      </div>
    )
  } else if (selectedRecipeFromIngredients.length > 0) {
    return (
      <div>
        <h3>{selectedRecipeFromIngredients[0].title}</h3>
        <img src={selectedRecipeFromIngredients[0].image} />
        <h4>Ready in {selectedRecipeFromIngredients[0].readyInMinutes} minutes</h4>
        <h4>Serves {selectedRecipeFromIngredients[0].servings}</h4>
        <h4>Ingredients</h4>
        <ul>
          {selectedRecipeFromIngredients[0].extendedIngredients.map((item, i) => (
            <li key={i}>{item.name}</li>
          ))}
        </ul>
        <h4>Directions</h4>
          {selectedRecipeFromIngredients[0].analyzedInstructions.length === 0 || selectedRecipeFromIngredients[0].analyzedInstructions === undefined ? <p>{selectedRecipeFromIngredients[0].summary}</p> : selectedRecipeFromIngredients[0].analyzedInstructions[0].steps.map((item, i) => (
            <p id="steps" key={i}>Step {item.number}: {item.step}</p>
          ))}
          <button onClick={() => (updateSelectedRecipeFromIngredients([]))}>Back</button>
          <button onClick={() => (addToCookbook(selectedRecipeFromIngredients[0].id))}>Add To My Cookbook</button>
      </div>
    )
  } else {
    return (
      <div>
        <h4 id="ingredients">Recipes using {ingredients}:</h4>
        <button onClick={backToIngredients}>Use Different Ingredients</button>
        {recipes.map((recipe, i) => (
          <div key={i}>
            <h4 id="ingredientRecipe" onClick={() => (onRecipeClick(recipe.id))}>{recipe.title}</h4>
            <img onClick={() => (onRecipeClick(recipe.id))} src={recipe.image} />
          </div>
        ))}
      </div>
    )
  }
}

export default Ingredients