import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-4 sm:pb-6 lg:pb-8">
      <div className="relative">
        <div className="relative rounded-[20px] border-2 border-black/40 bg-black/40 backdrop-blur-sm overflow-hidden">
          <div className="px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Company Info */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-3">Metzium</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Building exceptional digital experiences with modern technologies and expert craftsmanship.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-3">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/#home" className="text-gray-400 text-sm hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/#services" className="text-gray-400 text-sm hover:text-white transition-colors">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/#featured-projects" className="text-gray-400 text-sm hover:text-white transition-colors">
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link href="/#about" className="text-gray-400 text-sm hover:text-white transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-400 text-sm hover:text-white transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-3">Get in Touch</h3>
                <ul className="space-y-2">
                  <li className="text-gray-400 text-sm">
                    Email: info@metzium.com
                  </li>
                  <li className="text-gray-400 text-sm">
                    Phone: +31 (0) 123 456 789
                  </li>
                  <li className="text-gray-400 text-sm">
                    Amsterdam, Netherlands
                  </li>
                </ul>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-sm">
                  &copy; {new Date().getFullYear()} Metzium. All rights reserved.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                  <span className="text-gray-600">|</span>
                  <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
