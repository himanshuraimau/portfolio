import React from "react";
import Image from "next/image";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Profile = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center mt-12 text-lg leading-7 space-y-6 md:space-y-0 md:space-x-12">
      <div className="flex-shrink-0">
        <Image
          src="/profile.jpg"
          alt="Profile Image"
          width={180}
          height={180}
          className="rounded-full outline outline-offset-1 outline-white"
        />
      </div>

      <div className="flex flex-col items-center md:items-start md:mt-0">
        <div className="text-center md:text-left">
          <span className="font-bold hover:text-blue-400 text-4xl">
            <a href="/about">Hey, I'm Himanshu.</a>
          </span>
          <br />
          <span className="font-bold text-2xl">I'm a software engineer.</span>
        </div>

        <nav className="flex items-center mt-4 space-x-8 justify-center md:justify-start">
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
