import React, { useState, useEffect } from 'react'
import ComponentCard from './ComponentCard'

import { request as fetch } from '../../controller/request';
import SkeletonCard from './SkeletonCard';


export default function ComponentList(props) {
  const [components, setComponents] = useState()
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => loadAllComponents(null), [])
  
  const loadAllComponents = async(filters, searchInput) => {
    setIsLoading(true)
    const res = await fetch.get(getFetchUrl(filters, searchInput))
    setComponents(res.components)
    setIsLoading(false)
  }
  
  // Trigger the reload of the component list
  // Triggered by parent, at the addition of a new filter
  props.reloadList.current = (filters, searchInput) => loadAllComponents(filters, searchInput)
  
  
  if (isLoading) return(<SkeletonCard count={5} />)
  
  return (
    <div className='component-list'>
      {
        components.length > 0 ?
          components.map((component, index) => {
            return(<ComponentCard component={component} key={index} />)
          })
        :
          <p className='loading'>Aucun composant trouvé</p>
      }
    </div>
  )
}

function getFetchUrl(filters, searchInput) {
  // Generate the fetch url with params
  let url = '/components'
  let params = []
  
  if (filters?.length > 0) params.push(`filters=${filters.map(filter => `${filter}`)}`)
  if (searchInput) params.push(`search=${searchInput}`)
  
  params.forEach((param, i) => {
    if (i === 0) url += '?'
    if (i !== 0) url += '&'
    
    url += param
  })
  
  //console.log(url);
  return url
}