import React from 'react'

import Lock from '../../assets/svg/Lock'
import Globe from '../../assets/svg/Globe'

export default function ComponentVisibility(props) {
  return (
    <div>
      <div className='radio-input'>
          <input
          {...props.register('visibility')}
            type='radio'
            name='visibility'
            id='public'
            value='public'
            checked
          />
        <label htmlFor='public'>
          <Globe />
          <div className='data'>
            <p className='title'>Public</p>
            <p className='description'>N'importe qui peut voir ce composant</p>
          </div>
          <span className='checkmark'></span>
        </label>
      </div>
      
      <div className='radio-input'>
          <input
          {...props.register('visibility')}
            type='radio'
            name='visibility'
            id='private'
            value='private'
          />
        <label htmlFor='private'>
          <Lock />
          <div className='data'>
            <p className='title'>Privé</p>
            <p className='description'>Vous seul pouvez voir ce composant</p>
          </div>
          <span className='checkmark'></span>
        </label>
      </div>
    </div>
  )
}