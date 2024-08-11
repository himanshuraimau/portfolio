import React from "react";
import Image from "next/image";
import { RiTwitterXFill } from "react-icons/ri";
import { FaDiscord, FaLinkedin, FaGithub } from "react-icons/fa";

const Profile = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start lg:space-x-20 pt-12 pb-10 px-4 md:px-8 lg:px-12">
      <div className="flex-shrink-0 mb-6 md:mb-0">
        <Image
          src="/profile.jpg"
          alt="Profile Image"
          width={140}
          height={140}
          className="rounded-full outline outline-offset-1 outline-white"
        />
      </div>

      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <div className="pt-4 md:pt-0 space-y-2 md:space-y-0">
          <span className="font-mono font-bold text-cyan-50 hover:text-blue-400 text-2xl md:text-3xl block">
            <a href="/about">hey, i'm himanshu.</a>
          </span>
          <span className="font-mono text-slate-300 text-xl md:text-2xl block">
            i'm a software engineer blending ai and web3.
          </span>
        </div>

        <nav className="flex flex-wrap justify-center md:justify-start mt-4 space-x-4 md:space-x-8">
          <a
            href="https://twitter.com/himanshura_i"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 mb-2"
          >
            <RiTwitterXFill className="text-lg md:text-xl" />
            <span className="text-base md:text-lg hover:text-white">twitter</span>
          </a>

          <a
            href="https://www.linkedin.com/in/himanshu-rai-246121278/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 mb-2"
          >
            <FaLinkedin className="text-lg md:text-xl" />
            <span className="text-base md:text-lg hover:text-blue-700">linkedin</span>
          </a>

          <a
            href="https://github.com/himanshuraimau"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 mb-2"
          >
            <FaGithub className="text-lg md:text-xl" />
            <span className="text-base md:text-lg hover:text-white">github</span>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Profile;
