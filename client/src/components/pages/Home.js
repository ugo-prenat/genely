import React, { useEffect, useState, useRef } from 'react';

import ComponentList from '../home/ComponentList';
import Filters from '../home/filters/FiltersContainer';

import '../../styles/home.scss'


export default function Home() {
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [filters, setFilters] = useState([])
  const [searchInput, setSearchInput] = useState('')
  
  const reloadList = useRef(null)
  
  useEffect(() => {
    // Setup tab title
    document.title = 'Genely'
  }, [])
  
  
  // Reload the components list each time the 'filters' or 'searchInput' variables changes
  useEffect(() => {
    if (!isFirstRender) reloadList.current(filters, searchInput)
    setIsFirstRender(false)
  }, [filters, searchInput])
  
  const addFilter = filter => {
    // Add the filter to the filters list and reload the components list
    setFilters(filters => [...filters, filter])
    // Trigger the reload of the components list with the useEffect
  }
  const removeFilter = filter => {
    // Remove the filter from the filters list and reload the components list
    setFilters(filters => filters.filter(item => item !== filter))
    // Trigger the reload of the components list with the useEffect
  }
  const clearFilters = toDeleteFilters => {
    // Clear the selected filters list and reload the components list
    setFilters(filters => filters.filter(filter => !toDeleteFilters.includes(filter)))
  }
  
  const searchFilter = searchInput => {
    setSearchInput(searchInput)
  }
  
  
  return (
    <div className='main-component home-component'>
      <Filters
        addFilter={filter => addFilter(filter)}
        removeFilter={filter => removeFilter(filter)}
        clearFilters={filters => clearFilters(filters)}
        
        searchFilter={searchInput => searchFilter(searchInput)}
      />
      <ComponentList reloadList={reloadList} />
    </div>
  )
}
