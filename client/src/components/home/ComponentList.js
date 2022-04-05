import React, { useState, useEffect } from 'react'
import ComponentCard from './ComponentCard'

import { request as fetch } from '../../controller/request';


export default function ComponentList() {
  const [components, setComponents] = useState()
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const loadAllComponents = async() => {
      const res = await fetch.get('/components')
      setComponents(res.components)
      setIsLoading(false)
    }
    loadAllComponents()
  }, [])
  
  if (isLoading) return(<div className='loading'>Chargement des composants...</div>)
  
  return (
    <div className='component-list'>
      {
        components.map((component, index) => {
          return(<ComponentCard component={component} key={index} />)
        })
      }
    </div>
  )
}