import React, { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Images } from '../../assets/svg/Images';
import ErrorMsg from '../forms/ErrorMsg'
import Button from '../forms/Button';

import { request as fetch } from '../../controller/request';


export function Form5(props) {
  const { register, handleSubmit } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittingText, setSubmittingText] = useState('Téléchargement des images...')
  
  const [filesLength, setFilesLength] = useState(0)
  const [files, setFiles] = useState()
  const [error, setError] = useState()
  const wrapperRef = useRef(null);
  
  useEffect(() => {
    // Display loading msg while component is created
    if (props.isCreatingComponent) {
      setIsSubmitting(true)
      setSubmittingText('Création du composant...')
    }
  }, [props])
  
  const onSelectFolder = async(e) => {
    const newFiles = e.target.files
    
    setFilesLength(newFiles.length)
    setFiles(newFiles)
  }
  const onSubmit = async() => {
    if (filesLength < 1) setError('Déposez au moins une image')
    else {
      // Save files in DB
      const formData = new FormData();
      Array.from(files).map(file => formData.append("files", file))
      
      setIsSubmitting(true)
      const res = await fetch.postFiles('/uploads/', formData)
      setIsSubmitting(false)
      
      if (res.status !== 200) return setError('Un problème est survenu')
      
      // Display the next step
      props.nextStep(6, res.data)
    }
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
            accept="image/png, image/jpeg"
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
          submittingText={submittingText}
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