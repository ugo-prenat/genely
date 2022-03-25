import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";

import ErrorMsg from '../forms/ErrorMsg';
import EyeOpen from '../../assets/svg/EyeOpen'
import EyeClose from '../../assets/svg/EyeClose'

import Button from '../forms/Button';

import '../../styles/resetPassword.scss'


export default function ResetPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [authError, setAuthError] = useState(false)
  const navigate = useNavigate()
  
  const URL = process.env.REACT_APP_BACKEND_URL
  const { token } = useParams()
  
  const onSubmit = async password => {
    setIsSubmitting(true)
    await fetch(
      `${URL}/users`,
      {
        method: 'PATCH',
        body: JSON.stringify(password),
        headers: { 
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      }
    )
    .then(res => res.json())
    .then(res => {
      setIsSubmitting(false)
        
      if (res.status === 200) {
        setAuthError(false)
        
        // Redirect user to homepage and refresh to apply localstorage
        localStorage.setItem('token', token)
        navigate('/')
        window.location.reload(false);
      }
      else setAuthError(true)
    })
  }
  
  return (
    <div className='main-component reset-password-component'>
      <div className='reset-password-form'>        
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className='form-title'>Nouveau mot de passe</p>
          
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
            <label>Nouveau Mot de passe</label>
            
            <div className='password-eye' onClick={() => setShowPassword(!showPassword)}>
              { showPassword ? <EyeOpen /> : <EyeClose /> }
            </div>
            
            { errors.password && <ErrorMsg msg={errors.password.message} /> }          
          </div>
          
          <Button
            type='submit'
            isSubmitting={isSubmitting}
            submittingText='Réinitialisation...'
          >
            Réinitialiser
          </Button>
          
          <div className='auth-error'>
            { authError && <ErrorMsg msg={'Une erreur est survenue, merci de recliquer sur le lien du mail'} /> }
          </div>
        </form> 
      </div>
    </div>
  )
}