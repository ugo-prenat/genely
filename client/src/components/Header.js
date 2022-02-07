import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import '../styles/header.scss'

export default function Header() {
  const [isAuth, setIsAuth] = useState(true);
  const [showDropdown, setShowDropdown] = useState(true);
  
  const tempUsername = 'ougo'
  const tempPP = 'https://rocket-league.com/content/media/users/avatar/600px/5d587182eb1640995184.png'
  
  return <div className='header'>
    <Link to='/'>
      <h1>Genely</h1>  
    </Link>
    
    {
      isAuth ?
      <div>
        <Link to='/new-component'>
          <p className='second-btn'>+ nouveau composant</p>
        </Link>
        <Link to={tempUsername}>
          <div className='pp-container' onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
            <img src={tempPP} alt='Profil' />
          </div>
        </Link>
        { showDropdown && <Dropdown username={tempUsername} /> }
      </div>
      :
      <div>pas auth</div>
    }
    
  </div>;
}

function Dropdown(props) {
  return <div className='dropdown'>
    <Link to={props.username}>Profil</Link>
    <Link to='/settings'>Paramètres</Link>
    <Link to='/about'>A propos</Link>
    <Link to='/'>Déconnexion</Link>
  </div>
}