import React from 'react'

import File from './File';
import FolderIcon from '../../../assets/svg/Folder'

export default function Folder(props) {
  const folder = props.folder
  
  return (
    <div className='folder'>
      <div className='data'>
        <FolderIcon />
        <p>{ folder.name }</p>
      </div>
      
      <div className='children'>
        { folder.children.map((item, index) => {
          const type = item.type
          return(
            type === 'file' ?
              <File
                file={item}
                displayFile={url => props.displayFile(url)}
                key={index}
              />
            :
              <Folder
                folder={item}
                displayFile={url => props.displayFile(url)}
                key={index}
              />
          )
        }) }
      </div>
    </div>
  )
}