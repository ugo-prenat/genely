import React, { useEffect, useState } from 'react';

export default function Login() {
  const [showForm, setShowForm] = useState('login');
  
  useEffect(() => {
    // Setup tab title
    document.title = 'Genely - Connection'
  }, [showForm])
  
  return <div className='main-component'>
    login
  </div>;
}
