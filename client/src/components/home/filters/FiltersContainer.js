import React, { useEffect, useState } from 'react'

import FiltersList from './FiltersList'
import SearchInput from './SearchInput'

import Triangle from '../../../assets/svg/Triangle'
import Cross from '../../../assets/svg/Cross'

import { request as fetch } from '../../../controller/request'


export default function Filters(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [displayFilterList, setDisplayFilterList] = useState('')
  
  const [filters, setFilters] = useState()
  
  const [techFilters, setTechFilters] = useState()
  const [selectedTechFilters, setSelectedTechFilters] = useState([])
  const [categoryFilters, setCategoryFilters] = useState()
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState([])
  
  
  useEffect(() => {
    const getFilters = async() => {
      const res = await fetch.get('/filters')
      
      setFilters(res.techFilters.concat(res.categotyFilters))
      setTechFilters(res.techFilters)
      setCategoryFilters(res.categoryFilters)
      
      setIsLoading(false)
    }
    getFilters()
  }, [])
  
  const addToTechFilters = filter => {
    // Add the filter to the selected filters list
    setSelectedTechFilters(selectedTechFilters => [...selectedTechFilters, filter])
    props.addFilter(filter)
  }
  const removeFromTechFilters = filter => {
    // Remove the filter from the selected filters list
    setSelectedTechFilters(selectedTechFilters => selectedTechFilters.filter(item => item !== filter))
    props.removeFilter(filter)
  }
  const clearTechFilters = () => {
    // Clear the selected filters list
    props.clearFilters(selectedTechFilters)
    setSelectedTechFilters([])
  }
    
  const addToCategoryFilters = filter => {
    // Add the filter to the selected filters list
    setSelectedCategoryFilters(selectedTechFilters => [...selectedTechFilters, filter])
    props.addFilter(filter)
  }
  const removeFromCategoryFilters = filter => {
    // Remove the filter from the selected filters list
    setSelectedCategoryFilters(selectedTechFilters => selectedTechFilters.filter(item => item !== filter))
    props.removeFilter(filter)
  }
  const clearCategoryFilters = () => {
    // Clear the selected filters list
    props.clearFilters(selectedCategoryFilters)
    setSelectedCategoryFilters([])
  }
  
  
  
  return (
    <div className='filters-container'>
      <SearchInput
        isLoading={isLoading}
        applySearch={searchInput => props.searchFilter(searchInput)}
      />
      
      <div className='filter-select'>
        { isLoading ?
            <p className='select-title is-loading'>Technologies <Triangle /></p>
          :
            <p 
              onClick={() => setDisplayFilterList(displayFilterList === 'tech' ? '' : 'tech')}
              className={`select-title ${displayFilterList === 'tech' ? 'opened' : ''}`}
            >
              Technologies
              { selectedTechFilters.length > 0 ?
                  <div className='filters-length'>
                    <span>{ selectedTechFilters.length }</span>
                    <span onClick={clearTechFilters} className='cross'><Cross /></span>
                  </div>
                :
                <span className='triangle'><Triangle /></span>
              }
            </p>
        }
        { displayFilterList === 'tech' &&
        
          <FiltersList
            filters={techFilters}
            
            addToFilters={filter => addToTechFilters(filter)}
            removeFromFilters={filter => removeFromTechFilters(filter) }
            selectedFilters={selectedTechFilters}
            
            clearFilters={clearTechFilters}
            hideFilterList={() => setDisplayFilterList('')}
          />
        }
      </div>
      
      <div className='filter-select'>
        { isLoading ?
            <p className='select-title is-loading'>Catégories <Triangle /></p>
          :
            <p 
              onClick={() => setDisplayFilterList(displayFilterList === 'category' ? '' : 'category')}
              className={`select-title ${displayFilterList === 'category' ? 'opened' : ''}`}
            >
              Catégories
              { selectedCategoryFilters.length > 0 ?
                  <div className='filters-length'>
                    <span>{ selectedCategoryFilters.length }</span>
                    <span onClick={clearCategoryFilters} className='cross'><Cross /></span>
                  </div>
                :
                  <span className='triangle'><Triangle /></span>
              }
            </p>
        }
        { displayFilterList === 'category' &&
        
          <FiltersList
            filters={categoryFilters}
            
            addToFilters={filter => addToCategoryFilters(filter)}
            removeFromFilters={filter => removeFromCategoryFilters(filter) }
            selectedFilters={selectedCategoryFilters}
            
            clearFilters={clearCategoryFilters}
            hideFilterList={() => setDisplayFilterList('')}
          />
        }
      </div>
    </div>
  )
}