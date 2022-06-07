import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import Logout from '../assets/svg/Logout';
import Profil from '../assets/svg/Profil';
import Settings from '../assets/svg/Settings';
import Question from '../assets/svg/Question';

import '../styles/header.scss'
import logo from '../assets/img/logo192.png'


export default function Header(props) {
  const navigate = useNavigate()
  const isAuth = props.isAuth
  
  const user = props.user
  const [avatarUrl, setAvatarUrl] = useState(props.user?.avatarUrl)
  const [showDropdown, setShowDropdown] = useState(false);
  
  props.render.current = url => setAvatarUrl(url)
  
  const disconnection = () => {
    setShowDropdown(false)
    
    localStorage.clear()
    navigate('/login')
    window.location.reload(false);
  }
  
  return <div className='header-component'>
    <Link to='/'>
      <h1>Genely</h1>
    </Link>
    
    {
      isAuth ?
      <div className='right-part'>
        <Link to='/new-component'>
          <p className='secondary-btn'>+ nouveau composant</p>
        </Link>
        
        <div className='pp-container' onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
          <div className='wrapper'>
            <Link to={user.username}>
              <img src={getImgUrl(avatarUrl)} alt='Profil' />
            </Link>
          </div>
          { showDropdown &&
            <Dropdown
              user={user}
              hideDropdown={() => setShowDropdown(false)}
              disconnection={() => disconnection()}
            />
          }
        </div>
        
      </div>
      :
      <div className='btns'>
        <Link to='/login' className='tertiary-btn'>Connexion</Link>
        <Link to='/signup' className='secondary-btn'>Inscription</Link>
      </div>
    }
    
  </div>;
}

function Dropdown(props) {
  const user = props.user
  
  return <div className='dropdown'>
    <div className='links'>
      <Link to={user.username} onClick={() => props.hideDropdown()}>
        <Profil />
        Profil
      </Link>
      <Link to={`${user.username}/settings`} onClick={() => props.hideDropdown()}>
        <Settings />
        Paramètres
      </Link>
      <Link to='/about' onClick={() => props.hideDropdown()}>
        <Question />
        A propos
      </Link>
      <Link to='/' onClick={() => props.disconnection()}>
        <Logout />
        Déconnexion
      </Link>
    </div>
  </div>
}
function getImgUrl(url) {
  // Check if the given image's url is hosted by Genely or not
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return backendUrl + url
}