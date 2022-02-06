import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Component() {
  // Get username and component name form url
  const { username, component } = useParams()
  
  useEffect(() => {
    // Setup tab title
    document.title = `${username} / ${component}`
  }, [username, component])
  
  
  return <div>
    <p>Page composant</p>
    <p>/ {username} / {component}</p>
  </div>;
}
