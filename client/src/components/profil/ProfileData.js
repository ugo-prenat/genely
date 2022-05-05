import React from 'react'

import Settings from '../../assets/svg/Settings'
import Edit from '../../assets/svg/Edit'


export default function profileData(props) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  const user = props.user
  
  return (
    <div className='profile-wrapper'>
      <div className='profile-data'>
        <div className='profile-picture'>
          <img src={/* backendUrl + */ user.avatarUrl} alt='profile picture' />
        </div>
        <div className='data'>
          <p>{ user.fullname }</p>
          <p>{ user.username }</p>
          <p>{ user.email }</p>
        </div>
      </div>
      
      <div className='btns'>
        <span className='tertiary-btn'><Settings /> Paramètres</span>
        <span className='tertiary-btn'><Edit /> Modifier</span>
      </div>
    </div>
  )
}