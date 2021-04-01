import React, { useState, useEffect } from 'react'
import axios from 'axios'
import token from '../../../config.js'

function FeaturedDishes(props) {
  const [featuredRecipes, updateFeaturedRecipes] = useState([])

  useEffect(() => {
    const storedRecipes = localStorage.getItem('featuredRecipes')
    storedRecipes ? updateFeaturedRecipes(JSON.parse(storedRecipes)) : getFeaturedRecipes()
  }, [])

  useEffect(() => {
    if (featuredRecipes.length > 0) {
      let hours = 24
      let now = new Date().getTime()
      let setupTime = localStorage.getItem('setupTime')
      if (setupTime === null) {
        localStorage.setItem('setupTime', now)
        localStorage.setItem('featuredRecipes', JSON.stringify(featuredRecipes))
      } else {
        if (now-setupTime > hours*60*60*1000) {
          localStorage.clear()
          localStorage.setItem('setupTime', now)
        }
      }
    }
  }, [featuredRecipes])

  const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
    params: {number: 4},
    headers: {
      'x-rapidapi-key': token,
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  }

  const getFeaturedRecipes = () => {
    axios.request(options)
    .then((results) => (updateFeaturedRecipes(results.data.recipes)))
    .catch((err) => (console.log(err)))
  }
  if (featuredRecipes.length === 0) {
    return (
      <h4>Featured Recipes</h4>
    )
  } else {
    return (
      <div>
      {console.log(featuredRecipes)}
        <h4>Featured Recipes</h4>
        <div id="featuredRecipes" style={{display: 'flex', flexDirection: 'row'}}>
          {featuredRecipes.map((recipe, i) => (
            <div key={i}>{recipe.title} <br/>
            <img src={recipe.image} /></div>
          ))}
        </div>
      </div>
    )
  }
}

export default FeaturedDishes