import React, { useRef } from 'react'

import ComponentCode from './ComponentCode'
import ComponentIllustrations from './ComponentIllustrations'
import ImagesList from '../ImagesList'
import MainImage from '../MainImage'



export default function ComponentOverview(props) {
  const component = props.component
  const illustrations = component.illustrations
  const displayImg = useRef(null)
  
  
  return (
    <div className='component-overview tab'>
      <div className='top-part'>
        <ComponentCode component={component} activeTab={props.activeTab} />
        <div className='main-img-wrapper'>
          <MainImage displayImg={displayImg} firstImg={illustrations[0].url} />
        </div>
      </div>
      <ImagesList illustrations={illustrations} displayImg={url => displayImg.current(url)} />
    </div>
  )
}