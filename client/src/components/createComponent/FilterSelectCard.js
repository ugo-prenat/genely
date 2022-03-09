import React from 'react'

export default function FilterSelectCard(props) {
  const filter = props.filter
  
  return (
    <p
      className='filter'
      type={filter.type}
      onClick={() => {
        props.focus()
        props.addFilter(filter)
      }}
    >
      { filter.name }
    </p>
  )
}