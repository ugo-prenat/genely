import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import ErrorMsg from '../forms/ErrorMsg'

export function Form3(props) {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const [filters, setfilters] = useState([{name:'react', type:'technology'}, {name:'SASS', type:'technology'}])
  
  const allFilters = props.filters
  
  const onSubmit = () => {
    props.nextStep(4, ['react', 'css'])
  }
  
  console.log(allFilters);
  
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
      
      <div className='filters-list'>
        { filters.map((filter, index) => {
          return(
            <p className='filter' key={index} type={filter.type}>{ filter.name }</p>
          )
        })}
      </div>
      
      <button type='submit' className='submit-btn primary-btn'>Créer le composant</button>
      
      </form>
    </div>
  )
}