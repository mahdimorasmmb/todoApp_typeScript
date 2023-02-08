import React from 'react'

const Header = () => {
  return (
    <header className='flex bg-header-color px-3 py-5 mb-5 text-white'>
        <h1 className='font-bold text-lg'>Todo App</h1>
        <nav>
            <a className='header_link' href='#'>Home</a>
            <a className='header_link' href='#'>Stats</a>
            <a className='header_link' href='#'>About</a>
        </nav>

    </header>
  )
}

export default Header