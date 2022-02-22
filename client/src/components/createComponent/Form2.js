import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'

import Files from '../../assets/svg/Files';

export function Form2() {
  const { register, handleSubmit, setError } = useForm();
  const [filesLength, setFilesLength] = useState()
  
  const wrapperRef = useRef(null);

  const onSelectFolder = e => {
    const newFiles = e.target.files
    
    // Don't take node_modules folder and .env file
    const files = Array.from(newFiles).filter(file => 
      !file.webkitRelativePath.includes('/node_modules/') ||
      !file.webkitRelativePath.includes('/.env')
    )
    
    
    
    /*
    
      TODO
    
      dégager les node_modules et les fichier .env
      set error si pas de fichier fourni
      
    */
    
    
    
    
    
    console.log(files);
    setFilesLength(files.length)
  }
  
  const onSubmit = data => {
    console.log(data);
    /* NE PAS PRENDRE LES NODE_MODULES */
  }
  
  return (
    <div className='step-form-container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <p className='form-title'>Ajoutez votre code</p>
        
        <div
          ref={wrapperRef}
          className="drop-file-input"
          onDragEnter={() => wrapperRef.current.classList.add('dragover')}
          onDragLeave={() => wrapperRef.current.classList.remove('dragover')}
          onDrop={() => wrapperRef.current.classList.remove('dragover')}
        >
          <label>
              <Files />
              <p>Sélectionnez vos fichiers</p>
          </label>
          <input
            {...register('files')}
            type='file'
            webkitdirectory=''
            directory=''
            onChange={onSelectFolder}
          />
      </div>
      
      <div className='files-data'>
        <p>
          { filesLength ? `${filesLength} fichier${filesLength > 1 ? 's' : ''} ajouté${filesLength > 1 ? 's' : ''}` : 'En attente de fichiers...' }
        </p>
      </div>
      
      <button type='submit' className='submit-btn primary-btn'>Étape suivante</button>
      
      </form>
    </div>
  )
}