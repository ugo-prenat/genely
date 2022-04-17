import React from 'react'

export default function FilterCard(props) {
  const filter = props.filter
  
  return (
    <span
      onClick={() => props.reloadList(filter.name)}
      className='filter'
    >
      { filter.name }
    </span>
  )
}