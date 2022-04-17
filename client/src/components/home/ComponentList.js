import React, { useState, useEffect } from 'react'
import ComponentCard from './ComponentCard'

import { request as fetch } from '../../controller/request';
import SkeletonCard from './SkeletonCard';


export default function ComponentList(props) {
  const [components, setComponents] = useState()
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => loadAllComponents(null), [])
  
  const loadAllComponents = async filters => {
    setIsLoading(true)
    const res = await fetch.get(`/components?filters=${filters}`)
    setComponents(res.components)
    setIsLoading(false)
  }
  
  // Trigger the reload of the component list
  // Triggered by parent, at the addition of a new filter
  props.reloadList.current = filters => loadAllComponents(filters)
  
  
  if (isLoading) return(<SkeletonCard count={5} />)
  
  return (
    <div className='component-list'>
      {
        components.length > 0 ?
          components.map((component, index) => {
            return(<ComponentCard component={component} key={index} />)
          })
        :
          <p className='loading'>Aucun comp</p>
      }
    </div>
  )
}