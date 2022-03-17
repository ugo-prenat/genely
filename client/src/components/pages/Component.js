import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { request as fetch } from '../../controller/request';
import Path from '../Path';

import ComponentNotFound from '../component/ComponentNotFound';
import ComponentContainer from '../component/ComponentContainer';

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
    
    <div className='data'>
      <p className='fullname'>{ component.fullname }</p>
      <p className='shortname'>{ component.shortname }</p>
      <p className='description'>{ component.description }</p>
      <div className='filters'>
        { component.filters.map((filter, index) => <p key={index}>{filter.name}</p> )}
      </div>
      <p className='created-at'>Publié le { getDate(component.createdAt) }</p>
      <button className='secondary-btn'>Télécharger le composant</button>
    </div>
    
    <ComponentContainer component={component} />
    
  </div>;
}

function getDate(d) {
  // Return a good formated date
  const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  const date = new Date(d)
  const month = months[date.getMonth()]
  
  return `${date.getDate()} ${month} ${date.getFullYear()}`
}
