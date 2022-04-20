import React, { useState, useEffect } from 'react'
import FilterCard from './FilterCard'

import Cross from '../../../assets/svg/Cross'


export default function FiltersList(props) {
  const filters = props.filters
  const selectedFilters = props.selectedFilters
  
  const [filteredList, setFilteredList] = useState(filters)
  const [searchValue, setSearchValue] = useState('')
  
  
  useEffect(() => {
    setFilteredList(() => 
      filters.filter(filter => filter.name.toLowerCase().includes(searchValue.toLowerCase()))
    )
  }, [searchValue])
  
  const isFilterSelected = (filter, selectedFilters) => {
    // Check if the filter given is selected
    if (selectedFilters.filter(item => item === filter.name).length > 0) {
      return true
    }
    return false
  }
  
  
  return (
    <div>
      <span className='filters-list-background' onClick={() => props.hideFilterList()}></span>
      
      <div className='filter-list'>
        <div className='input-container'>
          <input
            placeholder='Rechercher...'
            autoFocus
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
          { searchValue.length > 0 && <span onClick={() => setSearchValue('')}><Cross /></span> }
        </div>
        
        <div className='filter-option'>
          { 
            filteredList.length > 0 ?
              filteredList.map((filter, index) =>
                <FilterCard
                  filter={filter}
                  addToFilters={filter => props.addToFilters(filter)}
                  removeFromFilters={filter => props.removeFromFilters(filter)}
                  isSelected={isFilterSelected(filter, selectedFilters)}
                  
                  key={index}
                />
              )
            :
              <span className='empty-result'>Aucun résultat trouvé</span>
          }
        </div>
        
        <div className='bottom-btns'>
          <span onClick={() => props.clearFilters()} className='clear-btn'>Réinitialiser</span>
          <span onClick={() => props.hideFilterList()}>Confirmer</span>
        </div>
      </div>
    </div>
  )
}