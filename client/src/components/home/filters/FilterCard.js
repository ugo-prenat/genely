import React, { useState, useEffect } from 'react'

export default function FilterCard(props) {
  const [isSelected, setIsSelected] = useState()
  const filter = props.filter
  const selectedFilters = props.selectedFilters
  
  useEffect(() => setIsSelected(isFilterSelected()), [selectedFilters])
  
  
  const isFilterSelected = () => {
    // Check if the filter given is selected
    if (selectedFilters.filter(item => item === filter.name).length > 0) {
      return true
    }
    return false
  }
  
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