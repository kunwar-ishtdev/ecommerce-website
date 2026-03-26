'use client';

import Link from 'next/link';
import { ShoppingCart, User, Menu, Search, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { logout } from '@/lib/slices/authSlice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo) as any;

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    router.push('/');
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="text-2xl font-heading font-bold text-white tracking-tight">
              AERO<span className="text-[var(--accent)]">GEAR</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/collections" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              New Arrivals
            </Link>
            <Link href="/products" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Shop All
            </Link>
            <Link href="/about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Our Story
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button aria-label="Search" className="text-slate-300 hover:text-[var(--accent)] transition-colors">
              <Search className="h-5 w-5" />
            </button>

            {/* Auth Section */}
            {userInfo ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm font-medium"
                >
                  <User className="h-5 w-5 text-[var(--accent)]" />
                  <span className="hidden sm:block max-w-[100px] truncate">{userInfo.name}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-[#0f172a] border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-800 mb-1">
                      <p className="text-xs text-slate-500">Signed in as</p>
                      <p className="text-sm font-medium text-white truncate">{userInfo.email}</p>
                      {userInfo.role === 'admin' && (
                        <span className="text-xs text-purple-400 font-semibold">ADMIN</span>
                      )}
                    </div>

                    {userInfo.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-white hover:bg-red-500/20 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}

                {/* Backdrop to close dropdown */}
                {dropdownOpen && (
                  <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                )}
              </div>
            ) : (
              <Link href="/login" aria-label="Account" className="text-slate-300 hover:text-[var(--accent)] transition-colors">
                <User className="h-5 w-5" />
              </Link>
            )}

            <Link href="/cart" aria-label="Cart" className="text-slate-300 hover:text-[var(--accent)] transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-[var(--accent)] text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>

            <button aria-label="Menu" className="md:hidden text-slate-300 hover:text-white transition-colors">
              <Menu className="h-6 w-6" />
            </button>
          </div>
          
        </div>
      </div>
    </header>
  );
}
