import React from 'react'

export default function FilterCard(props) {
  const filter = props.filter
  
  return (
    <span className='card'>
      { filter.name }
    </span>
  )
}