import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#C2185B] text-white pt-10 pb-6 px-6 md:px-12 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold tracking-wide">FindMyMate</h2>
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
              <a href="/dashboard" className="hover:text-[#FFDDEE] transition">
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
              <a href="#" className="hover:text-[#FFDDEE] transition">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FFDDEE] transition">
                FAQ
              </a>
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
            <a href="#" className="hover:text-[#FFDDEE] transition text-xl">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-[#FFDDEE] transition text-xl">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-[#FFDDEE] transition text-xl">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-[#FFDDEE] transition text-xl">
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
