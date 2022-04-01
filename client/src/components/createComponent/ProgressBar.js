import React from 'react'

export default function ProgressBar() {
  const nbStep = 5 
  const steps = new Array(nbStep).fill(0)
  
  return (
    <div className='progress-bar'>
      { steps.map((step, index) => {
        if (index === 0) { 
          return (
            <div className='step'>
              <span className='ball'></span>
            </div>
          )
        } else {
          return (
            <div className='step'>
              <span className='bar'></span>
              <span className='ball'></span>
            </div>
          )
        }
      }) }
    </div>
  )
}