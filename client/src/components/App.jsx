import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Ingredients from './Ingredients.jsx'
import FeaturedDishes from './FeaturedDishes.jsx'
import WinePairing from './WinePairing.jsx'
import Cookbook from './Cookbook.jsx'

function App() {
  const [selectedRecipe, updateSelectedRecipe] = useState([])
  const [cookbookIds, updateCookbookIds] = useState([])

  useEffect(() => {
    console.log(selectedRecipe)
  }, [selectedRecipe])

  const addToCookbook = (id) => {
    const exists = cookbookIds.find((ids) => (ids === id))
    exists ? null : updateCookbookIds([...cookbookIds, id])
    alert('This recipe has been added to your Cookbook!')
  }

  if (selectedRecipe.length > 0) {
    return (
      <div>
        <div id="banner">
          <h1 id="banner-title">CREADIBLE</h1>
          <h3 id="slogan">creating edible yummy dishes with the ingredients you already have</h3>
          <hr />
        </div>
        <h3>{selectedRecipe[0].title}</h3>
        <img src={selectedRecipe[0].image} />
        <h4>Ready in {selectedRecipe[0].readyInMinutes} minutes</h4>
        <h4>Serves {selectedRecipe[0].servings}</h4>
        <h4>Ingredients</h4>
        <ul>
          {selectedRecipe[0].extendedIngredients.map((item, i) => (
            <li key={i}>{item.name}</li>
          ))}
        </ul>
        <h4>Directions</h4>
          {selectedRecipe[0].analyzedInstructions.length === 0 || selectedRecipe[0].analyzedInstructions === undefined ? <p>{selectedRecipe[0].summary}</p> : selectedRecipe[0].analyzedInstructions[0].steps.map((item, i) => (
            <p id="steps" key={i}>Step {item.number}: {item.step}</p>
          ))}
          <button onClick={() => (updateSelectedRecipe([]))}>Back</button>
          <button onClick={() => (addToCookbook(selectedRecipe[0].id))}>Add To My Cookbook</button>
      </div>
    )
} else {
    return (
      <div>
        <div id="banner">
          <h1 id="banner-title">CREADIBLE</h1>
          <h3 id="slogan">creating edible yummy dishes with the ingredients you already have</h3>
          <hr />
        </div>
          <Ingredients addToCookbook={addToCookbook} />
          <Cookbook cookbookIds={cookbookIds} updateCookbookIds={updateCookbookIds} />
          <FeaturedDishes updateSelectedRecipe={updateSelectedRecipe} />
          <WinePairing />
      </div>
    )
  }
}

export default App