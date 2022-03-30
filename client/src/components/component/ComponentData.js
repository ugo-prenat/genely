import React from 'react'

import ComponentDescription from './ComponentDescription'
import FiltersList from './FiltersList'


export default function ComponentData(props) {
  const component = props.component
  
  return (
    <div className='data'>
      <div className='fullname-and-date'>
        <p className='fullname'>{ component.fullname }</p>
        <p className='created-at'>Publié le { getDate(component.createdAt) } - il y a { getDiffTime(component.createdAt) }</p>
      </div>
      <p className='shortname'>{ component.shortname }</p>
      <FiltersList filters={component.filters} />
      {/* <p className='description'>{ component.description }</p> */}
      { component.description &&
        <ComponentDescription description={component.description} />
      }
      
      <button className='secondary-btn'>Télécharger le composant</button>
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