import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'

import Files from '../../assets/svg/Files';
import ErrorMsg from '../forms/ErrorMsg'
import Button from '../forms/Button';

import { request as fetch } from '../../controller/request';

export function Form3(props) {
  const { register, handleSubmit } = useForm();
  const [filesLength, setFilesLength] = useState(0)
  
  const [ignoreNodeModules, setIgnoreNodeModules] = useState(false)
  const [ignoreDsStoreFile, setIgnoreDsStoreFile] = useState(false)
  const [ignoreEnvFile, setIgnoreEnvFile] = useState(false)
  const [ignoreGitFolder, setIgnoreGitFolder] = useState(false)
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [files, setFiles] = useState()
  const [error, setError] = useState()
  const wrapperRef = useRef(null);
  
  
  const onSelectFolder = async(e) => {
    setIgnoreNodeModules(false)
    setIgnoreDsStoreFile(false)
    setIgnoreEnvFile(false)
    setError(null)
    
    // Don't take node_modules folder and .env file
    const newFiles = Array.from(e.target.files).filter(file => {
     
      if (file.webkitRelativePath.includes('node_modules')) setIgnoreNodeModules(true)
      else if (file.webkitRelativePath.includes('.env')) setIgnoreEnvFile(true)
      else if (file.webkitRelativePath.includes('.DS_Store')) setIgnoreDsStoreFile(true)
      else if (file.webkitRelativePath.includes('.git')) setIgnoreGitFolder(true)
      
      return (
        !file.webkitRelativePath.includes('node_modules') &&
        !file.webkitRelativePath.includes('.env') &&
        !file.webkitRelativePath.includes('.DS_Store') &&
        !file.webkitRelativePath.includes('.git')
      )
    })
    setFilesLength(newFiles.length)
    setFiles(newFiles)
  }

  const onSubmit = async() => {
    if (filesLength < 1) setError('Déposez au moins un fichier')
    else {
      // Save files in DB
      const formData = new FormData();
      files.map(file => formData.append("files", file))
      
      setIsSubmitting(true)
      const res = await fetch.postFiles('/uploads/', formData)
      setIsSubmitting(false)
      
      if (res.status !== 200) return setError('Un problème est survenu')
      let filesUrl = res.data
      
      // Create the folder tree
      let data = { paths: [], filenames: [], url: [] }
      
      Array.from(files).forEach((file, index) => {
        const path = file.webkitRelativePath
        const originalName = file.name
        const url = filesUrl[index]
        
        data.paths.push(path)
        data.filenames.push(originalName)
        data.url.push(url)
      })
      // Display the next step
      props.nextStep(4, getFolderTree(data))
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
        { ignoreGitFolder && <p>Le dosier .git n'a pas été ajouté</p> }
      </div>
      
      <Button
        type='submit'
        isSubmitting={isSubmitting}
        submittingText='Téléchargement des fichiers...'
      >
        Étape suivante
      </Button>
      
      { error &&
        <div className='error-container'>
          <ErrorMsg msg={error} /> 
        </div>  
      }
      
      </form>
    </div>
  )
}
function getFolderTree(data) {
  // Generate a folder tree
  let result = [];
  let level = {result};

  data.paths.forEach((path, index) => {
    path.split('/').reduce((r, name) => {
      
      if(!r[name]) {
        r[name] = {result: []}
        const isFile = name === data.filenames[index]
        
        if (isFile) {
          r.result.push({ name, type: 'file', url: data.url[index].url })
        } else {
          r.result.push({ name, type: 'folder', children: r[name].result })
        }
      }
      return r[name];
    }, level)
  })
  return result[0].children
}