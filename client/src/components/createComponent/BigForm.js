import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Form1 as Step1 } from './Form1'
import { Form2 as Step2 } from './Form2'
import { Form3 as Step3 } from './Form3'
import { Form4 as Step4 } from './Form4'

import { request as fetch } from '../../controller/request'

export function BigForm(props) {
  const [componentData, setComponentData] = useState()
  const [showStep, setShowStep] = useState(1)
  
  const user = props.user
  const filters = props.filters
  
  const navigate = useNavigate()
  
  const nextStep = async (step, data) => {
    // Update the component data with the data from the actual step
    
    if (step === 2) {
      // Add the data of the step 1 to the global component data
      setComponentData({ fullname: data.fullname, shortname: data.shortname, visibility: data.visibility })
    }
    else if (step === 3) {
      // Add the data of the step 2 to the global component data
      setComponentData(prevData => ({...prevData, description: data }))
    }
    else if (step === 4) {
      // Add the data of the step 3 to the global component data
      setComponentData(prevData => ({...prevData, tree: data }))
    }
    else {
      // Send the component's data to backend
      const res = await fetch.post('/components', {...componentData, filters: data})
      if (res.status === 200) {
        // Redirect to the created component page
        navigate(`/${user.username}/${componentData.shortname}`)
        window.location.reload(false)
      } else {
        console.log('error', res);
      }
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
        showStep === 3 ?
          <Step3
            nextStep={(step, data) => nextStep(step, data)}
          /> 
        :
          <Step4
            filters={filters}
            nextStep={(step, data) => nextStep(step, data)}
          />
      }
    </div>
  )
}