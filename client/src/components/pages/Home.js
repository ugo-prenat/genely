import React, { useEffect, useState } from 'react';

import ComponentList from '../home/ComponentList';
import Filters from '../home/filters/Filters';

import '../../styles/home.scss'


export default function Home() {
  useEffect(() => {
    // Setup tab title
    document.title = 'Genely'
  }, [])
  
  return (
    <div className='main-component home-component'>
      <Filters />
      <ComponentList />
    </div>
  )
}
