import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'


import ComponentList from '../home/ComponentList';
import Filters from '../home/filters/FiltersContainer';

import '../../styles/home.scss'


export default function Home() {
  const [filters, setFilters] = useState([])
  const [searchInput, setSearchInput] = useState('')
  
  const navigate = useNavigate()
  const reloadList = useRef(null)
  
  useEffect(() => {
    // Setup tab title
    document.title = 'Genely'
  }, [])
  
  // Reload the components list each time the 'filters' or 'searchInput' variables changes
  useEffect(() => reloadList.current(filters, searchInput), [filters, searchInput])
  
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
  
  /* const newfilters = () => {
    // Reload the components list after selected filters
    // Update url
    if (filters.length !== 0) navigate(`?filters=${ filters.map(filter => `${filter}`) }`)
    else navigate('')
    
    reloadList.current(filters)
  } */
  
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
