import React, { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Setup tab title
    document.title = 'Genely'
  }, [])
  
  return <div className='main-component'>
    Home
  </div>;
}
