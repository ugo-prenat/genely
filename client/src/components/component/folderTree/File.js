import React from 'react'
import FileIcon from '../../../assets/svg/File'

export default function File(props) {
  const file = props.file
  
  return (
    <div>
      <div className='file' onClick={() => props.displayFile(file.url, file.name)} >
        <FileIcon />
        <p>{ file.name }</p>
      </div>
    </div>
  )
}