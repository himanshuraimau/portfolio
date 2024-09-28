"use client";

import React, { useEffect, useState } from 'react';
import { PinContainer } from '@/components/ui/3d-pin';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const projects = [
  {
    title: "True Feedback",
    href: "https://ama-app-sooty.vercel.app/",
    description: "An app that allows users to receive and manage anonymous questions or messages.",
    imageSrc: "/AMA.png",
    imageAlt: "True Feedback Application"
  },
  {
    title: "Mood",
    href: "https://mood-nine-omega.vercel.app",
    description: "A Gen AI-based journaling application",
    imageSrc: "/mood.png",
    imageAlt: "Mood Application"
  },
  {
    title: "College Nexus",
    href: "https://collegenexus.tech",
    description: "A Web Application for College Students",
    imageSrc: "/college-nexus.png",
    imageAlt: "College Nexus Application"
  },
  {
    title: "Music School",
    href: "https://music-school-nextjs-lime-1.vercel.app",
    description: "A Nextjs Frontend Application using Aceternity UI",
    imageSrc: "/music-school.png",
    imageAlt: "Music School Application"
  }
];

const Page = () => {
  const [isClient, setIsClient] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="h-full container mx-auto px-4 py-8 ">
      <div className="flex flex-wrap justify-center gap-4">
        {projects.map((project, index) => (
          <div key={index} className="w-full sm:w-auto">
            <PinContainer
              title={project.title}
              href={project.href}
              className="custom-class-name dark:bg-black"
              containerClassName="custom-container-class"
            >
              <div className="relative flex flex-col p-3 tracking-tight text-slate-100/50 dark:text-slate-300/50 w-[15rem] h-[13rem]">
                <h2 className="pb-1 m-0 font-bold text-base text-black dark:text-white">
                  {project.title}
                </h2>
                <p className="text-sm m-0 p-0 font-normal text-slate-500 dark:text-slate-400">
                  {project.description}
                </p>
                <div className="relative flex-1 mt-2 w-full h-full">
                  <Image
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;