import React, { useState, useEffect } from 'react'

import Cross from '../../../assets/svg/Cross'


export default function SearchInput(props) {
  const [searchValue, setSearchValue] = useState('')
  
  useEffect(() => {
    props.applySearch(searchValue.toLowerCase())
  }, [searchValue])
  

  return (
    <div className='search-input'>
      <input
        placeholder='Rechercher un composant...'
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        readOnly={props.isLoading}
      />
      { searchValue.length > 0 && <span onClick={() => setSearchValue('')}><Cross /></span> }
    </div>
  )
}