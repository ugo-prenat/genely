import React, { useRef } from 'react'

import ImagesList from '../ImagesList'
import MainImage from '../MainImage'


export default function ComponentIllustrations(props) {
  const illustrations = props.illustrations
  const displayImg = useRef(null)

  
  return (
    <div className='component-illustrations tab'>
      <ImagesList illustrations={illustrations} displayImg={url => displayImg.current(url)} />
      <MainImage displayImg={displayImg} firstImg={illustrations[0].url} />
    </div>
  )
}