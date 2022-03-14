import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { request as fetch } from '../../controller/request';

import BlockCode from '../component/BlockCode';

export default function Component() {
  // Get username and component name form url
  const { username, component } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  
  const [fileUrl, setFileUrl] = useState('/uploads/file/1647201750846/Header.jsx')
  const [fileType, setFileType] = useState('file')
  
  useEffect(() => {
    // Setup tab title
    document.title = `${username} / ${component} - Genely`
    
    
    setIsLoading(false)
  
    
  }, [username, component])
  
  if (isLoading) return(<div className='loading'>Chargement du composant...</div>)
  
  return <div className='main-component'>
    <p>Page composant</p>
    <p>/ {username} / {component}</p>
    
    <div className='files'>
      <p onClick={() => {setFileType('file');setFileUrl('/uploads/file/1647201750846/Header.jsx')}}>Header.jsx</p>
      <p onClick={() => {setFileType('img');setFileUrl('http://localhost:4000/uploads/image/1647203823125/js.png')}}>js.png</p>
    </div>
    
    <BlockCode type={fileType} url={fileUrl} />

  </div>;
}
