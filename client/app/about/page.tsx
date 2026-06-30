import Footer from "../components/footer";
import Header from "../components/header";
//
//
//
const Page = () => {
  return ( 
    <div>
      <div className="flex flex-col justify-center h-screen items-center ">
        <Header />
        <div className="flex flex-col w-[90%] mx-auto space-y-1">About</div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
