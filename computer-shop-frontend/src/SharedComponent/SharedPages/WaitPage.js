import React from 'react'
import PacmanLoader from "react-spinners/PacmanLoader";
import "./WaitPage.css"

function WaitPage() {
  return (
    <div className='waitPage__wrapper'>
      <PacmanLoader color= 'gray'/>
    </div>

  )
}

export default WaitPage