"use client";

import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-primary text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="animate-slideInLeft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-lg">SC</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Smart CS</h3>
                <p className="text-sm text-white/80">Crop Health Monitor</p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">
              Advanced AI and IoT solutions for monitoring crop and soil health in real-time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-slideInLeft" style={{ animationDelay: "0.1s" }}>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-white/80 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/80 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#upload" className="text-white/80 hover:text-white transition-colors">
                  Upload
                </a>
              </li>
              <li>
                <a href="#dashboard" className="text-white/80 hover:text-white transition-colors">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-slideInRight" style={{ animationDelay: "0.1s" }}>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Mail size={20} />
                <span className="text-white/80">info@smartcs.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} />
                <span className="text-white/80">+92111222333</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={20} />
                <span className="text-white/80"> Barakahu / Islamabad</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="animate-slideInRight">
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="grid md:grid-cols-2 gap-4 text-center md:text-left">
            <p className="text-white/80">© 2025 Smart CS. All rights reserved.</p>
            <div className="flex justify-center md:justify-end gap-6">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
