import React, { useState } from 'react'

export default function FilterCard(props) {
  const [isSelected, setIsSelected] = useState(props.isSelected)
  const filter = props.filter
  
  const selectFilter = () => {
    // Toggle the selection of the filter
    setIsSelected(!isSelected)
    
    // Relaod the components list with the new filter
    isSelected ?
      // Delete from filter list
      props.removeFromFilters(filter.name)
    :
      // Add to the filter list
      props.addToFilters(filter.name)
  }
  
  
  return (
    <span
      onClick={selectFilter}
      className={`filter ${isSelected ? 'selected' : ''}`}
    >
      { filter.name }
    </span>
  )
}