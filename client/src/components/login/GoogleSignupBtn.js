import React from 'react'
import { useNavigate } from 'react-router-dom'
import GoogleLogin from 'react-google-login'

import { Google as GoogleLogo } from '../../assets/svg/Google'
import { request as fetch } from '../../controller/request'

export default function GoogleSignupBtn() {
  const navigate = useNavigate()
  
  const handleSuccess = async data => {
    const token = data.tokenId

    const res = await fetch.post('/auth/signup/google', { token })
    if (res.status === 200) {
      // Store token in localstorage and redirect user to homepage
      //localStorage.setItem('token', res.token)
      console.log(res);
      navigate('/')
    } else {
      console.log('Register error', res);
    }
  }
  const handleFailure = err => console.error('Google signup error', err)
  
  return (
    <GoogleLogin
      render={renderProps => (
        <button className='google-btn' onClick={renderProps.onClick} disabled={renderProps.disabled}>
          <GoogleLogo />
          Inscription avec Google
        </button>
      )}
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy={'single_host_origin'}
    />
  )
}