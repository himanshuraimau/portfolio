import React from "react";
import Image from "next/image";
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Profile = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start lg:space-x-20 pt-8 sm:pt-12 pb-10 px-4 sm:px-8 lg:px-14 max-w-5xl mx-auto">
      <div className="flex-shrink-0 mb-6 sm:mb-0 transition-transform duration-300 hover:scale-105">
        <Image
          src="/profile.jpg"
          alt="Profile Image"
          width={160}
          height={160}
          className="rounded-full outline outline-2 outline-offset-4 outline-cyan-400 shadow-lg shadow-cyan-500/50"
        />
      </div>

      <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
        <div className="pt-4 sm:pt-0 space-y-3 sm:space-y-2">
          <h1 className="font-mono font-bold text-cyan-50 hover:text-cyan-400 transition-colors duration-300 text-3xl sm:text-4xl">
            <a href="/about">hey, i'm himanshu.</a>
          </h1>
          <p className="font-mono text-slate-300 text-xl sm:text-2xl max-w-md">
            i'm a full-stack devloper who loves building cool projects.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center sm:justify-start mt-6 gap-4 sm:gap-6">
          {[
            { href: "https://twitter.com/himanshura_i", icon: RiTwitterXFill, label: "twitter", hoverColor: "hover:text-blue-400" },
            { href: "https://www.linkedin.com/in/himanshu-rai-246121278/", icon: FaLinkedin, label: "linkedin", hoverColor: "hover:text-blue-700" },
            { href: "https://github.com/himanshuraimau", icon: FaGithub, label: "github", hoverColor: "hover:text-white" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-2 transition-colors duration-300 ${link.hoverColor}`}
            >
              <link.icon className="text-xl sm:text-2xl" />
              <span className="text-base sm:text-lg">{link.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Profile;
