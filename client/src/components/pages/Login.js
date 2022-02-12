import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import '../../styles/login.scss'
import '../../styles/forms.scss'

import LoginForm from '../login/LoginForm';
import ForgotPasswordForm from '../login/ForgotPasswordForm';

export default function Login() {
  const [showForm, setShowForm] = useState('login');
  
  useEffect(() => {
    // Setup tab title
    document.title = 'Genely - Connexion'
  }, [])

  
  return <div className='fullscreen-component login-component'>
    <h1>
      <Link className='home-link' to='/'>Genely</Link>
    </h1>
    
    { showForm === 'login' ? <LoginForm setShowForm={form => setShowForm(form)} /> : <ForgotPasswordForm setShowForm={form => setShowForm(form)} /> }
  </div>;
  
}