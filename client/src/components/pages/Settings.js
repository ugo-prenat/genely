import React, { useEffect } from 'react';

export default function Settings() {
  useEffect(() => {
    // Setup tab title
    document.title = 'Genely - Paramètres'
  }, [])
  
  return <div className='main-component'>
    Paramètre du profil
  </div>;
}
