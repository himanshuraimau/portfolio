import React from 'react';
import { PinContainer } from '@/components/ui/3d-pin';
import Image from 'next/image';

const projects = () => {
  return (
    <div className='flex flex-row justify-start items-start flex-wrap'>
      <PinContainer
        title="Mood"
        href="https://mood-nine-omega.vercel.app"
        className="custom-class-name"
        containerClassName="custom-container-class"
      >
        <div>
          <h2>Mood</h2>
          <p>A Gen AI-based journaling application</p>
          <Image src="" alt="" />
        </div>
      </PinContainer>
      <PinContainer
        title="Project Title"
        href="/project-link"
        className="custom-class-name"
        containerClassName="custom-container-class"
      >
        <div>
          <h2>My Project</h2>
          <p>Description of the project.</p>
        </div>
      </PinContainer>
      <PinContainer
        title="Project Title"
        href="/project-link"
        className="custom-class-name"
        containerClassName="custom-container-class"
      >
        <div>
          <h2>My Project</h2>
          <p>Description of the project.</p>
        </div>
      </PinContainer>
    </div>
  );
}

export default projects;
