import React, { useEffect } from 'react';

export default function Signup() {
  useEffect(() => {
    // Setup tab title
    document.title = 'Genely - Inscription'
  }, [])
  
  return <div className='main-component'>
    Signup
  </div>;
}
