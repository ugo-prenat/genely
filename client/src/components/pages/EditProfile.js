import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion'

import Path from '../Path';
import { request } from '../../controller/request'

import Check from '../../assets/svg/Check'

import '../../styles/editProfile.scss'


export default function EditProfile(props) {
  const { username } = useParams()
  const user = props.user
  const isUserProfile = props.isAuth && user.username === username
  const originalFullname = user.fullname
  
  const [fullname, setFullname] = useState(originalFullname)
  const [actualPassword, setActualPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [successFullnameModif, setSuccessFullnameModif] = useState(false)
  
  const navigate = useNavigate()
  
  useEffect(() => {
    // Setup tab title
    document.title = 'Genely - modifié votre profil'
    
    if (!isUserProfile) navigate(`/${username}`)
    
  }, [])
  
  const patchUser = async _ => {
    // Apply user's modifications in DB
    if (originalFullname === fullname || fullname === '') return
    
    const res = await request.patch('/users', { fullname })
    if (res.status === 200) {
      setSuccessFullnameModif(true)
      setTimeout(() => setSuccessFullnameModif(false), 3000);
    }
    
  }
  
  

  return <div className='main-component edit-profile-component'>
    <Path path={[
      { 'name': username, 'link': `/${username}` },
      { 'name': 'paramètres', 'link': '' }
    ]} />
    
    <div className='wrapper'>
      
      <div className='profile-picture-container'>
        <img src={/* backendUrl + */ user.avatarUrl} alt='profile picture' />
        <span>
          Changer image profiil
          <svg height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M8 1c.306 0 .579.137.762.352L12.21 4.8a.999.999 0 01-1.413 1.413L9 4.415v7.586a.999.999 0 11-1.998 0V4.413l-1.8 1.8A.999.999 0 113.79 4.8l3.46-3.46A.997.997 0 018 1zm3 13H5a1 1 0 100 2h6a1 1 0 100-2z"></path></svg>  
        </span>
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
            <span className={`save-btn ${fullname === '' ? '' : originalFullname !== fullname ? 'active' : ''}`} onClick={() => patchUser()}>Sauvegarder</span>
            <span className='cancel-btn' onClick={() => setFullname(originalFullname)}>Annuler</span>
            <motion.span
              animate={
                {
                  y: successFullnameModif ? 10 : -10,
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
