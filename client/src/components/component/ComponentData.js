import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import ComponentDescription from './ComponentDescription'
import FiltersList from './FiltersList'
import { request } from '../../controller/request'

import Heart from '../../assets/svg/Heart'
import Trash from '../../assets/svg/Trash'


export default function ComponentData(props) {
  const component = props.component
  const myUsername = props.myUsername
  const isAuth = props.isAuth
  const isUserComponent = props.isAuth && myUsername === component.creator.username

  const [isLiked, setIsLiked] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteMsg, setShowDeleteMsg] = useState(false)
  
  const navigate = useNavigate()
  
  useEffect(() => {
    // Check if user liked the component
    if (isAuth) getIsLiked()
    // eslint-disable-next-line
  }, [])
  
  const getIsLiked = async _ => {
    // Check if user liked the component
    const res = await request.get(`/users/${myUsername}/like/${component.id}`)
    setIsLiked(res.isLiked)
    setIsLoading(false)
  }
  const toggleLike = async _ => {
    // Toggle the like component status
    const url = `/users/${myUsername}/like/${component.id}`
    let res
    
    if (isLiked) res = await request.remove(url)
    else res = await request.post(url)
    
    if (res.status === 200) setIsLiked(!isLiked)
  }
  const deleteComponent = async _ => {
    setIsDeleting(true)
    const res = await request.remove(`/components/${component.id}`)
    if (res.status === 200) navigate('/')
      
    setIsDeleting(false)
    setShowDeleteMsg(false)
  }
  
  return (
    <div className='data'>
      <p className='fullname'>{ component.fullname }</p>
      <div className='sub-data'>
        <div>
          <p className='shortname'>{ component.shortname }</p>
          <p className='created-at'>Créé le { getDate(component.createdAt) }, il y a { getDiffTime(component.createdAt) }</p>
          { isAuth && !isLoading && 
            <p className={`like-btn ${isLiked ? 'liked' : ''}`} onClick={() => toggleLike()}>
              <Heart />
              Ajout{ isLiked ? 'é' : 'er' } aux favoris
            </p>
          }
          { isUserComponent &&
              <span onClick={() => setShowDeleteMsg(true)} className='delete-btn'>
                <Trash />
                { isDeleting ? 'Suppression...' : 'Supprimer' }
              </span>
          }
        </div>
      </div>
      <FiltersList filters={component.filters} />
      { component.description &&
        <ComponentDescription description={component.description} />
      }
      { showDeleteMsg &&
        <DeletePopUp
          hide={() => setShowDeleteMsg(false)}
          delete={deleteComponent}
          isDeleting={isDeleting}
        />
      }
    </div>
  )
}

export function DeletePopUp(props) {
  
  return(
    <div className='delete-popup-wrapper'>
      <span onClick={props.hide} className='background'></span>
      <div className='delete-popup-container'>
        <p>Êtes-vous sûr de vouloir supprimer ce composant ?</p>
        <span className='btn' onClick={props.hide}>Annuler</span>
        <span className='btn delete' onClick={props.delete}>{props.isDeleting ? 'Suppression...' : 'Supprimer' }</span>
      </div>
    </div>
  )
}
function getDate(d) {
  // Return a good formated date
  const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  const date = new Date(d)
  const month = months[date.getMonth()]
  
  return `${date.getDate()} ${month} ${date.getFullYear()}`
}
function getDiffTime(d) {
  // Return a good formated date
  const startDate = new Date(d)
  const endDate = new Date()
  const diffTime = endDate - startDate
  
  const seconds = Math.round(diffTime / 1000)
  const minutes = Math.round(diffTime / (1000 * 60) % 60)
  const hours = Math.round(diffTime / (1000 * 60 * 60) % 24)
  const days = Math.round(diffTime / (1000 * 3600 * 24))
  const weeks = Math.round(diffTime / (1000 * 3600 * 24 * 7))
  const months = Math.round(diffTime / (1000 * 3600 * 24 * 7 * 4))
  const years = Math.round(diffTime / (1000 * 3600 * 24 * 7 * 4 * 12))
  
  if (years >= 1) return `${years} an${years > 1 ? 's' : ''}`
  else if (months >= 1) return `${months} mois`
  else if (weeks >= 1) return `${weeks} semaine${weeks > 1 ? 's' : ''}`
  else if (days >= 1) return `${days} jour${days > 1 ? 's' : ''}`
  else if (hours >= 1) return `${hours} heure${hours > 1 ? 's' : ''}`
  else if (minutes >= 1) return `${minutes} minute${minutes > 1 ? 's' : ''}`
  else return `${seconds} seconde${seconds > 1 ? 's' : ''}`
}