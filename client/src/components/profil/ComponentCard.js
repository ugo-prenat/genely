import React from 'react'

import Globe from '../../assets/svg/Globe'
import Lock from '../../assets/svg/Lock'


export default function ComponentCard(props) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  const component = props.component
  const listType = props.listType
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
        
      {
        listType === 'personal' ?
          <Visibility isPublic={component.isPublic} url={component.url} />
        :
          <Creator creator={component.creator} />
      }
    </div>
  )
}

export function Visibility(props) {
  const isPublic = props.isPublic
  const url = props.url
  
  return <div className='visibility'>
    <a href={url}>
      { 
        isPublic ?
          <span><Globe /> Public</span>
        :
          <span><Lock /> Privé</span>
      }
    </a>
  </div>
}

export function Creator(props) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  const creator = props.creator
  
  return <div className='creator'>
    <a href={creator.username}>
      <img src={/* backendUrl + */ creator.avatarUrl} alt={`${creator.username}-avatar`} />
      <div className='creator-names'>
        <p className='fullname'>{creator.fullname}</p>
      </div>
    </a>
  </div>  
}