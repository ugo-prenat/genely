import React from 'react'

export default function VisibilityRadioInput(props) {
  const title = props.data.title
  const description = props.data.description
  const icon = props.data.icon
  
  return (
    <div className='radio-input'>
      <p>{icon}</p>
      <div className='data'>
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </div>
  )
}