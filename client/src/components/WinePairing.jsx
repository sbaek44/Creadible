import React, { useState, useEffect } from 'react'
import axios from 'axios'
import token from '../../../config.js'

function WinePairing(props) {
  const [winePairing, updateWinePairing] = useState([])



  return (
    <div>
      <h4 id="winePairingTitle">Wine Pairing</h4>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <h4 id="winePairingProtein">Burgers</h4><br/>
        <img id="winePairingImg" src={'https://www.thereciperebel.com/wp-content/uploads/2016/05/best-burgers-www.thereciperebel.com-600-11-of-16-500x500.jpg'} />
        <h4 id="winePairingProtein">Seafood</h4><br/>
        <img src={''} />
      </div>
    </div>
  )
}

export default WinePairing