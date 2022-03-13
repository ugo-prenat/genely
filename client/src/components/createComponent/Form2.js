import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'

import Files from '../../assets/svg/Files';
import ErrorMsg from '../forms/ErrorMsg'

//import { request as fetch } from '../../controller/request';

export function Form2(props) {
  const { register, handleSubmit } = useForm();
  const [filesLength, setFilesLength] = useState(0)
  const [ignoreNodeModules, setIgnoreNodeModules] = useState(false)
  const [ignoreDsStoreFile, setIgnoreDsStoreFile] = useState(false)
  const [ignoreEnvFile, setIgnoreEnvFile] = useState(false)
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
      
      return (
        !file.webkitRelativePath.includes('node_modules') &&
        !file.webkitRelativePath.includes('.env') &&
        !file.webkitRelativePath.includes('.DS_Store')
      )
    })
    setFilesLength(newFiles.length)
    setFiles(newFiles)
    
    
    
    // Tring somethings
    const formData = new FormData();
    newFiles.forEach(file => {
      formData.append("files", file);
    });
    console.log(formData);
    
    const res = await fetch('http://localhost:4000/components/testfiles', {
      method: 'POST', headers: { 
        'Content-Type': 'multipart/form-data',
        'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBkNDQ2OTViNTZkZWMwMjQzZTkyNmEiLCJpZCI6MCwidXNlcm5hbWUiOiJnZW5lbHktdGVhbSIsImZ1bGxOYW1lIjoiR2VuZWx5IFRlYW0iLCJlbWFpbCI6ImdlbmVseS5kZXZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkMU4xN2M0QTJkYmgvS1NVWHpZaXJFLnBlTGY1ZWljNFZ3a0NNa1BISUEvb1hoVzhRM2JhOE8iLCJpc0F1dGhXaXRoR29vZ2xlIjpmYWxzZSwiYXZhdGFyVXJsIjoiaHR0cHM6Ly9pY29ucy5pY29uYXJjaGl2ZS5jb20vaWNvbnMvZGl2ZXJzaXR5LWF2YXRhcnMvYXZhdGFycy8xMjgvcm9ib3QtMDItaWNvbi5wbmciLCJpc0FkbWluIjp0cnVlLCJwdWJsaWNDb21wb25lbnRzIjowLCJwcml2YXRlQ29tcG9uZW50cyI6MCwiY3JlYXRlZEF0IjoiMjAyMi0wMi0xNlQxODozNzoyOS45MjZaIiwidXBkYXRlZEF0IjoiMjAyMi0wMi0yMlQxMzowMTo0Ni45NTFaIiwiX192IjowLCJpYXQiOjE2NDU5NTYzOTl9.gjhvYrtAv1F5swb7C-pFX9zoqCfBk12VJfaIGNEl2no`
      },
      data: formData
    })
    console.log(res.json());
  }

  const onSubmit = () => {
    if (filesLength < 1) setError('Déposez au moins un fichier')
    else {
      // Create the folder tree
      let data = { paths: [], filenames: [], contents: [] }
      let totalFiles = files.length
      let filesLoaded = 0
      
      Array.from(files).forEach(file => {
        const path = file.webkitRelativePath
        const filename = file.name
        
        const reader = new FileReader();
        reader.readAsText(file);
        
        reader.onload = res => {
          filesLoaded++
          if (filesLoaded === totalFiles) {
            // Send data and display the next step
            props.nextStep(3, getFolderTree(data))
          }
          const content = res.target.result
          
          data.paths.push(path)
          data.filenames.push(filename)
          data.contents.push(content)
        }
      })
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
            multiple
            /* webkitdirectory=''
            directory='' */
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
function getFolderTree(data) {
  let result = [];
  let level = {result};
  
  data.paths.forEach((path, index) => {
    path.split('/').reduce((r, name) => {
      
      if(!r[name]) {
        r[name] = {result: []}
        const isFile = name === data.filenames[index]
        
        if (isFile) {
          r.result.push({ name, type: 'file', content: data.contents[index] })
        } else {
          r.result.push({ name, type: 'folder', children: r[name].result })
        }
      }
      return r[name];
    }, level)
  })
  return result[0].children
}