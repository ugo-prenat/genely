import React, { useState } from 'react'

import Cross from '../../assets/svg/Cross'

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
      { showDeleteIcon && <span className='bin-container'><Cross /></span>}
      {filter.name}
    </p>
  )
}