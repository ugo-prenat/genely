import React from 'react'

export default function SkeletonCard(props) {
  const count = new Array(props.count).fill()
  
  return (
    <div className='skeleton-filter-list'>
      { count.map((_, index) => <div className='filter skeleton-box' key={index} /> ) }
    </div>
  )
}