import React from "react";
import Image from "next/image";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Profile = () => {
  return (
    <div className="flex flex-col  md:flex-row  md:justify-start lg:justify-between items-center md:items-start lg:space-x-20 pt-12 pb-10 space-x-8">
      <div className="flex-shrink-0 mb-6 md:mb-0">
        <Image
          src="/profile.jpg"
          alt="Profile Image"
          width={140}
          height={140}
          className="rounded-full outline outline-offset-1 outline-white"
        />
      </div>

      <div className="flex flex-col items-center pt-2 md:items-start text-center md:text-left">
        <div className="pt-7 md:pt-0">
          <span className="font-sans font-bold text-cyan-50 hover:text-blue-400 text-3xl block">
            <a href="/about">Hey, I'm Himanshu.</a>
          </span>
          <span className="font-sans text-slate-300 text-3xl block">
            I'm a software engineer.
          </span>
        </div>

        <nav className="flex  justify-center md:justify-start mt-4 space-x-4 md:space-x-8">
          <a
            href="https://twitter.com/himanshura_i"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2"
          >
            <RiTwitterXFill style={{ color: "white" }} />
            <span className="text-xl hover:text-white">Twitter</span>
          </a>

          <a
            href="https://www.instagram.com/enghimanshu/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2"
          >
            <FaInstagram style={{ color: "red" }} />
            <span className="hover:text-red-700">Instagram</span>
          </a>

          <a
            href="https://www.linkedin.com/in/himanshu-rai-246121278/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2"
          >
            <FaLinkedin style={{ color: "blue" }} />
            <span className="hover:text-blue-700">LinkedIn</span>
          </a>

          <a
            href="https://github.com/himanshuraimau"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2"
          >
            <FaGithub />
            <span className="text-white-800 hover:text-white-400">Github</span>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Profile;
