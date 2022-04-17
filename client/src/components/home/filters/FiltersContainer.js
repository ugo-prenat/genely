import React, { useEffect, useState } from 'react'

import FiltersList from './FiltersList'
import SearchInput from './SearchInput'
import SkeletonCard from './SkeletonCard'

import Triangle from '../../../assets/svg/Triangle'

import { request as fetch } from '../../../controller/request'


export default function Filters(props) {
  const [isLoading, setIsLoading] = useState(true)
  
  const [filters, setFilters] = useState()
  const [techFilters, setTechFilters] = useState()
  const [categoryFilters, setCategoryFilters] = useState()
  
  const [displayFilterList, setDisplayFilterList] = useState('')
  
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
  
  if (isLoading) return (<SkeletonCard count={10} />)
  
  return (
    <div className='filters-container'>
      <SearchInput />
      
      <div className='filter-select'>
        <p 
          onClick={() => setDisplayFilterList(displayFilterList === 'tech' ? '' : 'tech')}
          className={`select-title ${displayFilterList === 'tech' ? 'opened' : ''}`}
        >
          Technologies <Triangle />
        </p>
        { displayFilterList === 'tech' &&
        
          <FiltersList
            filters={techFilters}
            reloadList={filter => props.reloadList(filter)}
            clearFilters={() => props.clearFilters()}
            hideFilterList={() => setDisplayFilterList('')}
          />
        }
      </div>
      
      <div className='filter-select'>
        <p 
          onClick={() => setDisplayFilterList(displayFilterList === 'category' ? '' : 'category')}
          className={`select-title ${displayFilterList === 'category' ? 'opened' : ''}`}
        >
          Catégories <Triangle />
        </p>
        { displayFilterList === 'category' &&
        
          <FiltersList
            filters={categoryFilters}
            reloadList={filter => props.reloadList(filter)}
            clearFilters={() => props.clearFilters()}
            hideFilterList={() => setDisplayFilterList('')}
          />
        }
      </div>
    </div>
  )
}