import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Profil() {
  // Get username from url
  const { username } = useParams()
  
  useEffect(() => {
    // Setup tab title
    document.title = `Profil de ${username}`
  }, [username])
  
  return <div>
    <p>Page profil</p>
    <p>Profil de {username}</p>
  </div>;
}
