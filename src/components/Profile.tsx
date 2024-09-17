import React from "react";
import Image from "next/image";
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import TechStack from "./TechStack";
import Me from "./Me";

const Profile = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0 md:space-x-8 py-8 md:py-12">
        <div className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
          <Image
            src="/file.jpg"
            alt="Profile Image"
            width={120}
            height={120}
            className="rounded-full outline outline-2 outline-offset-4 outline-cyan-400 shadow-lg shadow-cyan-500/50"
          />
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl">
          <div className="space-y-3">
            <h1 className="font-mono font-bold text-white hover:text-green-300  transition-colors duration-300 text-3xl sm:text-4xl lg:text-5xl">
                   Hey, i'm himanshu.
            </h1>
            <p className="font-mono text-slate-300 text-lg sm:text-xl lg:text-2xl">
              I'm a full-stack developer who loves building cool products.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center md:justify-start mt-6 gap-4">
            {[
              { href: "https://twitter.com/himanshura_i", icon: RiTwitterXFill, label: "twitter", hoverColor: "hover:text-blue-400" },
              { href: "https://www.linkedin.com/in/himanshu-rai-246121278/", icon: FaLinkedin, label: "linkedin", hoverColor: "hover:text-blue-600" },
              { href: "https://github.com/himanshuraimau", icon: FaGithub, label: "github", hoverColor: "hover:text-gray-600" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-2 transition-colors duration-300 ${link.hoverColor}`}
              >
                <link.icon className="text-xl sm:text-2xl" />
                <span className="text-sm sm:text-base">{link.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
      <TechStack />
      <Me />
    </div>
  );
};

export default Profile;