import React from 'react'

export default function ComponentData(props) {
  const component = props.component
  
  return (
    <div className='data'>
      <p className='fullname'>{ component.fullname }</p>
      <p className='shortname'>{ component.shortname }</p>
      <p className='description'>{ component.description }</p>
      <div className='filters'>
        { component.filters.map((filter, index) => <p key={index}>{filter.name}</p> )}
      </div>
      <p className='created-at'>Publié le { getDate(component.createdAt) }</p>
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