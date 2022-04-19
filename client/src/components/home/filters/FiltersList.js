import React, { useState, useEffect } from 'react'
import FilterCard from './FilterCard'


export default function FiltersList(props) {
  const filters = props.filters
  const [filteredList, setFilteredList] = useState(filters)
  const [searchValue, setSearchValue] = useState('')
  
  
  useEffect(() => {
    // To each user, reset the filtered list
    setFilteredList(() => 
      filters.filter(filter => filter.name.toLowerCase().includes(searchValue.toLowerCase()))
    )
  }, [searchValue])
  

  return (
    <div className='filter-list'>
      <input
        placeholder='Rechercher...'
        autoFocus
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
      
      <div className='filter-option'>
        { 
          filteredList.length > 0 ?
            filteredList.map((filter, index) =>
              <FilterCard
                filter={filter}
                reloadList={filter => props.reloadList(filter)}
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
  )
}