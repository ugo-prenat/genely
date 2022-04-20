import React, { useEffect, useState } from 'react'

import FiltersList from './FiltersList'
import SearchInput from './SearchInput'

import Triangle from '../../../assets/svg/Triangle'

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
    props.reloadList(selectedTechFilters)
  }
  const removeFromTechFilters = filter => {
    // Remove the filter from the selected filters list
    setSelectedTechFilters(selectedTechFilters => selectedTechFilters.filter(item => item !== filter))
    props.reloadList(selectedTechFilters)
  }
  
  
  
  return (
    <div className='filters-container'>
      <SearchInput
        isLoading={isLoading}
      />
      
      <div className='filter-select'>
        { isLoading ?
            <p className='select-title is-loading'>Technologies <Triangle /></p>
          :
            <p 
              onClick={() => setDisplayFilterList(displayFilterList === 'tech' ? '' : 'tech')}
              className={`select-title ${displayFilterList === 'tech' ? 'opened' : ''}`}
            >
              Technologies <Triangle />
            </p>
        }
        { displayFilterList === 'tech' &&
        
          <FiltersList
            filters={techFilters}
            reloadList={filter => props.reloadList(filter)}
            //clearFilters={() => props.clearFilters('tech')}
            
            addToFilters={filter => addToTechFilters(filter)}
            removeFromFilters={filter => removeFromTechFilters(filter) }
            selectedFilters={selectedTechFilters}
            
            clearFilters={() => setTechFilters([])}
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
              Catégories <Triangle />
            </p>
        }
        { displayFilterList === 'category' &&
        
          <FiltersList
            filters={categoryFilters}
            reloadList={filter => props.reloadList(filter)}
            //clearFilters={() => props.clearFilters('category')}
            clearFilters={() => setCategoryFilters([])}
            hideFilterList={() => setDisplayFilterList('')}
          />
        }
      </div>
    </div>
  )
}