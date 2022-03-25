import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ComponentCard(props) {
  const navigate = useNavigate()
  
  const component = props.component
  const componentLink = `${component.creator.username}/${component.shortname}`
  
  return (
    <div className='component-card' onClick={() => navigate(componentLink)}>
      <p>{component.shortname}</p>
    </div>
  )
}