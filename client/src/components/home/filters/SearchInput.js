import React, { useState } from 'react'

export default function SearchInput(props) {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div>
      <input 
        className='search-input'
        placeholder='Rechercher un composant...'
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
    </div>
  )
}