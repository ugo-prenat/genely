import React, { useEffect } from 'react';

import Path from '../Path';


export default function EditProfile(props) {
  const username = props.user.username
  
  useEffect(() => {
    // Setup tab title
    document.title = 'Genely - Paramètres'
  }, [])
  
  return <div className='main-component'>
    <Path path={[
      { 'name': username, 'link': `/${username}` },
      { 'name': 'paramètres', 'link': `/edit` }
    ]} />
    
    <p className='loading'>WIP</p>
  </div>;
}
