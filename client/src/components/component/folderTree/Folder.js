import React from 'react'

import File from './File';
import FolderCloseIcon from '../../../assets/svg/FolderClose'
import { FolderOpen as FolderOpenIcon} from '../../../assets/svg/FolderOpen';

export default function Folder(props) {
  const folder = props.folder
  
  return (
    <li>
      <p><FolderOpenIcon /> {folder.name}</p>
      
      <ul>
        { folder.children.map((item, index) => {
            const type = item.type
            return(
              type === 'file' ?
                <File
                  file={item}
                  displayFile={(url, name) => props.displayFile(url, name)}
                  key={index}
                />
              :
                <Folder
                  folder={item}
                  displayFile={(url, name) => props.displayFile(url, name)}
                  key={index}
                />
            )
        }) }
      </ul>
    </li>
  )
}