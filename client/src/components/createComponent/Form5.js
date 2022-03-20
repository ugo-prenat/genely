import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { Images } from '../../assets/svg/Images';
import ErrorMsg from '../forms/ErrorMsg'
import Button from '../forms/Button';

export function Form5(props) {
  const { register, handleSubmit } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [filesLength, setFilesLength] = useState(0)
  const [files, setFiles] = useState()
  const [error, setError] = useState()
  const wrapperRef = useRef(null);
  
  
  
  const onSelectFolder = async(e) => {
    const newFiles = e.target.files
    
    console.log(newFiles);
    
    setFilesLength(newFiles.length)
    setFiles(newFiles)
    
  }
  const onSubmit = async() => {
    console.log('onSubmit');
  }
  
  return (
    <div className='step-form-container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <p className='form-title'>Ajoutez les images d'illustration</p>
        
        <div
          ref={wrapperRef}
          className="drop-file-input"
          onDragEnter={() => wrapperRef.current.classList.add('dragover')}
          onDragLeave={() => wrapperRef.current.classList.remove('dragover')}
          onDrop={() => wrapperRef.current.classList.remove('dragover')}
        >
          <label>
              <Images />
              <p>Sélectionnez les images d'illustration de votre composant</p>
          </label>
          <input
            {...register('files')}
            type='file'
            accept="image/*"
            multiple
            onChange={onSelectFolder}
          />
        </div>
        
        <div className='files-data'>
          <p>
            { filesLength > 0 ? `${filesLength} image${filesLength > 1 ? 's' : ''} ajoutée${filesLength > 1 ? 's' : ''}` : 'En attente d\'images...' }
          </p>
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