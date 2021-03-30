import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Ingredients(props) {
  const [ingredients, updateIngredients] = useState([])

  // useEffect(() => {
  //   getRecipes()
  // }, [ingredients])

  // const getRecipes = () => {
  //   axios.get()
  // }

  // const handleChange = (e) => {
  //   updateIngredients(value:)
  // }

  return (
    <div>
      <form>
        <label>
          Ingredients on hand: <br />
          <textarea type="text" name="ingredients"/>
        </label>
      </form>
    </div>
  )
}

export default Ingredients