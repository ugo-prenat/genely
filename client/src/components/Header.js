import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import Logout from '../assets/svg/Logout';
import Profil from '../assets/svg/Profil';
import Settings from '../assets/svg/Settings';
import Question from '../assets/svg/Question';

import '../styles/header.scss'

export default function Header() {
  const [isAuth, setIsAuth] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const tempUsername = 'ougo'
  const tempPP = 'https://rocket-league.com/content/media/users/avatar/600px/5d587182eb1640995184.png'
  
  return <div className='header'>
    <Link to='/'>
      <h1>Genely</h1>  
    </Link>
    
    {
      isAuth ?
      <div className='right-part'>
        <Link to='/new-component'>
          <p className='second-btn'>+ nouveau composant</p>
        </Link>
        <div className='pp-container' onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
          <Link to={tempUsername}>
            <img src={tempPP} alt='Profil' />
          </Link>
          { showDropdown && <Dropdown username={tempUsername} hideDropdown={() => setShowDropdown(false)} /> }
        </div>
      </div>
      :
      <div>pas auth</div>
    }
    
  </div>;
}

function Dropdown(props) {
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
    <Link to='/' onClick={() => props.hideDropdown()}>
      <Logout />
      Déconnexion
    </Link>
  </div>
}