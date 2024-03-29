import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";

import ErrorMsg from '../forms/ErrorMsg';
import EyeOpen from '../../assets/svg/EyeOpen'
import EyeClose from '../../assets/svg/EyeClose'

import GoogleLoginBtn from './GoogleLoginBtn';
import Button from '../forms/Button';

import { request as fetch } from '../../controller/request';

export default function LoginForm(props) {
  const { register, handleSubmit, formState, setError } = useForm();
  const { errors } = formState
  const [googleLoginError, setGoogleLoginError] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  
  const onSubmit = async data => {
    // Login
    setIsSubmitting(true)
    const res = await fetch.post('/auth/login', data)
    setIsSubmitting(false)
    
    if (res.status === 200) {
      // Store token in localstorage
      localStorage.setItem('token', res.token)
      // Redirect user to homepage and refresh to apply localstorage
      navigate('/')
      window.location.reload(false);
    } else if (res.status === 400) {
      // Handle error
      setError(res.error.input, { type: 'manual', message: res.error.msg })
    } else if (res.status === 401) {
      // Display server error
      setGoogleLoginError(res.error.msg)
    }
  }
  
  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className='form-title'>Connexion</p>
        
        <GoogleLoginBtn loginError={err => setGoogleLoginError(err)} isSubmitting={status => setIsSubmitting(status)} />
        <div className='separation'><p>ou connectez-vous par email</p></div>
        
        <div className={`${errors.email ? 'input-group-error' : ''} input-group`}>
          <input
            {...register(
              'email',
              { required: 'Email obligatoire' }
            )}
            type='text'
          />
          <label>Email</label>
          { errors.email && <ErrorMsg msg={errors.email.message} /> }          
        </div>
        
        <div className={`${errors.password ? 'input-group-error' : ''} input-group`}>
          <input 
            {...register(
              'password',
              { required: 'Mot de passe obligatoire' }
            )}
            type={showPassword ? 'text' : 'password'}
          />
          <label>Mot de passe</label>
          
          <div className='password-eye' onClick={() => setShowPassword(!showPassword)}>
            { showPassword ? <EyeOpen /> : <EyeClose /> }
          </div>
          
          { errors.password && <ErrorMsg msg={errors.password.message} /> }
        </div>
        
        <Button
          type='submit'
          isSubmitting={isSubmitting}
          submittingText='Connexion...'
        >
          Connexion
        </Button>
        
        <div className='bottom-links'>
          <p>Vous n’avez pas de compte ? <Link to='/signup'>S’inscrire</Link></p>
          <span onClick={() => props.setShowForm('forgotPassword')}>Mot de passe oublié</span>
        </div>
        
        { googleLoginError && 
          <div className='google-error'>
            <ErrorMsg msg={googleLoginError} /> 
          </div>
        }
      </form>
    </div>
  )
}