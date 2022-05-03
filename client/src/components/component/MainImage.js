import React, { useState } from 'react'

export default function MainImage(props) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  const [src, setSrc] = useState(props.firstImg)
  
  props.displayImg.current = url => setSrc(url)
  
  
  return (
    <div className='main-img-container'>
      <a href={backendUrl + src} target='_blank' rel="noreferrer">
        <img src={backendUrl + src} alt='component illustration' />
      </a>
    </div>
  )
}