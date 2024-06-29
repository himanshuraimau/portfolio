import React from "react";
import Image from "next/image";
import {RiTwitterXFill} from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Profile = () => {
  return (
    <div className="flex flex-row items-start justify-center mt-12 text-lg leading-7 space-x-12">
    
      <div className="flex justify-start ">
        <Image
          src="/profile.jpg"
          alt="Profile Image"
          width={180}
          height={180}
          className="rounded-full outline outline-offset-1 outline-white"
        />
      </div>
      
     
      <div className="flex flex-col  mt-9">
        <div className="">
          <span className="font-bold text-accent-orange text-4xl">
            <a href="/about">Hey, I'm Himanshu.</a>
          </span>
          <br />
          <span className="font-bold text-2xl">I'm a software engineer.</span>
        </div>
        
        <nav className="flex items-center mt-4 space-x-8 justify-start">
        <a
              href="https://twitter.com/himanshura_i"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <RiTwitterXFill style={{color:"white"}} />
              <span className="text-xl">Twitter</span>
            </a>

         
          <a
              href="https://www.instagram.com/enghimanshu/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
                <FaInstagram style={{color:"red"}}/>
              <span>Instagram</span>
            </a>

          <a
              href="https://www.linkedin.com/in/himanshu-rai-246121278/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
                <FaLinkedin style={{color:"blue"}} />
              <span>LinkedIn</span>
            </a>
          
          <a
              href="https://github.com/himanshuraimau"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
                <FaGithub />
              <span>Github</span>
            </a>
        </nav>
      </div>
    </div>
  );
};

export default Profile;
