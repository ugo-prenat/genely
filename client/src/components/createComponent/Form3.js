import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import ErrorMsg from '../forms/ErrorMsg'

export function Form3(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [filters, setfilters] = useState([])
  const [value, setValue] = useState('')
  const [showFiltersList, setShowFiltersList] = useState(false)
  
  const allFilters = props.filters
  const [allFiltersList, setAllFiltersList] = useState(allFilters)
  
  const onSubmit = () => {
    props.nextStep(4, filters)
  }
  const updateFiltersList = value => {
    // Search filter system
    setAllFiltersList(
      allFilters.filter(filter => 
        filter.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      )
    )
    setValue(value)
  }
  const addFilter = newFilter => {
    // Add a new filter to the filter's list
    setfilters(prevData => (
      [
        ...prevData,
        {name: newFilter.name, type: newFilter.type}
      ]
    ))
    // Delete the select filter from the all list
    setAllFiltersList(allFilters => allFilters.filter(filter => filter.name !== newFilter.name))
  }
  console.log(filters);
  return (
    <div className='step-form-container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <div className='filters-list'>
          { filters.length === 0 && <p className='empty-list'>+ ajouter un filtre</p> }
          { filters.map((filter, index) => {
            return(
              <p
                className='filter'
                key={index}
                type={filter.type}
              >
                { filter.name }
              </p>
            )
          })}
        </div>
        
        <div className={`${errors.filters && 'input-group-error'} input-group`}>
          <input
            {...register(
              'filters',
              { required: 'Champ obligatoire' }
            )}
            type='text'
            value={value}
            onChange={e => updateFiltersList(e.target.value)}
            autoComplete='off'
            onFocus={() => setShowFiltersList(true)}
            //onBlur={() => setShowFiltersList(false)}
          />
          <label>Filtres</label>
          
          { errors.filters && <ErrorMsg msg={errors.filters.message} /> }
          
          { showFiltersList &&
            <div className='filters-select-list'>
              { allFiltersList.map((filter, index) => {
                return(
                  <p
                    className='filter'
                    type={filter.type}
                    key={index}
                    onClick={filter => addFilter(filter)}
                  >
                    { filter.name }
                  </p>
                )
              }) }
            </div>
          }
        </div>
        
        <button type='submit' className='submit-btn primary-btn'>Créer le composant</button>
      
      </form>
    </div>
  )
}