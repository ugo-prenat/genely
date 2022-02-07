import React, { useEffect } from 'react';

export default function PageNotFound() {
  useEffect(() => {
    // Setup tab title
    document.title = 'Genely - Page introuvable'
  }, [])
  
  return <div className='main-component'>
    404
  </div>;
}
