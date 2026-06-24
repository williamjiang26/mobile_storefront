"use client";
import Header from "../../components/header";
import BottomNav from "../bottomNav";

const Page = () => {
  return (
    <div className="max-h-screen w-full flex flex-col">
      <Header />
      <main className="space-y-5 overflow-y-auto mt-27 h-screen scroll-smooth">
        {[
          "Leave a review +10 points",
          "+10 points",
          "+10 points",
          "+10 points",
          "+10 points",
        ].map((c) => (
          <div className="border rounded-lg mx-auto px-5 py-3 flex justify-between w-[90%]">
            <div className="flex flex-col">
              <div className="text-xl"># 16000</div>{" "}
              <div className="text-sm">9/25/24</div>
            </div>
            <div className="flex flex-col justify-center">
              <div>+ 210 points</div>
            </div>
          </div>
        ))}
      </main>
      {/* bottom buttons */}
      <BottomNav />
    </div>
  );
};

export default Page;
