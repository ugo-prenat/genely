import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { request as fetch } from '../../controller/request';

import ComponentNotFound from '../component/ComponentNotFound';
import ComponentContainer from '../component/ComponentContainer';

export default function Component() {
  // Get username and component name form url
  const { username, componentShortname } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  
  const [component, setComponent] = useState()
  const [isComponentFound, setIsComponentFound] = useState(true)
  
  
  useEffect(() => {
    // Setup tab title
    document.title = `${username} / ${componentShortname} - Genely`
    
    const getComponent = async() => {
      const res = await fetch.get(`/components/${username}/${componentShortname}`)
      if (!res.component) setIsComponentFound(false)
      else setComponent(res.component)
      
      setIsLoading(false)
    }
    getComponent()
  }, [username, componentShortname])
  
  if (isLoading) return(<div className='loading'>Chargement du composant...</div>)
  
  return <div className='main-component'>
    <p>/ {username} / {componentShortname}</p>
    
    {
      isComponentFound ? <ComponentContainer component={component} /> : <ComponentNotFound />
    }
    
  </div>;
}
