import React from 'react'
import { useForm } from 'react-hook-form'


export function Form2(props) {
  const { register, handleSubmit } = useForm();
  
  const onSubmit = data => {
    const description = data.description !== '' ? data.description : undefined
    props.nextStep(3, description)
  }
   
  return (
    <div className='step-form-container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className='form-title'>Description du composant</p>
        
        <div className='input-group textarea-group'>
          <textarea
            { ...register('description') }
            rows={6}
          />
          <label>Description (facultatif)</label>
        </div>

        <button type='submit' className='submit-btn primary-btn'>Étape suivante</button>
        
      </form>
    </div>
  )
}