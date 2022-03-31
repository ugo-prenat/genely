import React, { useState, useRef, useEffect } from 'react'
import BottomArrow from '../../assets/svg/BottomArrow'


export default function ComponentDescription(props) {
  const ref = useRef(null)
  const description = props.description
  
  const [isDeployed, setIsDeployed] = useState(false)
  const [isLongDescription, setIsLongDescription] = useState()
  
  
  useEffect(() => {
    // Hide the end of the description if it takes more than 3 lines
    const handleResize = () => {
      const descriptionHeight = ref.current.clientHeight
      setIsLongDescription(descriptionHeight > 69)
    }
    window.addEventListener("resize", handleResize)
    
    // Call handleResize function at the load of the component
    handleResize()
  }, [])

  return (
    <div className='description-container'>
      <div className='description' style={{ height: isDeployed ? 'auto' : '70px' }}>
        <p ref={ref}>{description}</p>
      </div>
      
      { isLongDescription &&
        <div className={`show-more ${isDeployed ? 'show-less' : ''}`}>
          <span onClick={() => setIsDeployed(!isDeployed)}>
            Afficher { isDeployed ? 'moins' : 'plus' } <BottomArrow />
          </span>
        </div>
      }
    </div>
  )
}