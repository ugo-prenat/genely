import { useState } from 'react';

import './styles/index.scss'

import { Github } from './assets/svg/Github';

function App() {
  const [showHelp, setShowHelp] = useState(false)
  
  
  return (
    <div className="App">
        {
          showHelp ?
            <div className='container'>
              <h1>Genely</h1>
              <div className='description'>
                <p>
                Pour le développement de leurs applications, il arrive souvent aux développeurs d’utiliser des composants déjà créés lors de précédents projets. L’objectif de Genely est d’offrir à ces développeurs la possibilité de sauvegarder et de partager ces composants génériques et réutilisables pour le développement de leurs futures applications.
                </p>
              </div>
              
              
              <div className='footer'>
                <p>Plateforme développée grâce à la stack MERN</p>
                <p className='techs'>React, Node.js, Express, MongoDB</p>
              </div>
              
              <p onClick={() => setShowHelp(false)} className='link'>J'ai compris</p>
            </div>
          :
            <div className='container'>
              <h1>Genely</h1>
              <p>La plateforme est en cours de développement...</p>
              <p onClick={() => setShowHelp(true)} className='link'>C'est quoi Genely ?</p>
          </div>
        }
        
      <a href='https://github.com/ugo-prenat/genely/tree/dev' className='github-link'>
        <Github />
      </a>
    </div>
  );
}

export default App;
