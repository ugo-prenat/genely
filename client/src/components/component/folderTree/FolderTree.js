import React from 'react'
import Folder from './Folder';
import File from './File';

export default function FolderTree(props) {
  const tree = props.tree
  
  const displayFile = url => {
    const type = url.split('/')[2]
    props.setFileProps(type, url)
  }
  
  
  return (
    <div className='folder-tree'>
      {
        tree.map((item, index) => {
          const type = item.type
          return(
            type === 'file' ?
              <File
                file={item}
                displayFile={url => displayFile(url)}
                key={index}
              />
            :
              <Folder
                folder={item}
                displayFile={url => displayFile(url)}
                key={index}
              />
          )
        })
      }
    </div>
  )
}