import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'

import '../../styles/signup.scss'
import '../../styles/forms.scss'

import SignupForm from '../login/SignupForm';

export default function Signup() {
  useEffect(() => {
    // Setup tab title
    document.title = 'Genely - Inscription'
  }, [])
  
  return <div className='fullscreen-component signup-component'>
    <h1>
      <Link className='home-link' to='/'>Genely</Link>
    </h1>
    
    <SignupForm />
  </div>;
}
