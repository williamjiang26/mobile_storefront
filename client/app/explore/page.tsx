"use client";
import Header from "../components/header";
import NavPage from "../components/nav";

const Page = () => {
  return (
    <div className="flex flex-col max-h-screen ">
      <Header />
      <div className="mt-28 h-screen">{/* what's the feature */}</div>
      <NavPage />
    </div>
  );
};

export default Page;
