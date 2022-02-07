import React, { useEffect } from 'react';

export default function CreateComponent() {
  useEffect(() => {
    // Setup tab title
    document.title = 'Nouveau composant'
  }, [])
  
  return <div className='main-component'>
    nouveau composant
  </div>;
}
