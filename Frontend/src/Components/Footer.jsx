import { Facebook, Twitter, Linkedin, Mail, Phone } from "react-feather";
import logo from '../assets/Logo.png'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 px-6 py-10 mt-10">
            <div className="grid md:grid-cols-4 gap-8">

                {/* Brand */}
                <div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                           <img src={logo} alt="logo" className="w-[90%] h-[90%] " />
                        </div>
                        <span className="font-logo text-xl font-bold text-white">
                            Medi<span className="text-cyan-300">Locker</span>
                        </span>
                    </div>

                    <p className="mt-3 text-sm text-gray-400">
                        Securely manage and track medical records and transactions with ease.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-medium mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white">Dashboard</a></li>
                        <li><a href="#" className="hover:text-white">Records</a></li>
                        <li><a href="#" className="hover:text-white">Transactions</a></li>
                        <li><a href="#" className="hover:text-white">Profile</a></li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h3 className="text-white font-medium mb-3">Legal</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
                        <li><a href="#" className="hover:text-white">Security</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-medium mb-3">Contact</h3>
                    <div className="flex items-center gap-2 text-sm mb-2">
                        <Mail size={16} /> support@MediLocker.com
                    </div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                        <Phone size={16} /> +91 98765 43210
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4 mt-3">
                        <Facebook className="cursor-pointer   hover:text-white" />
                        <Twitter className="cursor-pointer   hover:text-white" />
                        <Linkedin className="cursor-pointer   hover:text-white" />
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t font-logo border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
                © 2026 MediLocker. All rights reserved.
            </div>
        </footer>
    );
}