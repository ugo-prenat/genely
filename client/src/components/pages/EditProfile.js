import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion'

import Path from '../Path';
import { request } from '../../controller/request'

import Check from '../../assets/svg/Check'
import Upload from '../../assets/svg/Upload'

import '../../styles/editProfile.scss'


export default function EditProfile(props) {  
  const { username } = useParams()
  const user = props.user
  const isUserProfile = props.isAuth && user.username === username
  const originalFullname = user.fullname
  
  const [fullname, setFullname] = useState(originalFullname)
  const [profilePicture, setProfilePicture] = useState(user.avatarUrl)
  const [actualPassword, setActualPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [successFullnameModif, setSuccessFullnameModif] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const navigate = useNavigate()
  
  useEffect(() => {
    // Setup tab title
    document.title = 'Genely - modifié votre profil'
    if (!isUserProfile) navigate(`/${username}`)
  }, [])
  
  const patchUsername = async _ => {
    if (originalFullname === fullname || fullname === '') return
    
    const res = await request.patch('/users', { fullname })
    if (res.status === 200) {
      setSuccessFullnameModif(true)
      setTimeout(() => setSuccessFullnameModif(false), 3000);

      user.fullname = fullname
      props.updateUser(user)
    }
  }
  const patchPictureProfile = async e => {
    const images = e.target.files
    
    const formData = new FormData();
    Array.from(images).map(img => formData.append("files", img))

    setIsSubmitting(true)
    const res = await request.postFiles('/uploads', formData)
    
    if (res.status === 200) {
      // Update the user profile
      const response = await request.patch('/users', { avatarUrl: res.data[0].url })
      setIsSubmitting(false)
      
      if (response.status === 200) {
        // Update the golbal user state and the profile picture preview
        user.avatarUrl = res.data[0].url
        props.updateUser(user)
        setProfilePicture(getImgUrl(res.data[0].url))
      }
    }
  }
  
  return <div className='main-component edit-profile-component'>
    <Path path={[
      { 'name': username, 'link': `/${username}` },
      { 'name': 'paramètres', 'link': '' }
    ]} />
    
    <div className='wrapper'>
      
      <div className='profile-picture-container'>
        <img src={getImgUrl(profilePicture)} alt='profile avatar' />
        <input
          type='file'
          accept="image/png, image/jpeg, image/jpg"
          onChange={patchPictureProfile}
          id='avatar-upload'
        />
        <label htmlFor='avatar-upload'>
          { isSubmitting && <p className='importing'>Importation...</p> }
          { !isSubmitting && <p>Importer une image <Upload /></p> }
        </label>
      </div>
  
      <div className='data-container'>
        
        <div className='section personal-information'>
          <p className='section-title'>Informations personnelles</p>
          
          <input
            placeholder='Nom complet'
            autoFocus
            value={fullname}
            onChange={e => setFullname(e.target.value)}
          />
          <input
            value={user.username}
            readOnly='readonly'
          />
          <input
            value={user.email}
            readOnly='readonly'
          />
          <div className='submit-btns'>
            <span className={`save-btn ${fullname === '' ? '' : originalFullname !== fullname ? 'active' : ''}`} onClick={() => patchUsername()}>Sauvegarder</span>
            <span className='cancel-btn' onClick={() => setFullname(originalFullname)}>Annuler</span>
            <motion.span
              animate={
                {
                  y: successFullnameModif ? 10 : 0,
                  visibility: successFullnameModif ? 'visible' : 'hidden'
                }
              }
              className='success-modification'
              >
                <Check /> Modification effectuée
              </motion.span>
          </div>
        </div>
        
        <div className='section reset-password'>
          <p className='section-title'>Modifier votre mot de passe</p>
          <input
            placeholder='Mot de passe actuel'
            value={actualPassword}
            onChange={e => setActualPassword(e.target.value)}
          />
          <input
            placeholder='Nouveau mot de passe'
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
        </div>
      </div>
    </div>
  </div>;
}
function getImgUrl(url) {
  // Check if the given image's url is hosted by Genely or not
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return backendUrl + url
}