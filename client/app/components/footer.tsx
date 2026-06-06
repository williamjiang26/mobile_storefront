"use client";
import { FontAwesomeIcon } from "@/node_modules/@fortawesome/react-fontawesome/dist/index";
import {
  faInstagram,
  faTwitter,
  faYoutube,
  faPinterest,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "@/node_modules/next/navigation";

const Footer = () => {
  const router = useRouter();
  return (
    <div className="relative flex h-125 pt-30 justify-between md:w-[90%] mx-auto bg-yellow-300/30 font-sans dark:bg-black rounded-t-lg text-black/50">
      <div className="absolute m-5 top-0 left-0">Get Active Foods</div>
      <div className="flex flex-col pl-10 w-full">
        {/* follow us */}
        <div className="font-semibold">Get in touch</div>
        <div>Email us</div>
        <div>Call us</div>
        <div className="font-semibold">Follow Us</div>
        <div>
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faTwitter} />
          <FontAwesomeIcon icon={faTiktok} />
          <FontAwesomeIcon icon={faYoutube} />
          <FontAwesomeIcon icon={faPinterest} />
        </div>
      </div>
      <div className="flex flex-col w-full">
        {/* Company */}
        <div className="font-semibold">Company</div>
        <div onClick={() => router.push("/catalog")}>Catalog</div>
        <div onClick={() => router.push("/blog")}>Blog</div>
        <div onClick={() => router.push("/locations")}>Locations</div>
      </div>
      <div className="flex flex-col w-full">
        {/* all product types */}
        <div className="font-semibold">Products</div>
        <div>avocado yogurt</div>
        <div>sous vide chicken breast</div>
        <div>coconut water</div>
        <div>sour plum juice</div>
        <div>dried steak chips</div>
        <div>honey water</div>
      </div>
      <div className="flex flex-col w-full">
        {/* guides */}
        <div className="font-semibold">Support</div>
        <div onClick={() => router.push("/contact")}>Contact</div>
        <div onClick={() => router.push("/guides")}>Guides</div>
        <div>Terms and conditions</div>
        <div>Refund Policy</div>
        <div>Warranty</div>
        <div>FAQ</div>
      </div>
      <div className="flex flex-col w-full">
        {/* guides */}
        <div className="font-semibold">Payment Methods</div>
        <div>VISA</div>
        <div>Mastercard</div>
        <div>Amex</div>
        <div>Apple Pay</div>
        <div>Cash App</div>
        <div>Zelle</div>
      </div>
      {/* <div className="flex flex-col">warranty and policies</div>{" "}
          <div className="flex flex-col">payment methods</div> */}
      <div className="absolute m-5 bottom-0 flex">
        Copywright 2026 @ getactivefoods.com
      </div>
    </div>
  );
};

export default Footer;
