import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import ProfileData from '../profil/ProfileData';
import ProfileTabs from '../profil/tabs/ProfileTabs';
import ComponentsList from '../profil/ComponentsList';

import '../../styles/profile.scss'


export default function Profile(props) {
  // Get username from url
  const { username } = useParams()
  const isUserProfile = props.isAuth && props.myUsername === username
  
  const [activeTab, setActiveTab] = useState('personal')
  const reloadList = useRef(null)
  
  
  useEffect(() => {
    // Setup tab title
    document.title = `Profil de ${username} - Genely`
  }, [username])
  
  const loadTab = async tab => {
    // Load new components list
    setActiveTab(tab)
    reloadList.current(tab)
  }
  
  return <div className='main-component profile-component'>
    <ProfileData username={username} isUserProfile={isUserProfile} />
    
    <div className='profile-bottom-part'>
      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={tab => loadTab(tab)}
      />
      <ComponentsList
        username={username}
        isUserProfile={isUserProfile}
        reloadList={reloadList}
      />
    </div>
  </div>
}
