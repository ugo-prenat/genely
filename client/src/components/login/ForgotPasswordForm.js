import React from 'react'
import { useForm } from "react-hook-form";

import ErrorMsg from './ErrorMsg';

export default function ForgotPasswordForm(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = data => {
    console.log(data)
  }
  
  return (
    <div className='forgot-password-form'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className='form-title'>Connexion</p>
        
        <div className={`${errors.email && 'input-group-error'} input-group`}>
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
          />
          { errors.email && <ErrorMsg msg={errors.email.message} /> }          
        </div>
        
        <button type='submit' className='submit-btn primary-btn'>Réinitialiser</button>
        
        <div className='bottom-links'>
          <p>Vous avez déjà un compte ?<span onClick={() => props.setShowForm('login')}>Connexion</span></p>
        </div>
      </form>
    </div>
  )
}