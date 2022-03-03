import React, { useState } from 'react'

import Lock from '../../assets/svg/Lock'

export default function FilterCard(props) {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false)
  const filter = props.filter
  
  return (
    <p
      className='filter'
      type={filter.type}
      onMouseEnter={() => setShowDeleteIcon(true)}
      onMouseLeave={() => setShowDeleteIcon(false)}
      onClick={props.deleteFilter}
    >
      { showDeleteIcon && <span className='bin-container'><Lock /></span>}
      {filter.name}
    </p>
  )
}