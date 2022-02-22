import React from 'react'
import { useForm } from 'react-hook-form'

import ErrorMsg from '../forms/ErrorMsg';

import { request as fetch } from '../../controller/request'

export function Form2() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  
  const onSubmit = data => {
    console.log(data);
  }
  
  return (
    <div className='step-form-container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className='form-title'>Ajoutez votre code</p>
      </form>
    </div>
  )
}