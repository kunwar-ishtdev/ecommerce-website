import Link from 'next/link';
import { Mail, Phone, Share2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0f172a] border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-bold text-white tracking-tight">
              AERO<span className="text-[var(--accent)]">GEAR</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Premium streetwear engineered for performance and styled for the streets. Elevate your everyday.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Shop</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/collections/new" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link href="/collections/best-sellers" className="hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Connect</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-slate-400 hover:text-[var(--accent)] transition-colors">
                <Share2 className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-[var(--accent)] transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-[var(--accent)] transition-colors">
                <Phone className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-slate-500">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} AeroGear. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
