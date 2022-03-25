import React from 'react'

export default function Button(props) {
  const isSubmitting = props.isSubmitting
  const defaultText = props.children
  const submittingText = props.submittingText
  
  return (
    <button
      className='submit-btn primary-btn'
      disabled={isSubmitting}
    >
      { isSubmitting ? submittingText : defaultText }
    </button>
  )
}