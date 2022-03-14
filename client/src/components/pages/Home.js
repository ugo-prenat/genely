import React, { useEffect, useState } from 'react';

import ComponentCard from '../home/ComponentCard'
import { request as fetch } from '../../controller/request';

export default function Home() {
  const [components, setComponents] = useState()
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Setup tab title
    document.title = 'Genely'
    
    const loadAllComponents = async() => {
      const res = await fetch.get('/components')
      setComponents(res.components)
      setIsLoading(false)
    }
    loadAllComponents()
    
  }, [])
  
  if (isLoading) return(<div className='loading'>Chargement des composants...</div>)
  
  return <div className='main-component'>
    {
      components.map((component, index) => {
        return(<ComponentCard component={component} key={index} />)
      })
    }
  </div>;
}
