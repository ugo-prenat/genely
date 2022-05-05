import React, { useEffect } from 'react';

import Path from '../Path';


export default function Settings(props) {
  const username = props.user.username
  
  useEffect(() => {
    // Setup tab title
    document.title = 'Genely - Paramètres'
  }, [])
  
  return <div className='main-component'>
    <Path path={[
      { 'name': username, 'link': `/${username}` },
      { 'name': 'settings', 'link': `/settings` }
    ]} />
    
    <p className='loading'>WIP</p>
  </div>;
}
