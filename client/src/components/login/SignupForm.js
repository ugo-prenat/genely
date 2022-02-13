import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";

import { request as fetch } from '../../controller/request';

import ErrorMsg from './ErrorMsg';
import EyeOpen from '../../assets/svg/EyeOpen'
import EyeClose from '../../assets/svg/EyeClose'

import GoogleSignupBtn from './GoogleSignupBtn';

export default function SignupForm() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const [googleSignupError, setGoogleSignupError] = useState()
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  
  const onSubmit = data => {
    fetch.post('/auth/signup', data)
    .then(res => {
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
        setGoogleSignupError(res.error.msg)
      }
    })
  }
  
  return (
    <div className='signup-form'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className='form-title'>Inscription</p>
        
        <GoogleSignupBtn signupError={err => setGoogleSignupError(err)} />
        <div className='separation'><p>ou inscrivez-vous par email</p></div>
        
        <div className={`${errors.email && 'input-group-error'} input-group`}>
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
            type='text'
          />
          <label>Email</label>
          { errors.email && <ErrorMsg msg={errors.email.message} /> }          
        </div>
        
        <div className={`${errors.username && 'input-group-error'} input-group`}>
          <input
            {...register(
              'username',
              {
                required: 'Nom d\'utilisateur obligatoire',
                validate: {
                  noSpace: value => !/\s/.test(value) || 'Ne peut pas contenir d\'espace',
                  noSpecialChar: value => !/[$&+,:;=?@#|\/éçàè'<>.^*()%!]/.test(value) || 'Ne peut pas contenir de caractère spécial'
                }
              }
            )}
            type='text'
          />
          <label>Nom d'utilisateur</label>
          { errors.username && <ErrorMsg msg={errors.username.message} /> }          
        </div>
        
        <div className='signup-fullname-input-group'>
        <div className={`${errors.firstname && 'input-group-error'} input-group`}>
          <input
            {...register(
              'firstname',
              {
                required: 'Prénom obligatoire',
              }
            )}
            type='text'
          />
          <label>Prénom</label>
          { errors.firstname && <ErrorMsg msg={errors.firstname.message} /> }          
        </div>
        
        <div className={`${errors.lastname && 'input-group-error'} input-group`}>
          <input
            {...register('lastname')}
            type='text'
          />
          <label>Nom</label>
          { errors.lastname && <ErrorMsg msg={errors.lastname.message} /> }          
        </div>
        </div>
        
        <div className={`${errors.password && 'input-group-error'} input-group`}>
          <input 
            {...register(
              'password',
              {
                required: 'Mot de passe obligatoire' ,
                validate: {
                  specialChar: value => /[$&+,:;=?@#|'<>.^*()%!]/.test(value) || 'Doit contenir au moins un caractère spécial',
                  number: value => /[0-9]/.test(value) || 'Doit contenir au moins un chiffre',
                  capitalLetter: value => /[A-Z]/.test(value) || 'Doit contenir au moins une lettre majuscule',
                  lowerCase: value => /[a-z]/.test(value) || 'Doit contenir au moins une lettre miniscule',
                },
                minLength: {
                  value: 8, message: '8 caractères minimum'
                },
              }
            )}
            type={showPassword ? 'text' : 'password'}
          />
          <label>Mot de passe</label>
          
          <div className='password-eye' onClick={() => setShowPassword(!showPassword)}>
            { showPassword ? <EyeOpen /> : <EyeClose /> }
          </div>
          
          { errors.password && <ErrorMsg msg={errors.password.message} /> }          
        </div>
        <button type='submit' className='submit-btn primary-btn'>Inscription</button>
        
        <div className='bottom-links'>
          <p>Vous avez déjà un compte ? <Link to='/login'>Se connecter</Link></p>
        </div>
        
        { googleSignupError && 
          <div className='google-error'>
            <ErrorMsg msg={googleSignupError} /> 
          </div>
        }
      </form>
    </div>
  )
}