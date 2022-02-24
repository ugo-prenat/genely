import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import ErrorMsg from '../forms/ErrorMsg'

export function Form3() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const [filters, setFilters] = useState([])
  
  const onSubmit = data => {
    console.log(data);
  }
  
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
        
      </form>
    </div>
  )
}