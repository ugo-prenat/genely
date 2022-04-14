import React from 'react'
import FilterCard from './FilterCard'


export default function FiltersList(props) {
  const filters = props.filters
  
  return (
    <div className='filters-list'>
      { filters.map((filter, index) => <FilterCard filter={filter} key={index} />) }
    </div>
  )
}