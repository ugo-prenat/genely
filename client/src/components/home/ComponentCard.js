import React from 'react'


export default function ComponentCard(props) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  
  const component = props.component
  const creator = component.creator
  const illustration = component.illustrations[0].url
  
  
  return (
    <div className='component-card'>
      <a href={component.url}>
        
        <div className='illustration-container'>
          <img src={backendUrl + illustration} alt='component illustration' />
        </div>
        
        <div className='names'>
          <p className='fullname'>{component.fullname}</p>
          <p className='shortname'>{component.shortname}</p>
        </div>
        
      </a>

      <div className='creator'>
        <a href={creator.username}>
          <div className='profile-picture'>
            <img src={getImgUrl(creator.avatarUrl)} alt={`${creator.username}-avatar`} />
          </div>
          <div className='creator-names'>
            <p className='fullname'>{creator.fullname}</p>
          </div>
        </a>
      </div>
    </div>
  )
}
function getImgUrl(url) {
  // Check if the given image's url is hosted by Genely or not
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return backendUrl + url
}