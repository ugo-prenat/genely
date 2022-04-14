import React from 'react'
import FileIcon from '../../../assets/svg/File'

export default function File(props) {
  const file = props.file
  
  return (
    <li onClick={() => props.displayFile(file.url, file.name)}>
      <p>
        <FileIcon />     
        {file.name}
      </p>
    </li>
  )
}