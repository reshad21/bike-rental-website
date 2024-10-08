import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks"; // Import useAppSelector to get the theme
import Container from "./Container";

const Footer = () => {
  const theme = useAppSelector((state) => state.theme.mode); // Get the theme from Redux

  return (
    <footer
      className={`p-8 mt-10 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      <Container>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Information */}
          <div>
            <h2 className="text-xl font-bold mb-4">Your Company</h2>
            <p>123 Street Name, City, State 12345</p>
            <p>Email: contact@yourcompany.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>

          {/* Navigation Links */}
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/termsof-service" className="hover:text-primary">
                  Terms Of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div>
            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <Link to="https://facebook.com" className="hover:text-primary">
                <FaFacebook size={24} />
              </Link>
              <Link to="https://twitter.com" className="hover:text-primary">
                <FaTwitter size={24} />
              </Link>
              <Link to="https://instagram.com" className="hover:text-primary">
                <FaInstagram size={24} />
              </Link>
              <Link to="https://linkedin.com" className="hover:text-primary">
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p>
            &copy; {new Date().getFullYear()}All rights reserved.
            <Link to="/" className="text-primary">
              www.quickride.com
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
