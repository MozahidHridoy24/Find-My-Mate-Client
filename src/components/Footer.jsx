import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import logo from "../assets/logo1.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#C2185B] text-white pt-10 pb-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />
            <h2 className="text-2xl font-bold tracking-wide">FindMyMate</h2>
          </div>
          <p className="text-sm mt-2">
            Connecting hearts with trust and tradition. Find your perfect match
            with us.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-[#FFDDEE] transition">
                Home
              </a>
            </li>
            <li>
              <a href="/biodatas" className="hover:text-[#FFDDEE] transition">
                Biodatas
              </a>
            </li>
            <li>
              <a
                href="/dashboard/home"
                className="hover:text-[#FFDDEE] transition"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-[#FFDDEE] transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-xl font-semibold mb-3">About</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-[#FFDDEE] transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <Link to="/terms" className="hover:text-[#FFDDEE] transition">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-[#FFDDEE] transition">
                FAQ
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-[#FFDDEE] transition">
                Support
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/mujahidulislam.hridoy"
              className="hover:text-[#FFDDEE] transition text-xl"
              target="blank"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/mozahid_hridoy/"
              className="hover:text-[#FFDDEE] transition text-xl"
              target="blank"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/mozahidul-islam-hridoy/"
              className="hover:text-[#FFDDEE] transition text-xl"
              target="blank"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/MozahidHridoy24"
              className="hover:text-[#FFDDEE] transition text-xl"
              target="blank"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-8 border-t border-white/20 pt-4 text-sm text-center">
        &copy; {new Date().getFullYear()} Matrimony. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
