import React, { useState, useEffect } from 'react'
import axios from 'axios'
import token from '../../../config.js'

function WinePairing(props) {
  const [winePairing, updateWinePairing] = useState([])



  return (
    <div>
      <h4 id="winePairingTitle">Wine Pairing</h4>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div>
          <h4 id="winePairingProtein">Steak</h4>
          <br />
          <img id="winePairingImg" src={"https://spoonacular.com/recipeImages/196451-556x370.jpg"} />
        </div>
        <div>
        <h4 id="winePairingProtein">Seafood</h4>
        <br/>
        <img id="winePairingImg" src={'https://spoonacular.com/recipeImages/975515-556x370.jpg'} />
        </div>
        <div>
        <h4 id="winePairingProtein">Pasta</h4>
        <br/>
        <img id="winePairingImg" src={'https://spoonacular.com/recipeImages/1003936-556x370.jpg'} />
        </div>
        <div>
        <h4 id="winePairingProtein">Dessert</h4>
        <br />
        <img id="winePairingImg" src={'https://webknox.com/recipeImages/639057-556x370.jpg'} />
        </div>
      </div>
    </div>
  )
}

export default WinePairing