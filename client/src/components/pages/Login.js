import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";

import '../../styles/login.scss'
import '../../styles/forms.scss'

import Warning from '../../assets/svg/Warning'

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showForm, setShowForm] = useState('login');
  const [focus, setFocus] = useState()
  
  useEffect(() => {
    // Setup tab title
    document.title = 'Genely - Connexion'
  }, [])

  const onSubmit = data => {
    console.log(data)
  }
  console.log(focus);
  
  
  return <div className='fullscreen-component login-component'>
    <h1>
      <Link className='home-link' to='/'>Genely</Link>
    </h1>
    
    { showForm === 'login' ? <LoginForm /> : <ForgotPasswordForm /> }
  </div>;
  
  function LoginForm() {
    return(
      <div className='login-form'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className='form-title'>Connexion</p>
          
          <div className='google-btn'>
            <button>Login with Google</button>
          </div>
          
          <div className='separation'><p>ou connectez-vous par email</p></div>
          
          <div className={`input-group ${focus === 'email' && 'active'}`}>
            <label>Email</label>
            <input 
              {...register(
                'email',
                {
                  required: 'Email obligatoire',
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: 'L\'email est invalide'
                  }
                }
              )}
              type='email'
              
              onFocus={() => setFocus('email')}
              onBlur={() => setFocus()}
            />
            { errors.email && <ErrorMsg msg={errors.email.message} /> }          
          </div>
          
          <div className={`input-group ${focus === 'password' && 'active'}`}>
            <label>Mot de passe</label>
            <input 
              {...register(
                'password',
                { required: 'Mot de passe obligatoire' }
              )}
              type='password'
              onFocus={() => setFocus('password')}
              onBlur={() => setFocus()}
            />
            { errors.password && <ErrorMsg msg={errors.password.message} /> }          
          </div>
          
          <button type='submit' className='submit-btn primary-btn'>Connexion</button>
          
          <div className='bottom-links'>
            <p>Vous n’avez pas de compte ? <Link to='/signup'>S’inscrire</Link></p>
            <span onClick={() => setShowForm('forgotPassword')}>Mot de passe oublié</span>
          </div>
          
        </form>
      </div>
    )
  }
  function ForgotPasswordForm() {
    return(
      <div className='forgot-password-form'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className='form-title'>Connexion</p>
          
          <div className='input-group active'>
            <label>Email</label>
            <input 
              {...register(
                'email',
                {
                  required: 'Email obligatoire',
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: 'L\'email est invalide'
                  }
                }
              )}
              autoFocus
            />
            { errors.email && <ErrorMsg msg={errors.email.message} /> }          
          </div>
          
          <button type='submit' className='submit-btn primary-btn'>Réinitialiser</button>
          
          <div className='bottom-links'>
            <p>Vous avez déjà un compte ?<span onClick={() => setShowForm('login')}>Connexion</span></p>
          </div>
        </form>
      </div>
    )
  }
}

function ErrorMsg(props) {
  return(
    <div className='error-msg'>
      <Warning />
      <p>{ props.msg }</p>
    </div>
  )
}