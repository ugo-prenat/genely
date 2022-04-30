import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function FilterCard(props) {
  const [isSelected, setIsSelected] = useState()
  const filter = props.filter
  const selectedFilters = props.selectedFilters
  const navigate = useNavigate()
  
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
    if (isSelected) {
      // Delete from filter list and url params
      props.removeFromFilters(filter.name)
      //removeUrlParam()
    }
    else {
      // Add to the filter list
      props.addToFilters(filter.name)
      //addUrlParam()
    }
  }
  
  const removeUrlParam = () => {
    const urlParams = new URLSearchParams(window.location.search)
    let filters = urlParams.get('filters').split(',')
    let search = urlParams.get('search')
    
    filters = filters.filter(item => item !== filter.lowercase)
    navigate(`?filters=${filters}${search ? `&search=${search}` : ''}`)
  }
  const addUrlParam = () => {
    const urlParams = new URLSearchParams(window.location.search)
    let filters = urlParams.get('filters')
    let search = urlParams.get('search')
    
    filters = filters ? filters += `,${filter.lowercase}` : filter.lowercase
    navigate(`?filters=${filters}${search ? `&search=${search}` : ''}`)
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