import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CreateComponent(props) {
  const isAuth = props.isAuth
  
  useEffect(() => {
    // Setup tab title
    document.title = 'Nouveau composant'
    
    console.log('auth :', isAuth);
  }, [])
  
  return <div className='main-component'>
    {  
      isAuth ?
        <p>Créer composant</p>
        :
        <p>Non connecté <Link to={'/login'}>Connectez-vous</Link></p>
    }
  </div>;
}
