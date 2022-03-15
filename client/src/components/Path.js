import React from 'react'
import { Link } from 'react-router-dom'

export default function Path(props) {
  const elements = props.path
  
  return (
    <div className='path'>
      { elements.map((element, index) => {
        return(
          <div key={index}>
            <Link to={element.link}>{element.name}</Link>
            { index < elements.length - 1 && <span>/</span> }
          </div>
        )
      }) }
    </div>
  )
}