import React, { useEffect, useState } from 'react'

import { request as fetch } from '../../../controller/request'
import FiltersList from './FiltersList'


export default function Filters() {
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState()
  
  useEffect(() => {
    const getFilters = async() => {
      const res = await fetch.get('/filters')
      setFilters(res.filters)
      setIsLoading(false)
    }
    getFilters()
  }, [])
  
  if (isLoading) return (<div className='loading'>Chargement des filtres</div>)
  
  return (
    <div>
      <FiltersList filters={filters} />
    </div>
  )
}