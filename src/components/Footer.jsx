import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";


import PayPalLogo from "../assets/PayPal.svg.png";
import VisaLogo from "../assets/visaLogo.svg";
import MasterCardLogo from "../assets/MasterCardLogo.svg";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h2 className="font-bold text-lg mb-4">ABOUT US</h2>
          <p className="text-sm leading-relaxed">
            TrendyWear is your go-to online fashion store bringing you the latest
            styles in clothing, footwear, and accessories from top brands around
            the world. Dress in style, dress with confidence.
          </p>
          <div className="flex items-center gap-5 mt-4 opacity-80">
            <img src={PayPalLogo} alt="PayPal" className="h-6" />
            <img src={VisaLogo} alt="Visa" className="h-6" />
            <img src={MasterCardLogo} alt="MasterCard" className="h-6" />
          </div>
        </div>

        {/* Follow Us */}
        <div>
          <h2 className="font-bold text-lg mb-4">FOLLOW US</h2>
          <p className="text-sm">Check out our content on social channels.</p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-gray-400">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>

        {/* Returns */}
        <div>
          <h2 className="font-bold text-lg mb-4">RETURNS</h2>
          <p className="text-sm">
            Want to return your items? Please check the{" "}
            <a href="#" className="underline hover:text-gray-400">
              return policy
            </a>{" "}
            first to continue the return process.
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="font-bold text-lg mb-4">NEWSLETTER SIGN UP</h2>
          <p className="text-sm mb-4">
            Get the latest fashion drops and arrivals from TrendyWear.
          </p>
          <form className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your name"
              className="p-2 rounded text-black"
            />
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded text-black"
            />
            <button
              type="submit"
              className="bg-white text-black py-2 rounded font-semibold hover:bg-gray-300 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="text-center text-sm text-gray-400 mt-8">
        © {new Date().getFullYear()} TrendyWear. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
