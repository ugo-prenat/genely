import React, { useState } from 'react'

import { Form1 as Step1 } from './Form1'
import { Form2 as Step2 } from './Form2'
import { Form3 as Step3 } from './Form3'

export function BigForm() {
  const [showStep, setShowStep] = useState(1)
  
  return (
    <div className='create-component-form'>
      {
        showStep === 1 ?
          <Step1
            setStep={step => setShowStep(step)}
          /> 
        :
        showStep === 2 ?
          <Step2
            setStep={step => setShowStep(step)}
          /> 
        :
          <Step3
            setStep={step => setShowStep(step)}
          />
      }
    </div>
  )
}