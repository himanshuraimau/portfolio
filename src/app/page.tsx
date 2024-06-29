
import NavBar from "@/components/NavBar";
import Profile from "@/components/Profile";
import Image from "next/image";
import Link from 'next/link';



export default function Home() {
  return (
    <div className="bg-black h-screen">
  <div className="mx-auto max-w-47.5rem p-6 text-base leading-34 tracking-wide">
    <NavBar />
    <Profile />
  </div>
</div>

 
  );
}
