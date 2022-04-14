import React from 'react'

import ComponentCode from './ComponentCode'
import ComponentIllustrations from './ComponentIllustrations'


export default function ComponentOverview(props) {
  const component = props.component
  
  return (
    <div className='component-overview tab'>
      <ComponentCode component={component} activeTab={props.activeTab} />
      <ComponentIllustrations urls={component.illustrations} />
    </div>
  )
}