import React, { useEffect, useRef } from 'react'

import ImagesList from '../ImagesList'
import MainImage from '../MainImage'


export default function ComponentIllustrations(props) {
  const illustrations = props.illustrations
  const displayImg = useRef(null)

  const x = url => {
    console.log(url);
  }
  
  return (
    <div className='component-illustrations tab'>
      <ImagesList illustrations={illustrations} displayImg={url => /* displayImg.current(url) */x(url)} />
      <MainImage displayImg={displayImg} />
    </div>
  )
}