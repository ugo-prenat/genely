import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Path from '../Path';


export default function EditProfile(props) {
  const { username } = useParams()
  const user = props.user
  const isUserProfile = props.isAuth && user.username === username
  
  const navigate = useNavigate()
  
  useEffect(() => {
    // Setup tab title
    document.title = 'Genely - modifié votre profil'
    
    if (!isUserProfile) navigate(`/${username}`)
    
  }, [])
  
  return <div className='main-component'>
    <Path path={[
      { 'name': username, 'link': `/${username}` },
      { 'name': 'paramètres', 'link': `/edit` }
    ]} />
    
    <p className='loading'>WIP</p>
  </div>;
}
