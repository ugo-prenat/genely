import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";

import ErrorMsg from './ErrorMsg';
import EyeOpen from '../../assets/svg/EyeOpen'
import EyeClose from '../../assets/svg/EyeClose'

import GoogleLoginBtn from './GoogleLoginBtn';

//import { request as fetch } from '../../controller/request';

export default function LoginForm(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false)
  
  const onSubmit = data => {
    console.log(data)
  }
  
  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className='form-title'>Connexion</p>
        
        <GoogleLoginBtn />
        <div className='separation'><p>ou connectez-vous par email</p></div>
        
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
        
        <div className={`${errors.password && 'input-group-error'} input-group`}>
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
        
        <button type='submit' className='submit-btn primary-btn'>Connexion</button>
        
        <div className='bottom-links'>
          <p>Vous n’avez pas de compte ? <Link to='/signup'>S’inscrire</Link></p>
          <span onClick={() => props.setShowForm('forgotPassword')}>Mot de passe oublié</span>
        </div>
        
      </form>
    </div>
  )
}