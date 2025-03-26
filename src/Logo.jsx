import React from 'react'

const Logo = ({name}) => {
    let firstLetter = name.charAt(0)
    let toUpper = firstLetter.toUpperCase()
  return (
    <div className='text-white font-bold rounded-full flex justify-center items-center w-12 h-12 bg-[#E54065]'>{toUpper}</div>
  )
}

export default Logo
