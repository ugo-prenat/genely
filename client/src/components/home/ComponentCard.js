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
          <img src={/* backendUrl + */ creator.avatarUrl} alt={`${creator.username}-avatar`} />
          <div className='creator-names'>
            <p className='fullname'>{creator.fullname}</p>
          </div>
        </a>
      </div>
    </div>
  )
}