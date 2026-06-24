import { useRouter } from "@/node_modules/next/navigation";



const NavPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full border rounded-t-lg p-3 sm:p-7">
      {/* <div className="">bottom nav</div> */}
      <div className="flex justify-between w-[80%] mx-auto text-lg">
        <div onClick={() => router.push("/explore")}>explore</div>
        <div onClick={() => router.push("/catalog")}>catalog</div>
        <div onClick={() => router.push("/bag")}>bag</div>
      </div>
    </div>
  );
};

export default NavPage;
