import React from 'react'
import { useForm } from 'react-hook-form'


export function Form2() {
  const { register, handleSubmit } = useForm();
  
  const onSubmit = data => {
    console.log(data);
  }
   
  return (
    <div className='step-form-container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className='form-title'>Description</p>
        
        <div className='input-group'>
          <textarea
            { ...register('description') }
            placeholder='Description du composant (facultatif)'
          />
          <input
            {...register(
              'fullname',
              { required: 'Champ obligatoire' }
            )}
            type='text'
            autoComplete='off'
          />
        </div>
        
      </form>
    </div>
  )
}