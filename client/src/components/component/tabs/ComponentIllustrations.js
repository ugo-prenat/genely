import React from 'react'

export default function ComponentIllustrations(props) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  const illustrations = props.urls
  
  return (
    <div className='component-illustrations tab'>
      { illustrations.map((img, index) => {
        return(<img src={backendUrl + img.url} alt={`component illustration ${index+1}`} key={index} />)
      }) }
    </div>
  )
}