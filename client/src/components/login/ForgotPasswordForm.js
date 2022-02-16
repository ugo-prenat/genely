import React, { useState } from 'react'
import { useForm } from "react-hook-form";

import ErrorMsg from './ErrorMsg';

import { request as fetch } from '../../controller/request'

export default function ForgotPasswordForm(props) {
  const [SuccessReset, setSuccessReset] = useState(false)
  
  return (
    <div className='forgot-password-form'>
      {
        SuccessReset ? <Success /> :
          <Form
            setShowForm={form => props.setShowForm(form)}
            setSuccessReset={() => setSuccessReset(true)}
          />
      }
    </div>
  )
}
export function Form(props) {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  
  const onSubmit = data => {
    fetch.post('/auth/reset/password?sendEmail=true', data)
    .then(res => {
      if (res.status === 200) {
        console.log(res);
        props.setSuccessReset()
      } else {
        // Handle error
        setError(res.error.input, { type: 'manual', message: res.error.msg })
      }
    })
  }
  
  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className='form-title'>Connexion</p>
      
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
        />
        <label>Email</label>
        { errors.email && <ErrorMsg msg={errors.email.message} /> }          
      </div>
      
      <button type='submit' className='submit-btn primary-btn'>Réinitialiser</button>
      
      <div className='bottom-links'>
        <p>Vous avez déjà un compte ? <span onClick={() => props.setShowForm('login')}>Connexion</span></p>
      </div>
    </form>
  )
}
export function Success() {
  return(
    <div className='success-reset-password'>
      Success
    </div>
  )
}