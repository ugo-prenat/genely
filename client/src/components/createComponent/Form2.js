import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'

import Files from '../../assets/svg/Files';
import ErrorMsg from '../forms/ErrorMsg'

import { fileReader } from '../../controller/fileReader';

export function Form2(props) {
  const { register, handleSubmit } = useForm();
  
  const [filesLength, setFilesLength] = useState(0)
  const [files, setFiles] = useState()
  
  const [ignoreNodeModules, setIgnoreNodeModules] = useState(false)
  const [ignoreEnvFile, setIgnoreEnvFile] = useState(false)
  const [ignoreDsStoreFile, setIgnoreDsStoreFile] = useState(false)
  const [error, setError] = useState()
  
  const wrapperRef = useRef(null);

  const onSelectFolder = async(e) => {
    const newFiles = e.target.files
    
    setIgnoreNodeModules(false)    
    setIgnoreDsStoreFile(false)    
    setIgnoreEnvFile(false)
    setError(null)
    
    // Don't take node_modules folder and .env file
    const files = Array.from(newFiles).filter(file => {
     
      if (file.webkitRelativePath.includes('node_modules')) setIgnoreNodeModules(true)
      else if (file.webkitRelativePath.includes('.env')) setIgnoreEnvFile(true)
      else if (file.webkitRelativePath.includes('.DS_Store')) setIgnoreDsStoreFile(true)
      
      return (
        !file.webkitRelativePath.includes('node_modules/') &&
        !file.webkitRelativePath.includes('.env') &&
        !file.webkitRelativePath.includes('.DS_Store')
      )
    })
    
    setFiles(files)
    setFilesLength(files.length)
    const structure = getFolderTree(files)
    
  }  
  const onSubmit = () => {
    if (filesLength < 1) setError('Déposez au moins un fichier')
    else {
      // Set the next step
      const structure = getFolderTree(files)
      //props.nextStep(3, structure)
    }
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
          { filesLength > 0 ? `${filesLength} fichier${filesLength > 1 ? 's' : ''} ajouté${filesLength > 1 ? 's' : ''}` : 'En attente de fichiers...' }
        </p>
        { ignoreNodeModules && <p>Le dossier node_modules n'a pas été ajouté</p> }
        { ignoreDsStoreFile && <p>Le fichier .DS_Store n'a pas été ajouté</p> }
        { ignoreEnvFile && <p>Le fichier .env n'a pas été ajouté</p> }
      </div>
      
      <button type='submit' className='submit-btn primary-btn'>Étape suivante</button>
      
      { error &&
        <div className='error-container'>
          <ErrorMsg msg={error} /> 
        </div>  
      }
      
      </form>
    </div>
  )
}
async function getFolderTree(files) {
  // Create the folder tree
  const structure = []
  
  const data = new FormData()

  data.append('file', files[0])

  fetch('http://localhost:4000/components', { method: 'DELETE', body: data})
  
  /* Array.from(files).forEach(file => {
    const blob = new Blob([file], { type: 'text/javascript' })
    console.log(blob.text());
  })
  console.log(structure); */
}