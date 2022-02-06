import React, { useEffect, useState } from 'react';

export default function Login() {
  const [showForm, setShowForm] = useState('login');
  
  useEffect(() => {
    // Setup tab title
    document.title = `Genely - ${showForm === 'login' ? 'Connexion' : 'Inscription'}`
  }, [showForm])
  
  return <div>login</div>;
}
