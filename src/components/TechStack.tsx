import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const techStack = {
  languages: [
    { name: 'JavaScript', icon: '/icons/JavaScript.svg', url: 'https://www.javascript.com/' },
    { name: 'TypeScript', icon: '/icons/TypeScript.svg', url: 'https://www.typescriptlang.org/' },
    { name: 'Go', icon: '/icons/go.svg', url: 'https://golang.org/' },
    { name: 'Python', icon: '/icons/Python.svg', url: 'https://www.python.org/' },
    { name: 'Rust', icon: '/icons/rust.svg', url: 'https://www.rust-lang.org/' },
    { name: 'C++', icon: '/icons/Cpp.svg', url: 'https://isocpp.org/' },
    { name: 'C', icon: '/icons/C.svg', url: 'https://www.iso.org/standard/74528.html'},
  ],
  frameworks: [
    { name: 'Next.js', icon: '/icons/nextjs.svg', url: 'https://nextjs.org/' },
    { name: 'React', icon: '/icons/react.svg', url: 'https://reactjs.org/' },
    { name: 'Express', icon: '/icons/expressjs.svg', url: 'https://expressjs.com/' },
    { name: 'NodeJS', icon: '/icons/Node.js.svg', url: 'https://nodejs.org/' },
    { name: 'Tailwind', icon: '/icons/Tailwind.svg', url: 'https://tailwindcss.com/' },
    {name: 'FastApi', icon: '/icons/FastAPI.svg', url: 'https://fastapi.com/'},
  ],
  databases: [
    { name: 'MongoDB', icon: '/icons/MongoDB.svg', url: 'https://www.mongodb.com/' },
    { name: 'PostgreSQL', icon: '/icons/PostgresSQL.svg', url: 'https://www.postgresql.org/' },
    {name:'Redis', icon: '/icons/Redis.svg', url: 'https://redis.io/'},
    {name:'SQLite', icon: '/icons/SQLite.svg', url: 'https://www.sqlite.org/'},
  ],
  tools: [
    { name: 'Git', icon: '/icons/Git.svg', url: 'https://git-scm.com/' },
    { name: 'Docker', icon: '/icons/Docker.svg', url: 'https://www.docker.com/' },
    { name: 'Postman', icon: '/icons/Postman.svg', url: 'https://www.postman.com/' },
    { name: 'Bash', icon: '/icons/Bash.svg', url: 'https://www.gnu.org/software/bash/' },
    { name: 'AWS', icon: '/icons/AWS.svg', url: 'https://aws.amazon.com/' },
    {name: 'Linux', icon: '/icons/Linux.svg', url: 'https://Linux.com/'},
    {name:'Bun', icon: '/icons/Bun.svg', url: 'https://bun.sh/'},
    {name:'npm', icon: '/icons/NPM.svg', url: 'https://www.npmjs.com/'},
  ]
};

const TechLink = ({ name, icon, url }: {name: string, icon: string, url: string}) => (
  <Link href={url} target="_blank" rel="noopener noreferrer">
    <div className="inline-flex items-center text-xs border border-gray-200 rounded-sm px-1 py-0.5 border-opacity-30 shadow-[0_0_2px_rgba(59,130,246,0.5)] transition-shadow hover:shadow-[0_0_4px_rgba(59,130,246,0.7)] mr-2 mb-2">
      <Image src={icon} alt={name.toLowerCase()} width={16} height={16} />
      <span className="ml-1">{name}</span>
    </div>
  </Link>
);

const TechCategory = ({ category, title }: {category: {name: string, icon: string, url: string}[], title: string}) => (
  <div className='flex flex-col sm:flex-row sm:items-start'>
    <span className='font-semibold mb-2 sm:mb-0 sm:mr-4 sm:w-32'>{title}:</span>
    <div className='flex flex-wrap'>
      {category.map((item) => (
        <TechLink key={item.name} {...item} />
      ))}
    </div>
  </div>
);

const TechStack = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h2 className='font-mono text-xl sm:text-3xl text-center mb-8'>
        My stack
      </h2>
      <div className='font-mono text-lg space-y-6'>
        <TechCategory category={techStack.languages} title="languages" />
        <TechCategory category={techStack.frameworks} title="frameworks" />
        <TechCategory category={techStack.databases} title="databases" />
        <TechCategory category={techStack.tools} title="tools" />
      </div>
    </div>
  );
};

export default TechStack;