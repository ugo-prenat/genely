import React from 'react'

import Lock from '../../assets/svg/Lock'
import Globe from '../../assets/svg/Globe'

export default function ComponentVisibility(props) {
  const visibility = props.visibility

  return (
    <div>
      <div className='radio-input'>
          <input
            type='radio'
            name='visibility'
            id='public'
            value='public'
            checked={visibility === 'public'}
            onChange={() => props.setVisibility('public')}
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
            type='radio'
            name='visibility'
            id='private'
            value='private'
            checked={visibility === 'private'}
            onChange={() => props.setVisibility('private')}
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