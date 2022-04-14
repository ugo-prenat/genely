import React, { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import ErrorMsg from '../forms/ErrorMsg'
import FilterCard from './FilterCard';
import FilterSelectCard from './FilterSelectCard';


export function Form4(props) {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const [isMouseOnFiltersList, setIsMouseOnFiltersList] = useState(false)
  const [showFiltersList, setShowFiltersList] = useState(false)
  const [filters, setfilters] = useState([])
  const [value, setValue] = useState('')
  
  const allFilters = props.filters
  const [allFiltersList, setAllFiltersList] = useState(allFilters)
  
  const inputRef = useRef(null)
  
  const onSubmit = () => {
    if (filters.length > 0) props.nextStep(5, filters)
    else setError('filters', { type: 'manual', message: 'Sélectionnez au moins un filtre' })
  }
    
  const updateFiltersList = value => {
    // Search filter system
    setShowFiltersList(true)
    
    setAllFiltersList(
      allFilters.filter(filter => 
        filter.name.toLowerCase().indexOf(value.toLowerCase()) > -1 &&
        !isFilterAdded(filter)        
      )
    )
    setValue(value)
  }
  const isFilterAdded = filter => {
    // Look if the given filter is already in the filters list
    for (let i = 0; i < filters.length; i++) {
      if (filters[i] === filter) return true
    }
    return false
  }
  const addFilter = newFilter => {
    // Add a new filter to the filter's list
    setfilters(prevData => ([ ...prevData, newFilter ]))
    // Delete the select filter from the all list
    setAllFiltersList(allFilters => allFilters.filter(filter => filter.name !== newFilter.name))
  }
  const deleteFilter = targetFilter => {
    // Delete a filter from the selected filters list
    setfilters(prevData => prevData.filter(filter => filter.name !== targetFilter.name))
    // Add the deleted filter to the all filters list
    setAllFiltersList(prevData => ([ ...prevData, targetFilter ]))
  }
  const focus = () => {
    // Focus the input
    inputRef.current.focus()
    setShowFiltersList(true)
  }
  const unFocus = () => {
    if (!isMouseOnFiltersList) setShowFiltersList(false)
  }
  
  return (
    <div className='step-form-container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className='form-title'>Ajoutez des filtres</p>
        
        <div className='filters-list'>
          { filters.length === 0 && <p className='empty-filters-list'>+ ajouter un filtre...</p> }
          { filters.map((filter, index) =>
            <FilterCard
              filter={filter}
              deleteFilter={() => deleteFilter(filter)}
              key={index}
            />
          )}
        </div>
        
        <div className={`${errors.filters ? 'input-group-error' : ''} input-group`}>
          <input
            {...register('filters')}
            type='text'
            value={value}
            ref={inputRef}
            onChange={e => updateFiltersList(e.target.value)}
            autoComplete='off'
            onFocus={focus}
            onBlur={unFocus}
          />
          <label>Filtres</label>
          
          { errors.filters && <ErrorMsg msg={errors.filters.message} /> }
          
          { showFiltersList &&
            <div
              className='filters-select-list'
              onMouseEnter={() => setIsMouseOnFiltersList(true)}
              onMouseLeave={() => setIsMouseOnFiltersList(false)}
            >
              { allFiltersList.map((filter, index) => 
                <FilterSelectCard
                  filter={filter}
                  addFilter={data => addFilter(data)}
                  focus={focus /* refocus the input after select a filter */}
                  key={index}
                />
              )}
            </div>
          }
        </div>
        
        <button type='submit' className='submit-btn primary-btn'>Étape suivante</button>

      </form>
    </div>
  )
}