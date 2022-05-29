import React from 'react'

export function ProfileDataSkeleton() {
  return (
    <div className='skeleton-profile-data'>
      <div className='left-part'>
        <p className='profile-picture skeleton-box'></p>
        <div>
          <p className='fullname skeleton-box'></p>
          <p className='username skeleton-box'></p>
        </div>
      </div>
      
      <div className='right-part'>
        <p className='username skeleton-box'></p>
        <p className='username skeleton-box'></p>
      </div>
    </div>
  )
}