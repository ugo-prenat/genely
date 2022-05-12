import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Settings from '../../assets/svg/Settings'
import Edit from '../../assets/svg/Edit'

import { request } from '../../controller/request'


export default function ProfileData(props) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  
  useEffect(() => getUser(), [])
  
  const getUser = async() => {
    const res = await request.get(`/users/${props.username}`)
  
    if (res.status === 404) navigate(`/${props.username}/404`)
    
    setUser(res.user)
    setIsLoading(false)
  }
  
  const getCreatedComponentsNb = () => {
    return user.publicComponents + user.privateComponents
  }
  
  
  if (isLoading) return <p>Skeleton</p>
  
  
  return (
    <div className='profile-data'>
      <div className='left-part'>
        <div className='profile-picture'>
          <img src={/* backendUrl + */ user.avatarUrl} alt='profile picture' />
        </div>
        
        <div className='data'>
          <p className='fullname'>{ user.fullname }</p>
          <p>{ user.username }</p>
          <p>{ user.email }</p>
        </div>
      </div>
      
      <div className='right-part'>
        <div className='btns'>
          <span><a href={`${props.username}/settings`}><Settings /></a></span>
        </div>
        
        <div>
          <p>Membre depuis le { getDate(user.createdAt) }</p>
          <p>{ getCreatedComponentsNb() } composant{ getCreatedComponentsNb() > 1 ? 's' : '' } créés</p>
        </div>
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