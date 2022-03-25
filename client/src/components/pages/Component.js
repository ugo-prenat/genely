import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { request as fetch } from '../../controller/request';
import Path from '../Path';

import ComponentNotFound from '../component/ComponentNotFound';
import ComponentCode from '../component/ComponentCode';
import ComponentData from '../component/ComponentData';
import ComponentIllustrations from '../component/ComponentIllustrations';

import '../../styles/component.scss'


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

      if (res.status !== 200) setIsComponentFound(false)
      else setComponent(res.component)
      setIsLoading(false)
    }
    getComponent()
  }, [username, componentShortname])
  
  
  if (isLoading) return(<div className='loading'>Chargement du composant...</div>)
  else if (!isComponentFound) return(<ComponentNotFound />)
  
  return <div className='main-component component-page-component'>
    <Path path={[
      { 'name': username, 'link': `/${username}` },
      { 'name': componentShortname, 'link': `/${username}/${componentShortname}` }
    ]} />
    
    <ComponentData component={component} />
    <ComponentCode component={component} />
    <ComponentIllustrations urls={component.illustrations} />
  </div>;
}
