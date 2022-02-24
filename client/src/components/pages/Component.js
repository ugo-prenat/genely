import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Prism as Code } from 'react-syntax-highlighter';


import { vscDarkPlus as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Component() {
  // Get username and component name form url
  const { username, component } = useParams()
  
  useEffect(() => {
    // Setup tab title
    document.title = `${username} / ${component}`
  }, [username, component])
  
  const code = `
    import React from 'react'

    import Lock from '../../assets/svg/Lock'
    import Globe from '../../assets/svg/Globe'
    
    export default function ComponentVisibility(props) {
      const visibility = props.visibility
    
      return (
        <div>
          <div className='radio-input'>
              <input
                type='radio'
                name='visibility'
                id='public'
                value='public'
                checked={visibility === 'public'}
                onChange={() => props.setVisibility('public')}
              />
            <label htmlFor='public'>
              <Globe />
              <div className='data'>
                <p className='title'>Public</p>
                <p className='description'>N'importe qui peut voir ce composant</p>
              </div>
              <span className='checkmark'></span>
            </label>
          </div>
          
          <div className='radio-input'>
              <input
                type='radio'
                name='visibility'
                id='private'
                value='private'
                checked={visibility === 'private'}
                onChange={() => props.setVisibility('private')}
              />
            <label htmlFor='private'>
              <Lock />
              <div className='data'>
                <p className='title'>Privé</p>
                <p className='description'>Vous seul pouvez voir ce composant</p>
              </div>
              <span className='checkmark'></span>
            </label>
          </div>
        </div>
      )
    }
  `
  
  return <div className='main-component'>
    <p>Page composant</p>
    <p>/ {username} / {component}</p>
    <div>
      <Code
        customStyle={{
          background: '#1B1F2E',
          border: '1px solid #555C76',
          borderRadius: '7px'
        }}
        language='jsx'
        style={theme}
      >
        {code}
      </Code>
    </div>
  </div>;
}
