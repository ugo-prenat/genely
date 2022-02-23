import React, { useState } from 'react'

import { Form1 as Step1 } from './Form1'
import { Form2 as Step2 } from './Form2'
import { Form3 as Step3 } from './Form3'


export function BigForm(props) {
  const [showStep, setShowStep] = useState(2)
  const [componentData, setComponentData] = useState()
  const user = props.user
  
  const nextStep = async (step, data) => {
    // Update the component data with the data from the actual step
    
    if (step === 2) {
      // Add the data of the step 1 to the global component data
      setComponentData({ fullname: data.fullname, shortname: data.shortname, visibility: data.visibility })
    }
    else if (step === 3) {
      // Add the data of the step 2 to the global component data
      
      setComponentData(prevData => (
        {...prevData, structure: data }
      ))
      
    }
    
    // Display the next step
    setShowStep(step)
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