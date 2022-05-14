import React, { useState, useEffect } from 'react'

import ComponentCard from './ComponentCard'
import SkeletonCard from '../home/SkeletonCard'

import { request } from '../../controller/request'


export default function ComponentsList(props) {
  const username = props.username
  const isUserProfile = props.isUserProfile
  
  const [isLoading, setIsLoading] = useState(true)
  const [components, setComponents] = useState()
  const [listType, setListType] = useState('personal') // personal or liked

  useEffect(() => getProfileComponents('personal'), [])
  
  
  const getProfileComponents = async tab => {
    // Get all components created by the user
    setListType(tab)
    setIsLoading(true)
    
    const path = `/components${tab === 'liked' ? '/liked' : '' }?username=${username}&visibility=all`
    const res = await request.get(path)
    
    if (res.status === 200) {
      setComponents(res.components)
      setIsLoading(false)
    }
  }
  // Reload components list
  // Function triggered by parent component
  props.reloadList.current = tab => getProfileComponents(tab)
  
  if (isLoading) return(<SkeletonCard count={3} />)
  if (components.length === 0 && isUserProfile) return(
    <div className='loading'>
      <p>Vous n'avez pas encore { listType === 'liked' ? 'aimé' : 'créé' } de composant</p>
      {
        listType === 'liked' ?
          <a href={'/'} className='secondary-btn'>Parcourir les composants</a>
        :
          <a href={'/new-component'} className='secondary-btn'>Créer votre premier composant</a>
      }
    </div>
  )
  if (components.length === 0 && !isUserProfile) return(
    <div className='loading'>
      <p>{username} n'a pas encore { listType === 'liked' ? 'aimé' : 'créé' } de composant</p>
    </div>
  )
  
  return (
    <div className='component-list'>
      { components.map((component, index) => {
          return <ComponentCard component={component} listType={listType} key={index} />
        })
      }
    </div>
  )
}