import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'

import Files from '../../assets/svg/Files';

export function Form2() {
  const { register, handleSubmit, getValues } = useForm();
  //const [fileList, setFileList] = useState([]);
  
  const wrapperRef = useRef(null);

  const onDragEnter = () => wrapperRef.current.classList.add('dragover');
  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
  const onDrop = () => wrapperRef.current.classList.remove('dragover');

  
  const onSubmit = data => {
    console.log(data);
    /* NE PAS PRENDRE LES NODE_MODULES */
  }
  
  return (
    <div className='step-form-container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <p className='form-title'>Ajoutez votre code</p>
        
        <div className='drop-file-input'>
          <label>
              <Files />
              <p>Sélectionnez vos fichiers</p>
          </label>
          <input
            {...register('files')}
            type='file'
            webkitdirectory=''
            directory=''
          />
      </div>
      
      <div className='files-data'>
        <p>Des stats</p>
      </div>
      
      <button type='submit' className='submit-btn primary-btn'>Étape suivante</button>
      
      </form>
    </div>
  )
}