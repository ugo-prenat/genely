import React, { useState } from 'react'

import { Form1 as Step1 } from './Form1'
import { Form2 as Step2 } from './Form2'
import { Form3 as Step3 } from './Form3'

export function BigForm(props) {
  const [showStep, setShowStep] = useState(2)
  const [componentData, setComponentData] = useState()
  const user = props.user
  
  const nextStep = (step, data) => {
    // Set the next step and update data
    setShowStep(step)
    
    if (step === 2) {
      setComponentData({ fullname: data.fullname, shortname: data.shortname, visibility: data.visibility })
    }
  }
  
  return (
    <div className='create-component-form'>
      {
        showStep === 1 ?
          <Step1
            nextStep={(step, data) => nextStep(step, data)}
            username={user.username}
          /> 
        :
        showStep === 2 ?
          <Step2
            nextStep={(step, data) => nextStep(step, data)}
          /> 
        :
          <Step3
            nextStep={(step, data) => nextStep(step, data)}
          />
      }
    </div>
  )
}