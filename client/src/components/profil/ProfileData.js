import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Settings from '../../assets/svg/Settings'

import { request } from '../../controller/request'


export default function ProfileData(props) {
  const { username } = useParams()
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const isUserProfile = props.isUserProfile
  
  const navigate = useNavigate()
  
  useEffect(() => getUser(), [username])
  
  const getUser = async() => {
    console.log('get user called');
    setIsLoading(true)
    const res = await request.get(`/users/${props.username}`)
  
    if (res.status === 404) navigate(`/${props.username}/404`)
    
    setUser(res.user)
    setIsLoading(false)
  }
  
  const getCreatedComponentsNb = () => {
    if (isUserProfile) return user.publicComponents + user.privateComponents
    return user.publicComponents
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
          { isUserProfile && <p>{ user.email }</p> }
        </div>
      </div>
      
      <div className='right-part'>
        { isUserProfile &&
          <div className='btns'>
            <span><a href={`${props.username}/settings`}><Settings /> modifier</a></span>
          </div>
        }
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