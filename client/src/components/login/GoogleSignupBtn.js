import React from 'react'
import { useNavigate } from 'react-router-dom'
import GoogleLogin from 'react-google-login'

import { Google as GoogleLogo } from '../../assets/svg/Google'
import { request as fetch } from '../../controller/request'

export default function GoogleSignupBtn(props) {
  const navigate = useNavigate()
  
  const handleSuccess = async data => {
    const token = data.tokenId

    const res = await fetch.post('/auth/signup/google', { token })
    if (res.status === 200) {
      // Store token in localstorage
      localStorage.setItem('token', res.token)
      // Reset errors
      props.signupError()
      // Redirect user to homepage and refresh to apply localstorage
      navigate('/')
      window.location.reload(false);
    } else {
      // Display error
      props.signupError(res.msg)
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