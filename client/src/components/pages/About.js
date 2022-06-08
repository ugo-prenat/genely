import React, { useEffect } from 'react';
import GitHub from '../../assets/svg/GitHub'

import '../../styles/about.scss'
import logo from '../../assets/img/logo512.png'


export default function About() {
  useEffect(() => {
    // Setup tab title
    document.title = 'Genely - A propos'
  }, [])
  
  return <div className='main-component about-page-component'>
    <img src={logo} alt='logo' />
    <h1>Genely</h1>
    <p>Pour le développement de leurs applications, il arrive souvent aux développeurs d’utiliser des composants déjà créés lors de précédents projets. L’objectif de Genely est d’offrir à ces développeurs la possibilité de sauvegarder et de partager ces composants génériques et réutilisables pour le développement de leurs futures applications.</p>
    <span className='github-icon'>
      <a href='https://github.com/ugo-prenat/genely' target='_blank' rel='noreferrer'>
        <GitHub />
      </a>
    </span>
  </div>;
}
