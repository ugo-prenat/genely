import React from 'react'

import ImagesList from '../ImagesList'
import MainImage from '../MainImage'


export default function ComponentIllustrations(props) {
  const illustrations = props.illustrations
  
  return (
    <div className='component-illustrations tab'>
      <ImagesList illustrations={illustrations} />
      <MainImage src={illustrations[0]} />
    </div>
  )
}