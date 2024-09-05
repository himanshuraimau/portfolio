import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

const frameworks = [
  { name: 'Next.js', icon: '/icons/nextjs.svg', url: 'https://nextjs.org/' },
  { name: 'React', icon: '/icons/react.svg', url: 'https://reactjs.org/' },
  { name: 'Express', icon: '/icons/expressjs.svg', url: 'https://expressjs.com/' },
  // Add more frameworks here
];

const FrameworkLink = ({ name, icon, url }: {name: string, icon: string, url: string}) => (
  <Link href={url}>
    <div className="inline-flex items-center text-xs border border-gray-200 rounded-sm px-1 py-0.5 border-opacity-30 shadow-[0_0_2px_rgba(59,130,246,0.5)] transition-shadow hover:shadow-[0_0_4px_rgba(59,130,246,0.7)] mr-2 mb-2">
      <Image src={icon} alt={name.toLowerCase()} width={16} height={16} />
      <span className="ml-1">{name}</span>
    </div>
  </Link>
);

const Frameworks = () => {
  return (
    <div className='pt-0.5 pl-2 flex flex-wrap'>
      {frameworks.map((framework) => (
        <FrameworkLink key={framework.name} {...framework} />
      ))}
    </div>
  );
};

const TechStack = () => {
  return (
    <div>  
      <div>          
        <div className='font-mono text-2xl text-center pt-4 '>
          <p>my stack</p>
        </div>
        <div className='flex flex-col pt-4 font-mono text-xl space-y-3'>
          <div>
            languages:
          </div>
          <div className='flex flex-row'>
            frameworks:
            <Frameworks />
          </div>
          <div>
            tools:
          </div>
        </div>
      </div>
    </div>
  )
}

export default TechStack;