import React from 'react'

export default function MainImage(props) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  const src = backendUrl + props.displayImg
  
  return (
    <div className='main-img-container'>
      <a href={src} target='_blank' rel="noreferrer">
        <img src={src} alt='component illustration' />
      </a>
    </div>
  )
}