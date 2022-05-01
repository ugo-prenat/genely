import React, { useState, useEffect } from 'react'

import ComponentCard from './ComponentCard'

import { request as fetch } from '../../controller/request';
import SkeletonCard from './SkeletonCard';


export default function ComponentList(props) {
  const [components, setComponents] = useState()
  const [isLoading, setIsLoading] = useState(true)
  
  // At the load of the page, load components list with filters in url
  const queryParams = new URLSearchParams(window.location.search)
  const urlFilters = queryParams.get('filters')
  const urlSearch = queryParams.get('search')
  
  useEffect(() => loadAllComponents(urlFilters?.split(','), urlSearch), [urlSearch, urlFilters])
  //useEffect(() => loadAllComponents([], null), [urlSearch, urlFilters])
  
  const loadAllComponents = async(filters, searchInput) => {
    setIsLoading(true)
    const params = getParams(filters, searchInput)
    
    const res = await fetch.get(`/components${params}`)
    setComponents(res.components)
    setIsLoading(false)
  }
  
  // Trigger the reload of the component list
  // Triggered by parent, at the addition of a new filter
  props.reloadList.current = (filters, searchInput) => loadAllComponents(filters, searchInput)
  
  
  if (isLoading) return(<SkeletonCard count={5} />)
  
  return (
    <>
      {
        components.length > 0 ?
          <div className='component-list'>
            { 
              components.map((component, index) => {
                return(<ComponentCard component={component} key={index} />)
              })
            }
          </div>
        :
        <p className='loading'>Aucun composant trouvé pour votre recherche</p>
      }
    </>
  )
}

function getParams(filters, searchInput) {
  // Generate the fetch url with params
  let base = ''
  let params = []
  
  if (filters?.length > 0) params.push(`filters=${filters.map(filter => `${filter.toLowerCase()}`)}`)
  if (searchInput) params.push(`search=${searchInput.toLowerCase()}`)
  
  params.forEach((param, i) => {
    if (i === 0) base += '?'
    if (i !== 0) base += '&'
    
    base += param
  })
  
  return base
}