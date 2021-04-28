import React, { useState, useEffect } from 'react'
import axios from 'axios'
import token from '../../../config.js'

function Cookbook({ cookbookIds, updateCookbookIds }) {
  const [myCookbook, updateMyCookbook] = useState('')
  const [selected, updateSelected] = useState([])

  useEffect(() => {
    console.log(cookbookIds)
    if (cookbookIds.length > 0) {
      cookbookIds.map((id) => {
        axios.request({
          method: 'GET',
          url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
          headers: {
            'x-rapidapi-key': token,
            'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
          }
        })
        .then(results => myCookbook => (updateMyCookbook([results.data, ...myCookbook])))
        .catch((err) => (console.log(err)))
      })
    }
  }, [cookbookIds])

  useEffect(() => {
    const storedCookbook = localStorage.getItem('myCookbook')
    storedCookbook ? updateMyCookbook(JSON.parse(storedCookbook)) : null
  }, [])

  useEffect(() => {
    localStorage.setItem('myCookbook', JSON.stringify(myCookbook))
  }, [myCookbook])

  const myCookbookClick = (id) => {
    let newSelected = myCookbook.filter(recipe => (recipe.id === id))
    updateSelected(newSelected)
  }

  const removeFromCookbook = (id) => {
    let filteredIds = cookbookIds.filter((ids) => (ids !== id))
    let filteredCookbook = myCookbook.filter((recipe) => (recipe.id !== id))
    updateCookbookIds(filteredIds)
    updateMyCookbook(filteredCookbook)
  }

  if (myCookbook.length === 0) {
    return (
      <div>
        <h4 id="cookbookTitle">My Cookbook</h4>
        <p>Start adding recipes to your cookbook by clicking on the "Add To My Cookbook" buttons at the bottom of our recipes!</p>
      </div>
    )
  } else if (selected.length > 0) {
    return (
      <div>
        <h3>{selected[0].title}</h3>
        <img src={selected[0].image} />
        <h4>Ready in {selected[0].readyInMinutes} minutes</h4>
        <h4>Serves {selected[0].servings}</h4>
        <h4>Ingredients</h4>
        <ul>
          {selected[0].extendedIngredients.map((item, i) => (
            <li key={i}>{item.name}</li>
          ))}
        </ul>
        <h4>Directions</h4>
          {selected[0].analyzedInstructions.length === 0 || selected[0].analyzedInstructions === undefined ? <p>{selected[0].summary}</p> : selected[0].analyzedInstructions[0].steps.map((item, i) => (
            <p id="steps" key={i}>Step {item.number}: {item.step}</p>
          ))}
          <button onClick={() => (updateSelected([]))}>Back</button>
          <button onClick={() => (removeFromCookbook(selected[0].id))}>Remove From My Cookbook</button>
      </div>
    )
  } else {
    return (
      <div>
        <h4 id="cookbookTitle">My Cookbook</h4>
        <div id="myCookbook" style={{display: 'flex', flexDirection: 'row'}}>
          {myCookbook.map((recipe, i) => (
            <div onClick={() => (myCookbookClick(recipe.id))} key={i}>
              <h4 id="myCookbookDish">{recipe.title}</h4>
              <br/>
              <img id="myCookbookImg" src={recipe.image} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Cookbook