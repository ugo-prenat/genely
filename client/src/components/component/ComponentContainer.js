import React, { useState } from 'react'
import BlockCode from '../component/BlockCode';

export default function ComponentContainer(props) {
  const component = props.component
  console.log(component);
  
  const [fileUrl, setFileUrl] = useState('/uploads/file/1647201750846/Header.jsx')
  const [fileType, setFileType] = useState('file')
  
  return (
    <div>
      <div className='files'>
        <p onClick={() => {setFileType('file');setFileUrl('/uploads/file/1647201750846/Header.jsx')}}>Header.jsx</p>
        <p onClick={() => {setFileType('img');setFileUrl('http://localhost:4000/uploads/image/1647203823125/js.png')}}>js.png</p>
      </div>
    
      <BlockCode type={fileType} url={fileUrl} />
    </div>
  )
}