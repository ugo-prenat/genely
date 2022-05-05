import React, { useState, useEffect } from 'react'

export default function ProfileTabs(props) {
  const [activeTab, setActiveTab] = useState(props.activeTab)
  
  useEffect(() => setActiveTab(props.activeTab), [props])
  
  return (
    <div className='tabs-container'>
      <p
        className={activeTab === 'personal' ? 'active' : ''}
        onClick={() => props.setActiveTab('personal')}
      >
        Mes composants
      </p>
      
      <p
        className={activeTab === 'liked' ? 'active' : ''}
        onClick={() => props.setActiveTab('liked')}
      >
        Aimés
      </p>
    </div>
  )
}