import React from 'react'

export default function FiltersList(props) {
  const filters = props.filters
  
  return (
    <div className='filters'>
      { filters.map((filter, index) => 
        <a
          href={`/?filters=${filter.name.toLowerCase()}`}
          className='filter'
          alt={filter.name}
          key={index}>
            {filter.name}
          </a>
      )}
    </div>
  )
}