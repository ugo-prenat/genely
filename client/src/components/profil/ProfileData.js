import React, { useState, useEffect } from 'react'

import Settings from '../../assets/svg/Settings'
import Edit from '../../assets/svg/Edit'

import { request } from '../../controller/request'


export default function ProfileData(props) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => getUser(), [])
  
  const getUser = async() => {
    const res = await request.get(`/users/${props.username}`)
    
    setUser(res.user)
    setIsLoading(false)
  }
  
  const getCreatedComponentsNb = () => {
    return user.publicComponents + user.privateComponents
  }
  
  
  if (isLoading) return <p>Skeleton</p>
  
  
  return (
    <div className='profile-data'>
      <div className='profile-wrapper'>
        <div className='profile-picture'>
          <img src={/* backendUrl + */ user.avatarUrl} alt='profile picture' />
        </div>
        <div className='data'>
          <p>{ user.fullname }</p>
          <p>{ user.username }</p>
          <p>{ user.email }</p>
        </div>
        <div>
          <p>Membre depuis le { getDate(user.createdAt) }</p>
          <p>{ getCreatedComponentsNb() } composant{ getCreatedComponentsNb() > 1 ? 's' : '' } créés</p>
        </div>
      </div>
      
      <div className='btns'>
        <span><Edit /> Modifier</span>
        <span><a href='/settings'><Settings /> Paramètres</a></span>
      </div>
    </div>
  )
}

function getDate(d) {
  // Return a good formated date
  const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  const date = new Date(d)
  const month = months[date.getMonth()]
  
  return `${date.getDate()} ${month} ${date.getFullYear()}`
}