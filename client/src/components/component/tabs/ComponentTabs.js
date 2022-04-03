import React, { useState, useEffect } from 'react'


export default function ComponentTabs(props) {
  const [activeTab, setActiveTab] = useState(props.activeTab)
  
  useEffect(() => setActiveTab(props.activeTab), [props])
  
  return (
    <div className='tabs-container'>
      <p
        className={activeTab === 'overview' ? 'active' : ''}
        onClick={() => props.setActiveTab('overview')}
      >
        Vue d'ensemble
      </p>
      
      <p
        className={activeTab === 'code' ? 'active' : ''}
        onClick={() => props.setActiveTab('code')}
      >
        Code
      </p>
      
      <p
        className={activeTab === 'illustrations' ? 'active' : ''}
        onClick={() => props.setActiveTab('illustrations')}
      >
        Aperçus
      </p>
    </div>
  )
}