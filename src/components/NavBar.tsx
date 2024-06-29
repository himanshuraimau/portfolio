  import React from 'react'
  import Link  from 'next/link'

  const NavBar = () => {
    return (
      <div>
        <nav className="bg-black text-gray-300 p-4 ">
        <div className="container mx-5 items-center flex flex-row justify-around ">
        <Link
        href="/"
        className="font-system text-xl font-bold text-center uppercase text-body-light pt-5 pl-10"
        style={{
          lineHeight: '8px',
          letterSpacing: '1.8px',
          wordSpacing: '0px',
          textDecoration: 'none solid rgb(67, 133, 215)',
        }}
      >
        <span className="hover:text-blue-400">HIMANSHU RAI</span>
      </Link>


  <div className="flex flex-row justify-between space-x-7 mr-20 pt-5">
        <Link href="#projects"
          
            className="font-sans text-[18px] text-body-light hover:text-blue-400"
            style={{
              lineHeight: '34px',
              letterSpacing: '0.9px',
              fontWeight: 400,
              textDecoration: 'none solid rgb(67, 133, 215)',
              textAlign: 'start',
            }}
          >
            Projects
        
        </Link>
        <Link href="#about"
            className="font-sans-serif text-[18px] hover:text-blue-400 text-body-light"
            style={{
              lineHeight: '34px',
              letterSpacing: '0.9px',
              fontWeight: 400,
              textDecoration: 'none solid rgb(67, 133, 215)',
              textAlign: 'start',
            }}
          >
            About
          
        </Link>
        <Link href="#blogs"
          
            className="font-sans-serif text-[18px] hover:text-blue-400 text-body-light"
            style={{
              lineHeight: '34px',
              letterSpacing: '0.9px',
              fontWeight: 400,
              textDecoration: 'none solid rgb(67, 133, 215)',
              textAlign: 'start',
            }}
          >
            Blogs
          
        </Link>
      </div>

        </div>
      </nav>
      </div>
    )
  }

  export default NavBar
