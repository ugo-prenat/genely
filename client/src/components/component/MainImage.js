import React from 'react'

export default function MainImage(props) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  const src = props.src.url
  
  return (
    <div className='main-img-container'>
      <img src={backendUrl + src} alt='component illustration' />
    </div>
  )
}