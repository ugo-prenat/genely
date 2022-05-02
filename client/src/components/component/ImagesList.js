import React from 'react'

export default function ImagesList(props) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  const illustrations = props.illustrations
  
  return (
    <div className='img-list'>
      { illustrations.map((img, index) => {
        return(
          <div className='img-container' key={index}>
            <img
              src={backendUrl + img.url} 
              alt={`illustration ${index+1}`}
              onClick={() => props.displayImg(img.url)}
              />
          </div>
        )
      }) }
    </div>
  )
}