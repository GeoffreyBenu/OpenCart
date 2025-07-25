
import React from 'react';
import { Car, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-emerald-800 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Car className="text-emerald-600" size={20} />
              </div>
              <span className="text-xl font-bold">MagariSeller Auto</span>
            </div>
            <p className="text-emerald-100">
              Your trusted partner for premium cars at unbeatable prices. Quality guaranteed.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-emerald-100 hover:text-white transition-colors">
                Browse Cars
              </Link>
              <Link to="/cart" className="block text-emerald-100 hover:text-white transition-colors">
                Shopping Cart
              </Link>
              <Link to="/orders" className="block text-emerald-100 hover:text-white transition-colors">
                Track Orders
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <div className="space-y-2">
              <div className="text-emerald-100">Luxury Sedan</div>
              <div className="text-emerald-100">Sports Coupe</div>
              <div className="text-emerald-100">Electric Cars</div>
              <div className="text-emerald-100">SUVs</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-emerald-100">
                <Phone size={16} />
                <span>(+254)  712-345 678</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-100">
                <Mail size={16} />
                <span>info@magariseller.com</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-100">
                <MapPin size={16} />
                <span>123 Auto Plaza, Car City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-700 mt-8 pt-8 text-center">
          <p className="text-emerald-100">
            © 2025 MagariSeller Auto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
