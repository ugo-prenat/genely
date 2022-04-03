import React, { createRef, useEffect, useRef, useState } from 'react'


export default function ProgressBar(props) {
  const nbStep = 5 
  const steps = new Array(nbStep).fill(0)
  const actualStep = props.actualStep
  
  // Create a ref for each steps
  const refList = steps.map(() => createRef())
  
  useEffect(() => {
    console.log(refList[actualStep - 1]);
  }, [actualStep, refList])
  
  
  return (
    <div className='progress-bar'>
      { steps.map((_, index) => {
        return (
          <div className='step' key={index}>
              { index !== 0 && <span className='bar'></span> }
              <span className='ball'></span>
          </div>
        )
      }) }
    </div>
  )
}