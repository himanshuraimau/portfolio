import Link from 'next/link'
import React from 'react'

const Me = () => {
  return (
    <div>
          <div className='text-mono text-2xl text-center pt-8'>
            more about me
          </div>
        <div className='text-mono pt-8 text-md'>
      <p>
        i am a full stack developer based in bangalore, currently pursuing engineering in artificial intelligence and data science. 
        currently focused more on learning backend infrastructure, web3, and genai.
      </p>
      <p className='mt-4'>
        dreaming up ideas and making them come true is where my passion lies. you can find my full{' '}
        <Link href="/stuff" className="relative text-blue-500 font-medium transition-all duration-300 ease-in-out hover:underline hover:text-blue-600">
          <span className="glow-effect">projects list here</span>
        </Link>.
      </p>
      <p className='mt-4'>
        i sometimes write blogs on{' '}
        <Link href="/blog" className="relative text-blue-500 font-medium transition-all duration-300 ease-in-out hover:underline hover:text-blue-600">
          <span className="glow-effect">tech and life here</span>
        </Link>.
      </p>
      <p className='mt-4'>
        outside of programming, i enjoy doing photography, singing, and traveling. some of my photos and music can be found on{' '}
        <Link href="https://instagram.com" className="relative text-blue-500 font-medium transition-all duration-300 ease-in-out hover:underline hover:text-blue-600">
          <span className="glow-effect">instagram</span>
        </Link>.
      </p>
      <style >{`
        .glow-effect {
          text-shadow: 0px 0px 4px rgba(59, 130, 246, 0.6);
        }
        .glow-effect:hover {
          text-shadow: 0px 0px 8px rgba(59, 130, 246, 0.8);
        }
      `}</style>
    </div>
    </div>

  )
}

export default Me;
