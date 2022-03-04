import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'

import ErrorMsg from '../forms/ErrorMsg'
import FilterCard from './FilterCard';
import FilterSelectCard from './FilterSelectCard';

export function Form3(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isMouseOnFiltersList, setIsMouseOnFiltersList] = useState(false)
  const [showFiltersList, setShowFiltersList] = useState(false)
  const [filters, setfilters] = useState([])
  const [value, setValue] = useState('')
  
  const allFilters = props.filters
  const [allFiltersList, setAllFiltersList] = useState(allFilters)
  
  const inputRef = useRef(null)
  
  const onSubmit = () => props.nextStep(4, filters)
    
  const updateFiltersList = value => {
    // Search filter system
    setAllFiltersList(
      allFiltersList.filter(filter => 
        filter.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      )
    )
    setValue(value)
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
        
        <div className='filters-list'>
          { filters.length === 0 && <p className='empty-filters-list'>+ ajouter un filtre</p> }
          { filters.map((filter, index) =>
            <FilterCard
              filter={filter}
              deleteFilter={() => deleteFilter(filter)}
              key={index}
            />
          )}
        </div>
        
        <div className={`${errors.filters && 'input-group-error'} input-group`}>
          <input
            {...register(
              'filters',
              { required: 'Champ obligatoire' }
            )}
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
        <button type='submit' className='submit-btn primary-btn'>Créer le composant</button>
        
      </form>
    </div>
  )
}