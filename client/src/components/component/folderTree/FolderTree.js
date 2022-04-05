import React from 'react'
import Folder from './Folder';
import File from './File';


export default function FolderTree(props) {
  const tree = props.tree
  
  const displayFile = (url, name) => {
    const type = url.split('/')[2]
    props.setFileProps(type, url, name)
  }
  
  return (
    <div className='folder-tree'>
      {<p className='section-title'>Fichiers</p>}
      
      <ul>
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
      </ul>
    </div>
  )
}