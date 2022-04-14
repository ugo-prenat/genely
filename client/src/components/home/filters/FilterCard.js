import React from 'react'

export default function FilterCard(props) {
  const filter = props.filter
  
  return (
    <span
      onClick={() => props.reloadList(filter.name.toLowerCase())}
      className='filter'
    >
      { filter.name }
    </span>
  )
}