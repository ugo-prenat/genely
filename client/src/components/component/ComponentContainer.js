import React, { useState } from 'react'

import BlockCode from '../component/BlockCode';
import FolderTree from './folderTree/FolderTree';

export default function ComponentContainer(props) {
  const component = props.component
  const firstFile = component.tree[0]
  
  const [fileUrl, setFileUrl] = useState(firstFile.url)
  const [fileType, setFileType] = useState(firstFile.type)
  
  const setFileProps = (type, url) => {
    setFileType(type)
    setFileUrl(url)
  }
  
  
  return (
    <div className='component-container'>
      <FolderTree tree={component.tree} setFileProps={(type, url) => setFileProps(type, url)} />
      
      <BlockCode type={fileType} url={fileUrl} />
    </div>
  )
}