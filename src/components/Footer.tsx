import React from 'react';
import Link from 'next/link';
import { FaLinkedin, FaGithub, FaInstagram, FaDiscord } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';

const socialLinks = [
  { name: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com/in/himanshu-rai-246121278/' },
  { name: 'GitHub', icon: FaGithub, url: 'https://github.com/himanshuraimau' },
  { name: 'X', icon: RiTwitterXFill, url: 'https://twitter.com/himanshura_i' },
  { name: 'Email', icon: MdEmail, url: 'mailto:himanshuraimau9@gmail.com' },
  { name: 'Instagram', icon: FaInstagram, url: 'https://www.instagram.com/enghimanshu' },
  { name: 'Discord', icon: FaDiscord, url: 'https://discordapp.com/users/himanshurai' },
];

const Footer = () => {
  return (
    <footer className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12 border-t border-subtle">
      <div className="flex flex-col items-center">
        <p className="font-mono text-sm mb-4">find me on:</p>
        <div className="flex space-x-4">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text/60 hover:text-accent-secondary transition-colors duration-300"
              aria-label={link.name}
            >
              <link.icon className="w-6 h-6" />
            </Link>
          ))}
        </div>
        <p className="font-mono text-xs mt-6 text-text/50">
          © {new Date().getFullYear()} Himanshu Rai. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;