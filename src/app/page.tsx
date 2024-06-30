import NavBar from "@/components/NavBar";
import Profile from "@/components/Profile";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <div className="w-full sm:w-[80%] md:w-[50%] h-screen mx-auto">
        <div className="p-3 h-full">
          <NavBar />
          <Profile />
        </div>
      </div>
    </div>
  );
}
