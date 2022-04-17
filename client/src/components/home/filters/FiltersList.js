import React from 'react'
import FilterCard from './FilterCard'


export default function FiltersList(props) {
  const filters = props.filters
  
  return (
    <div className='filter-list'>
      <input placeholder='Rechercher...' />
      
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
        <span onClick={() => props.clearFilters()}>Clear filters</span>
        <span>Done</span>
      </div>
    </div>
  )
}