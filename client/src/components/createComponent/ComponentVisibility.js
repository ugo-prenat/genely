import React from 'react'

import VisibilityRadioInput from './VisibilityRadioInput'

import Lock from '../../assets/svg/Lock'
import Globe from '../../assets/svg/Globe'

export default function ComponentVisibility() {
  const privateData = {
    title: 'Privé',
    description: 'Vous seul pouvez voir ce composant',
    icon: Lock()
  }
  const publicData = {
    title: 'Public',
    description: 'N\'importe qui peut voir ce composant',
    icon: Globe()
  }
  
  return (
    <>
      <VisibilityRadioInput data={publicData} />
      <VisibilityRadioInput data={privateData} />
    </>
  )
}