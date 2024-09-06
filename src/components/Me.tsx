import Link from 'next/link'
import React from 'react'

const Me = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h2 className='font-mono text-2xl sm:text-3xl text-center text-cyan-50 mb-8'>
        more about me
      </h2>
      <div className='font-mono text-sm sm:text-base text-slate-300 space-y-6'>
        <p>
          i am a full stack developer based in bangalore, currently pursuing engineering in artificial intelligence and data science. 
          currently focused more on learning backend infrastructure, web3, and genai.
        </p>
        <p>
          dreaming up ideas and making them come true is where my passion lies. you can find my full{' '}
          <Link href="/stuff" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 relative group">
            <span className="glow-effect">projects list here</span>
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>.
        </p>
        <p>
          i sometimes write blogs on{' '}
          <Link href="/blog" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 relative group">
            <span className="glow-effect">tech and life here</span>
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>.
        </p>
        <p>
          outside of programming, i enjoy doing photography, singing, and traveling. some of my photos and music can be found on{' '}
          <Link href="https://www.instagram.com/enghimanshu" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 relative group">
            <span className="glow-effect">instagram</span>
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>.
        </p>
      </div>
      <style >{`
        .glow-effect {
          text-shadow: 0 0 4px rgba(34, 211, 238, 0.6);
        }
        .glow-effect:hover {
          text-shadow: 0 0 8px rgba(34, 211, 238, 0.8);
        }
      `}</style>
    </div>
  )
}

export default Me;
