import React, { useState, useRef, useEffect } from 'react'
import { useForm } from "react-hook-form";
import lottie from 'lottie-web'

import ErrorMsg from '../forms/ErrorMsg';
import { request as fetch } from '../../controller/request'

import successAnim from '../../assets/animations/success.json'

import '../../styles/forgotPassword.scss'

export default function ForgotPasswordForm(props) {
  const [SuccessReset, setSuccessReset] = useState(false)
  
  return (
    <div className='forgot-password-form'>
      {
        SuccessReset ?
          <Success
            setShowForm={form => props.setShowForm(form)}
          />
          :
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
    fetch.post('/users/reset/password', data)
    .then(res => {
      if (res.status === 200) {
        props.setSuccessReset()
      } else {
        // Handle error
        setError(res.error.input, { type: 'manual', message: res.error.msg })
      }
    })
  }
  
  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className='form-title'>Oubli du mot de passe</p>
      
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
export function Success(props) {
  const anim = useRef(null)
  
  useEffect(() => {
    lottie.loadAnimation({
      container: anim.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: successAnim,
    });
    return () => lottie.stop();
  }, []);
  
  return(
    <div className='success-reset-password'>
      <div className='anim-container' ref={anim}></div>
      <div>
        <p>Un mail de réinitialisation de mot de passe vient de vous être envoyé.</p>
        <p onClick={() => props.setShowForm('login')}>Revenir à la connexion</p>
      </div>
    </div>
  )
}