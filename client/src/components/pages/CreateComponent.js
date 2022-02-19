import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { BigForm as CreateComponentForm } from '../createComponent/BigForm';
import ProgressBar from '../createComponent/ProgressBar';

import '../../styles/createComponent.scss'

export default function CreateComponent(props) {
  const isAuth = props.isAuth
  
  useEffect(() => {
    // Setup tab title
    document.title = 'Genely - Nouveau composant'
    
  }, [])
  
  return <div className='main-component create-component-component'>
    {  
      isAuth ?
        <>
          <div className='header'>
            <h2>Nouveau composant</h2>
            <ProgressBar />
          </div>
          <CreateComponentForm />
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
