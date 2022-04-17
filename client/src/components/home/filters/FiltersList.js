import React from 'react'
import FilterCard from './FilterCard'


export default function FiltersList(props) {
  const filters = props.filters
  
  return (
    <div className='filter-list'>
      <input placeholder='Rechercher...' autoFocus />
      
      <div className='filter-option'>
        { filters.map((filter, index) => 
          <FilterCard
            filter={filter}
            reloadList={filter => props.reloadList(filter)}
            key={index}
          />)
        }
      </div>
      
      <div className='bottom-btns'>
        <span onClick={() => props.clearFilters()} className='clear-btn'>Réinitialiser</span>
        <span>Confirmer</span>
      </div>
    </div>
  )
}