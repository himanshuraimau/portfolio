import React from 'react';
import { PinContainer } from '@/components/ui/3d-pin';

const projects = () => {
  return (
    <div>
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
