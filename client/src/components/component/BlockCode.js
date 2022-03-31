import React, { useEffect, useState } from 'react'

import { Prism as Code } from 'react-syntax-highlighter';
import { vscDarkPlus as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { request as fetch } from '../../controller/request';

export default function BlockCode(props) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  
  const [isLoading, setIsLoading] = useState(true)
  const [contentCopied, setContentCopied] = useState(false)
  
  const [fileContent, setFileContent] = useState()
  const [fileType, setFileType] = useState(props.type)
  const [fileUrl, setFileUrl] = useState(props.url)
  const [filename, setFilename] = useState(props.name)
  const [fileLanguage, setFileLanguage] = useState(getLanguage(props.name))
  
  const [lineNumber, setLineNumber] = useState()
  
  useEffect(() => {
    setIsLoading(true)
    
    const getFileContent = async() => {
      if (props.type === 'file') {
        // Fetch the file content
        const res = await fetch.getFile(props.url)

        /* if (res.status === 400)  */
        
        setFileContent(res)
        setLineNumber(res.match(/^/gm).length)
      }
      setFileType(props.type)
      setFileUrl(props.url)
      setFilename(props.name)
      setFileLanguage(getLanguage(props.name))
      
      setIsLoading(false)
    }
    getFileContent()
    
  }, [props])
  
  if (isLoading) return (<div className='loading'>Chargement du fichier...</div>)
  
  return (
    <div className='block-code'>
      <p className='section-title'>
        {filename}
        {fileType === 'file' && <span> - {lineNumber} ligne{lineNumber > 1 ? 's' : ''}</span>}
        <span> - 1.3kb</span>
      </p>
      
      {/* <CopyToClipboard text={fileContent}
        onCopy={() => setContentCopied(true)}>
        <button>Copy</button>
        { contentCopied && <span>Copié !</span> }
      </CopyToClipboard> */}
      
      { 
        fileType === 'image' ?
          <div className='img-container'>
            <img src={backendUrl + fileUrl} alt={filename} />
          </div>
        :
          <Code
            language={fileLanguage}
            style={theme}
            showLineNumbers={true}
          >
            {fileContent}
          </Code>
      }
    </div>
  )
}

function getLanguage(filename) {
  // Return the file's language
  const elements = filename.split('.')
  return elements[elements.length - 1]
}