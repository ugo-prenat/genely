import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ProgressBar from '../createComponent/ProgressBar';
import { BigForm as CreateComponentForm } from '../createComponent/BigForm';

import { request as fetch } from '../../controller/request'

import '../../styles/createComponent.scss'


export default function CreateComponent(props) {
  const [isLoading, setIsLoading] = useState(true) 
  const [filters, setFilters] = useState() 
  const [actualStep, setActualStep] = useState(1)
  
  const isAuth = props.isAuth
  const user = props.user
  
  useEffect(() => {
    // Setup tab title
    document.title = 'Genely - Nouveau composant'
    // Get all filters
    const getFilters = async() => {
      const res = await fetch.get('/filters')
      setFilters(res.filters)
      setIsLoading(false)
    }
    getFilters()
  }, [])
  
  if (isLoading) return( <div className='loading'>Initialisation de votre composant...</div> )
  
  return <div className='main-component create-component-component'>
    {  
      isAuth ?
        <>
          <div className='header'>
            <h2>Nouveau composant</h2>
            <ProgressBar actualStep={actualStep} />
          </div>
          <CreateComponentForm user={user} filters={filters} setActualStep={step => setActualStep(step) }  />
        </>
        :
        <div className='not-connected'>
          <p>Vous semblez ne pas être connecté...</p>
          <p>Un compte est obligatoire pour créer un nouveau composant.</p>
          <Link to={'/login'}>Se connecter</Link>
        </div>
    }
  </div>;
}
