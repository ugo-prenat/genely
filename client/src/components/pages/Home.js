import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'


import ComponentList from '../home/ComponentList';
import Filters from '../home/filters/Filters';

import '../../styles/home.scss'


export default function Home() {
  const [filters, setFilters] = useState([])
  const navigate = useNavigate()
  
  const reloadList = useRef(null)
  
  
  
  useEffect(() => {
    // Setup tab title
    document.title = 'Genely'
  }, [])
  
  useEffect(() => newfilters(), [filters])
  
  
  const newfilters = () => {
    // Reload the components list after selected filters
    
    // Update url
    if (filters.length !== 0) navigate(`?filters=${ filters.map(filter => `${filter}`) }`)
    else navigate('')
    
    
    reloadList.current(filters)
  }
  
  return (
    <div className='main-component home-component'>
      <Filters
        /* reloadList={filter => newfilters(filter)} */
        reloadList={filter => setFilters(filters => [...filters, filter])}
        clearFilters={() => setFilters([])}
      />
      <ComponentList reloadList={reloadList} />
    </div>
  )
}
