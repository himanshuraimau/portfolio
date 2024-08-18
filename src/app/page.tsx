import NavBar from "@/components/NavBar";
import Profile from "@/components/Profile";

export default function Home() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center ">
      <div className="w-full max-w-4xl pl-3 pr-3 sm:pl-6 sm:pr-6 md:pl-10 md:pr-10" >
        <NavBar />
        <div className="mt-8">
          <Profile />
        </div>
      </div>
    </div>
  );
}
