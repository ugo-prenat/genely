import React, { useState } from 'react'

import BlockCode from './BlockCode';
import FolderTree from '../folderTree/FolderTree';

export default function ComponentCode(props) {
  const component = props.component
  const firstFile = component.tree[0]
  
  const [fileUrl, setFileUrl] = useState(firstFile.url)
  const [fileType, setFileType] = useState(firstFile.url.split('/')[2])
  const [filename, setfilename] = useState(firstFile.name)
  
  const setFileProps = (type, url, name) => {
    setFileType(type)
    setFileUrl(url)
    setfilename(name)
  }
  
  
  return (
    <div className='component-code tab'>
      <FolderTree tree={component.tree} setFileProps={(type, url, name) => setFileProps(type, url, name)} />
      
      <BlockCode type={fileType} url={fileUrl} name={filename} />
    </div>
  )
}