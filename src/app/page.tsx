import NavBar from "@/components/NavBar";
import Profile from "@/components/Profile";

export default function Home() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center ">
      <div className="w-full max-w-4xl p-3 sm:p-6 md:p-10">
        <NavBar />
        <div className="mt-8">
          <Profile />
        </div>
      </div>
    </div>
  );
}
