import Link from 'next/link'
import React from 'react'

const Me = () => {
  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-3 lg:px-3 py-8 sm:py-12">
      <h2 className="font-mono text-2xl sm:text-3xl text-center text-cyan-800 dark:text-cyan-50 mb-8">
        More about me
      </h2>
      <div className="font-mono text-sm sm:text-base text-gray-700 dark:text-slate-300 space-y-6">
        <p>
          I am a full stack developer based in Bangalore, currently pursuing engineering in artificial intelligence and data science.
          Currently focused more on learning backend infrastructure, web3, and genai.
        </p>
        <p>
          Dreaming up ideas and making them come true is where my passion lies. You can find my full{' '}
          <Link href="/stuff" className="text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 transition-colors duration-300 relative group">
            <span className="glow-effect">projects list here</span>
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-green-600 dark:bg-green-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>.
        </p>
        <p>
          I sometimes write blogs on{' '}
          <Link href="/blog" className="text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 transition-colors duration-300 relative group">
            <span className="glow-effect">tech and life here</span>
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-green-600 dark:bg-green-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>.
        </p>
        <p>
          Outside of programming, I enjoy doing photography, singing, and traveling. Some of my photos and music can be found on{' '}
          <Link href="https://www.instagram.com/enghimanshu" className="text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 transition-colors duration-300 relative group">
            <span className="glow-effect">Instagram</span>
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-green-600 dark:bg-green-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>.
        </p>
      </div>
      <style>{`
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
