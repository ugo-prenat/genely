import React, { useEffect, useState } from 'react'

import { Prism as Code } from 'react-syntax-highlighter';
import { vscDarkPlus as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Clipboard from './../../assets/svg/Clipboard'
import Check from './../../assets/svg/Check'

import { request as fetch } from './../../controller/request';


export default function BlockCode(props) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  
  const [isLoading, setIsLoading] = useState(true)
  const [fileNotFound, setFileNotFound] = useState(false)
  const [contentCopied, setContentCopied] = useState(false)
  
  const [fileContent, setFileContent] = useState()
  const [fileType, setFileType] = useState(props.type)
  const [fileUrl, setFileUrl] = useState(props.url)
  const [filename, setFilename] = useState(props.name)
  const [fileLanguage, setFileLanguage] = useState(getLanguage(props.name))
  
  const [lineNumber, setLineNumber] = useState()
  
  useEffect(() => {
    setIsLoading(true)
    setFileNotFound(false)
    
    const getFileContent = async() => {
      if (props.type === 'file') {
        // Fetch the file content
        const res = await fetch.getFile(props.url)
        
        if (res === 'error') setFileNotFound(true)
        
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
  
  const handleCopy = () => {
    setContentCopied(true)
    setTimeout(() => {
      setContentCopied(false)
    }, 2000);
  }
  
  
  if (isLoading) return (<div className='loading'>Chargement du fichier...</div>)
  if (fileNotFound) return (<div className='loading'>Ce fichier n'est pas disponible</div>)
  
  return (
    <div className='block-code'>
      <p className='section-title'>
        {filename}
        {fileType === 'file' && <span>{lineNumber} ligne{lineNumber > 1 ? 's' : ''}</span>}
      </p>
      
      { 
        fileType === 'image' ?
          <div className='img-container'>
            <img src={backendUrl + fileUrl} alt={filename} />
          </div>
        :
          <div className='code-container'>
            <Code
              language={fileLanguage}
              style={theme}
              showLineNumbers={true}
            >
              {fileContent}
            </Code>
          
            <CopyToClipboard text={fileContent} onCopy={handleCopy}>
              { contentCopied ?
                <span className='copy-btn copied'><Check /></span> : 
                <span className='copy-btn not-copied'><Clipboard /></span>
              }
            </CopyToClipboard>
          </div>
      }
    </div>
  )
}

function getLanguage(filename) {
  // Return the file's language
  const elements = filename.split('.')
  return elements[elements.length - 1]
}