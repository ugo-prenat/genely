import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState()
  const { token } = useParams()
  
  const URL = process.env.REACT_APP_BACKEND_URL
  
  useEffect(() => {
    localStorage.setItem('token', token)
    
    fetch(`${URL}/auth`, { headers: { 'authorization': `Bearer ${token}` } })
    .then(res => res.json())
    .then(res => {
      setEmail(res.user.email)
      setIsLoading(false)
    })
  }, [])
  
  if (isLoading) return(<div className='loading'>Chargement...</div>)
  
  return (
    <div className='main-component'>
      {email} try to reset his password
    </div>
  )
}