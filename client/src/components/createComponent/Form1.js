import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import ErrorMsg from '../forms/ErrorMsg';
import ComponentVisibility from './ComponentVisibility';

import { request as fetch } from '../../controller/request'

export function Form1(props) {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const [visibility, setVisibility] = useState('public')
  const [shortname, setShortname] = useState('')
  
  const username = props.username
  
  const onSubmit = data => {
    data.visibility = visibility
    
    const checkNames = async() => {
      // Check if given names are alerady taken
      const res = await fetch.post('/components?step=1', data)

      if (res.status === 200) {
        console.log(res);
      }
      else setError(res.error.input, { type: 'manual', message: res.error.msg })
    }
    checkNames()
  }
  
  
  return (
    <div className='step-form-container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        
      <div className={`${errors.fullname && 'input-group-error'} input-group`}>
          <input
            {...register(
              'fullname',
              { required: 'Champ obligatoire' }
            )}
            type='text'
            autoComplete='off'
          />
          <label>Nom complet du composant</label>
          { errors.fullname && <ErrorMsg msg={errors.fullname.message} /> }          
        </div>
        
        <div className={`${errors.shortname && 'input-group-error'} input-group`}>
          <input
            {...register(
              'shortname',
              {
                required: 'Champ obligatoire',
                validate: {
                  noSpace: value => !/\s/.test(value) || 'Ne peut pas contenir d\'espace',
                  noSpecialChar: value => !/[$&+,:;=?@#|/éçàè'<>.^*()%!]/.test(value) || 'Ne peut pas contenir de caractère spécial'
                }
              }
            )}
            type='text'
            value={shortname}
            onChange={e => setShortname(e.target.value.toLowerCase())}
            autoComplete='off'
          />
          <label>Nom court du composant</label>
          <p className='url-example'>genely.dev/{username}/{shortname}</p>
          { errors.shortname && <ErrorMsg msg={errors.shortname.message} /> }          
        </div>
        
        <div className='separation'><p>visibilité du composant</p></div>
        
        <ComponentVisibility register={register} visibility={visibility} setVisibility={visibility => setVisibility(visibility)} />
        
        <button type='submit' className='submit-btn primary-btn'>Étape suivante</button>
        
      </form>
    </div>
  )
}