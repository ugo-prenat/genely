import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'


import ComponentList from '../home/ComponentList';
import Filters from '../home/filters/Filters';

import '../../styles/home.scss'


export default function Home() {
  const [filters, setFilters] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    // Setup tab title
    document.title = 'Genely'
  }, [])
  
  const reloadList = newFilter => {
    /* setFilters(filters => [...filters, newFilter])
    navigate(`?filters=${ filters.map(filter => `${filter},`) }`) */
  }
  
  return (
    <div className='main-component home-component'>
      <Filters reloadList={filter => reloadList(filter)} />
      <ComponentList />
    </div>
  )
}
