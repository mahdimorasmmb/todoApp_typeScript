import React from 'react'

interface Props {
    children:React.ReactNode
}

const PageLayout = ({children}:Props) => {
  return (
    <div className="mr-auto ml-auto w-[500px]">{children}</div>
  )
}

export default PageLayout