"use client";

import React, { useEffect, useState } from 'react';
import { PinContainer } from '@/components/ui/3d-pin';
import Image from 'next/image';

const Page = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-row justify-start items-start flex-wrap gap-2 pt-10 h-full">
       <PinContainer
        title="Mood"
        href="https://ama-app-sooty.vercel.app/"
        className="custom-class-name"
        containerClassName="custom-container-class"
      >
        <div className="relative flex flex-col p-3 tracking-tight text-slate-100/50 w-[15rem] h-[13rem]">
          <h2 className="pb-1 m-0 font-bold text-base text-slate-100">
            True Feedback
          </h2>
          <p className="text-sm m-0 p-0 font-normal text-slate-500">
            A app allows users to receive and manage anonymous questions or messages.
          </p>
          <div className="relative flex-1 mt-2 w-full h-full">
            <Image
              src="/AMA.png"
              alt="True Feedback"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>
        </div>
      </PinContainer>
      <PinContainer
        title="Mood"
        href="https://mood-nine-omega.vercel.app"
        className="custom-class-name"
        containerClassName="custom-container-class"
      >
        <div className="relative flex flex-col p-3 tracking-tight text-slate-100/50 w-[15rem] h-[13rem]">
          <h2 className="pb-1 m-0 font-bold text-base text-slate-100">
            Mood
          </h2>
          <p className="text-sm m-0 p-0 font-normal text-slate-500">
            A Gen AI-based journaling application
          </p>
          <div className="relative flex-1 mt-2 w-full h-full">
            <Image
              src="/mood.png"
              alt="Mood Application"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>
        </div>
      </PinContainer>

      <PinContainer
        title="College Nexus"
        href="https://collegenexus.tech"
        className="custom-class-name"
        containerClassName="custom-container-class"
      >
        <div className="relative flex flex-col p-3 tracking-tight text-slate-100/50 w-[15rem] h-[13rem]">
          <h2 className="pb-1 m-0 font-bold text-base text-slate-100">
            College Nexus
          </h2>
          <p className="text-sm m-0 p-0 font-normal text-slate-500">
            A Web Application for College Students
          </p>
          <div className="relative flex-1 mt-2 w-full h-full">
            <Image
              src="/college-nexus.png"
              alt="College Nexus Application"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>
        </div>
      </PinContainer>

      <PinContainer
        title="Music School"
        href="https://music-school-nextjs-lime-1.vercel.app"
        className="custom-class-name"
        containerClassName="custom-container-class"
      >
        <div className="relative flex flex-col p-3 tracking-tight text-slate-100/50 w-[15rem] h-[13rem]">
          <h2 className="pb-1 m-0 font-bold text-base text-slate-100">
            Music School
          </h2>
          <p className="text-sm m-0 p-0 font-normal text-slate-500">
            A Nextjs Frontend Application using Aceternity UI
          </p>
          <div className="relative flex-1 mt-2 w-full h-full">
            <Image
              src="/music-school.png"
              alt="Music School Application"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>
        </div>
      </PinContainer>
    </div>
  );
}

export default Page;
