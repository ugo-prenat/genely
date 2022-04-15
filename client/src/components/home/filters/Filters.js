import React, { useEffect, useState } from 'react'

import FiltersList from './FiltersList'
import SkeletonCard from './SkeletonCard'

import { request as fetch } from '../../../controller/request'


export default function Filters(props) {
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
  
  if (isLoading) return (<SkeletonCard count={10} />)
  
  return (
    <div>
      <FiltersList
        filters={filters}
        reloadList={filter => props.reloadList(filter)}
        clearFilters={() => props.clearFilters()}
      />
    </div>
  )
}