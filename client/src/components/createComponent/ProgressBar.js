import React, { createRef, useEffect } from 'react'


export default function ProgressBar(props) {
  const nbStep = 5 
  const steps = new Array(nbStep).fill(0)
  const actualStep = props.actualStep
  
  // Create a ref for each steps
  const refList = steps.map(() => createRef())
  
  useEffect(() => {
    refList[actualStep - 1].current.className = 'step active'
  }, [actualStep, refList])
  
  
  return (
    <div className='progress-bar'>
      { steps.map((_, index) => {
        return (
          <div className='step' key={index} ref={refList[index]}>
              { index !== 0 && <span className='bar'></span> }
              <span className='ball'></span>
          </div>
        )
      })}
    </div>
  )
}