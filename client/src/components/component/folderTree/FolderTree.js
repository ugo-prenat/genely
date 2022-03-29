import React, { useState, useEffect } from 'react'
import Folder from './Folder';
import File from './File';

import FolderIcon from '../../../assets/svg/Folder';
import FileIcon from '../../../assets/svg/File';

export default function FolderTree(props) {
  const [folderNumber, setFolderNumber] = useState(0)
  const [fileNumber, setFileNumber] = useState()
  const tree = props.tree
  console.log(folderNumber);
  
  useEffect(() => {
    tree.map(item => item.type === 'folder' && getFolderNumber(item))
    
    //setFileNumber(getFileNumber(tree))
  }, [])
  
  const getFolderNumber = folder => {
    console.log(folder);
    if (folder.type === 'folder') {
      folder.children.forEach(item => {
        if (item.type === 'folder') {
          setFolderNumber(folderNumber + 1)
          getFolderNumber(item)
        }
      }) 
    }
  }
  
  
  const displayFile = (url, name) => {
    const type = url.split('/')[2]
    props.setFileProps(type, url, name)
  }
  
  return (
    <div className='folder-tree'>
      <p className='section-title'>
        <span>4 <FolderIcon /> - 13 <FileIcon/></span>
      </p>
      {
        tree.map((item, index) => {
          const type = item.type
          return(
            type === 'file' ?
              <File
                file={item}
                displayFile={(url, name) => displayFile(url, name)}
                key={index}
              />
            :
              <Folder
                folder={item}
                displayFile={(url, name) => displayFile(url, name)}
                key={index}
              />
          )
        })
      }
    </div>
  )
}