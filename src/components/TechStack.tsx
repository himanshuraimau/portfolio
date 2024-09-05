import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const techStack = {
  languages: [
    { name: 'JavaScript', icon: '/icons/JavaScript.svg', url: 'https://www.javascript.com/' },
    { name: 'TypeScript', icon: '/icons/TypeScript.svg', url: 'https://www.typescriptlang.org/' },
    { name: 'Go', icon: '/icons/go.svg', url: 'https://golang.org/' },
    { name: 'Python', icon: '/icons/python.webp', url: 'https://www.python.org/' },
    { name: 'Rust', icon: '/icons/rust.svg', url: 'https://www.rust-lang.org/' },
    { name: 'C++', icon: '/icons/Cpp.svg', url: 'https://isocpp.org/' },
    { name: 'C', icon: '/icons/C.svg', url: 'https://www.iso.org/standard/74528.html'},
  ],
  frameworks: [
    { name: 'Next.js', icon: '/icons/nextjs.svg', url: 'https://nextjs.org/' },
    { name: 'React', icon: '/icons/react.svg', url: 'https://reactjs.org/' },
    { name: 'Express', icon: '/icons/expressjs.svg', url: 'https://expressjs.com/' },
    { name: 'NodeJS', icon: '/icons/Node.js.svg', url: 'https://nodejs.org/' },
    { name: 'Tailwind', icon: '/icons/Tailwind.svg', url: 'https://tailwindcss.com/' }
  ],
  // blockchainTech: [
  //   { name: 'Ethereum', icon: '/icons/ethereum.svg', url: 'https://ethereum.org/' },
  //   { name: 'Solidity', icon: '/icons/solidity.svg', url: 'https://soliditylang.org/' },
  //   { name: 'Blockchain', icon: '/icons/blockchain.svg', url: 'https://blockchain.com/' },
  // ],
  tools: [
    { name: 'Git', icon: '/icons/Git.svg', url: 'https://git-scm.com/' },
    { name: 'Docker', icon: '/icons/Docker.svg', url: 'https://www.docker.com/' },
    { name: 'Postman', icon: '/icons/Postman.svg', url: 'https://www.postman.com/' },
    { name: 'Bash', icon: '/icons/Bash.svg', url: 'https://www.gnu.org/software/bash/' },
    { name: 'AWS', icon: '/icons/AWS.svg', url: 'https://aws.amazon.com/' }
  ]
};

const TechLink = ({ name, icon, url }: {name: string, icon: string, url: string}) => (
  <Link href={url}>
    <div className="inline-flex items-center text-xs border border-gray-200 rounded-sm px-1 py-0.5 border-opacity-30 shadow-[0_0_2px_rgba(59,130,246,0.5)] transition-shadow hover:shadow-[0_0_4px_rgba(59,130,246,0.7)] mr-2 mb-2">
      <Image src={icon} alt={name.toLowerCase()} width={16} height={16} />
      <span className="ml-1">{name}</span>
    </div>
  </Link>
);

const TechCategory = ({ category, title }: {category: {name: string, icon: string, url: string}[], title: string}) => (
  <div className='flex flex-row'>
    <span className='font-semibold'>{title}:</span>
    <div className='pt-0.5 pl-2 flex flex-wrap'>
      {category.map((item) => (
        <TechLink key={item.name} {...item} />
      ))}
    </div>
  </div>
);

const TechStack = () => {
  return (
    <div>  
      <div>          
        <div className='font-mono text-2xl text-center pt-6 '>
          <p>my stack</p>
        </div>
        <div className='pt-6 font-mono text-md space-y-3'>
          <TechCategory category={techStack.languages} title="languages" />
          <TechCategory category={techStack.frameworks} title="frameworks/tech" />
          {/* <TechCategory category={techStack.blockchainTech} title="Blockchain Tech" /> */}
          <TechCategory category={techStack.tools} title="tools" />
        </div>
      </div>
    </div>
  );
};

export default TechStack;
