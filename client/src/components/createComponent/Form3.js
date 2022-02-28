import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import ErrorMsg from '../forms/ErrorMsg'

export function Form3(props) {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const [filters, setFilters] = useState(props.filters)
  
  const onSubmit = () => {
    props.nextStep(4, ['react', 'css'])
  }
  
  console.log(filters);
  
  return (
    <div className='step-form-container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        
      <div className={`${errors.filters && 'input-group-error'} input-group`}>
        <input
          {...register(
            'filters',
            { required: 'Champ obligatoire' }
          )}
          type='text'
        />
        <label>Filtres</label>
        { errors.filters && <ErrorMsg msg={errors.filters.message} /> }          
      </div>
      
      <button type='submit' className='submit-btn primary-btn'>Créer le composant</button>
      
      </form>
    </div>
  )
}