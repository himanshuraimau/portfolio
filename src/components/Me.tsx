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
          I am a full stack developer <span className='text-white text-md wavy-decoration decoration-yellow-400'>based in Bangalore</span>, currently pursuing engineering in artificial intelligence and data science. Currently focused more on learning distributed systems, machine learning, and GenAI.
        </p>
        <p>
          Dreaming up ideas and making them come true is where my passion lies. You can find my full{' '}
          <Link href="/stuff" className="text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 transition-colors duration-300 relative group">
            <span className="glow-effect wavy-decoration decoration-green-400">projects list here</span>
          </Link>.
        </p>
        <p>
          I sometimes write blogs on{' '}
          <Link href="/blog" className="text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 transition-colors duration-300 relative group">
            <span className="glow-effect decoration-wavy decoration-green-400 underline underline-offset-4 ">tech and life here</span>
          </Link>.
        </p>
        <p>
          Outside of programming, I enjoy doing photography, singing, and traveling. Some of my photos and music can be found on{' '}
          <Link href="https://www.instagram.com/enghimanshu" className="text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 transition-colors duration-300 relative group">
            <span className="glow-effect decoration-wavy decoration-green-400 underline underline-offset-4">Instagram</span>
          </Link>.
        </p>
      </div>
      <style>{`
        .glow-effect {
          text-shadow: 0 0 4px rgba(34, 211, 238, 0.6);
        }
      `}</style>
    </div>
  )
}

export default Me;
