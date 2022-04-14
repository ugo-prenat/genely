import React from 'react'

export default function SkeletonCard(props) {
  const count = new Array(props.count).fill()
  
  return (
    <div className='skeleton-list'>
      { count.map((_, index) => <Card key={index} /> ) }
    </div>
  )
}

export function Card() {
  return (
    <div className='card'>
      <div>
        <div className='illustration-container skeleton-box'></div>
        
        <div className='names'>
          <p className='fullname skeleton-box'></p>
          <p className='shortname skeleton-box'></p>
        </div>
      </div>
      
      <div className='creator'>
        <p className='img skeleton-box'></p>
        <p className='fullname skeleton-box'></p>
      </div>
    </div>
  )
}