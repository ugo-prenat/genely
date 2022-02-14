import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import Logout from '../assets/svg/Logout';
import Profil from '../assets/svg/Profil';
import Settings from '../assets/svg/Settings';
import Question from '../assets/svg/Question';

import { request as fetch } from '../controller/request'

import '../styles/header.scss'

export default function Header(props) {
  const navigate = useNavigate()
  const isAuth = props.isAuth
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(isAuth)
  const [user, setUser] = useState()
  
  useEffect(() => {
    // Get user
    const getUser = async() => {
      const res = await fetch.get('/auth/')
      setUser(res.user)
      //setIsLoading(false)
    }
    getUser()
    
  }, [isAuth])
  
  const disconnection = () => {
    setShowDropdown(false)
    
    localStorage.clear()
    navigate('/login')
    window.location.reload(false);
  }
  
  return <div className='header'>
    <Link to='/'>
      <h1>Genely</h1>  
    </Link>
    
    {
      isAuth ?
      <div className='right-part'>
        <Link to='/new-component'>
          <p className='secondary-btn'>+ nouveau composant</p>
        </Link>
        {
          isLoading ? <div className='pp-container skeleton-loading'></div>
          :
          <div className='pp-container' onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
            <Link to={user.username}>
              <img src={user.avatarUrl} alt='Profil' />
            </Link>
            { showDropdown &&
              <Dropdown
                isLoading={isLoading}
                username={user.username}
                hideDropdown={() => setShowDropdown(false)}
                disconnection={() => disconnection()}
              />
            }
          </div>
        }
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
  const isLoading = props.isLoading
  
  if (isLoading) return( <div className='loading'>Chargement</div> )
  
  return <div className='dropdown'>
    <Link to={props.username} onClick={() => props.hideDropdown()}>
      <Profil />
      Profil
    </Link>
    <Link to='/settings' onClick={() => props.hideDropdown()}>
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
}