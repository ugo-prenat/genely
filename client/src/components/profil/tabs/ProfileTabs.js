import React, { useState, useEffect } from 'react'

export default function ProfileTabs(props) {
  const [activeTab, setActiveTab] = useState(props.activeTab)
  const isUserProfile = props.isUserProfile
  
  useEffect(() => setActiveTab(props.activeTab), [props])
  
  return (
    <div className='tabs-container'>
      <p
        className={activeTab === 'personal' ? 'active' : ''}
        onClick={() => props.setActiveTab('personal')}
      >
        {
          isUserProfile ?
            'Mes composants'
          :
            'Composants'
        }
      </p>
      
      <p
        className={activeTab === 'liked' ? 'active' : ''}
        onClick={() => props.setActiveTab('liked')}
      >
        Favoris
      </p>
    </div>
  )
}