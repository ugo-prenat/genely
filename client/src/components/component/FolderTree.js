import React from 'react'

export default function FolderTree(props) {
  const tree = props.tree
  console.log(tree);
  
  const displayFile = url => {
    const type = url.split('/')[2]
    props.setFileProps(type, url)
  }
  
  
  return (
    <div>
      {
        tree.map((item, index) => {
          if (item.type === 'file') {
            return (
              <p onClick={() => displayFile(item.url)} key={index} >
                file - { item.name }
              </p>
            )
          } else {
            return(
              <p key={index}>
                folder - { item.name }
              </p>
            )
          }
        })
      }
    </div>
  )
}