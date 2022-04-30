import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Cross from '../../../assets/svg/Cross'


export default function SearchInput(props) {
  const [searchValue, setSearchValue] = useState(props.value)
  const navigate = useNavigate()
  
  useEffect(() => {
    props.applySearch(searchValue.toLowerCase())
    // Update url's search param
    //updateUrlParams()
  }, [searchValue])
  
  useEffect(() => setSearchValue(props.value), [props.value])
  
  const updateUrlParams = () => {
    const urlParams = new URLSearchParams(window.location.search)
    let filters = urlParams.get('filters')
    
    navigate(`${ filters ? `?filters${filters}&search=${searchValue}` : `?search=${searchValue}` }`)
  }
  
  
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