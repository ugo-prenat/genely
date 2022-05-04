import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ProfileData from '../profil/ProfileData';

import '../../styles/profile.scss'


export default function Profile(props) {
  // Get username from url
  const { username } = useParams()
  
  useEffect(() => {
    // Setup tab title
    document.title = `Profil de ${username}`
  }, [username])
  
  return <div className='main-component profile-component'>
    <ProfileData user={props.user} />
  </div>
}
