import React, { useEffect } from 'react';

import '../../styles/pageNotFound.scss'


export default function PageNotFound() {
  useEffect(() => {
    // Setup tab title
    document.title = 'Genely - Page introuvable'
  }, [])
  
  return <div className='main-component page-not-found-component'>
    <div>
      <p>La page que vous essayez de consulter n'existe pas...</p>
      <a href='/' className='secondary-btn'>Retour au site</a>
    </div>
  </div>;
}
