import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Shield, Truck, RefreshCw, Star, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80" 
          alt="Hero Background" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl space-y-8">
            <span className="inline-block py-1 px-3 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-semibold tracking-wider uppercase border border-[var(--accent)]/20">
              New Collection 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-black text-white leading-tight">
              ELEVATE YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-cyan-400">
                EVERYDAY
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-lg leading-relaxed">
              Premium streetwear and high-performance tech apparel designed for those who push boundaries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="group">
                Shop New Arrivals
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                View Lookbook
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-slate-900 border-y border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="flex flex-col items-center justify-center space-y-3 px-4 pt-4 md:pt-0">
              <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center text-[var(--accent)] mb-2">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-white font-semibold">Free Global Shipping</h3>
              <p className="text-slate-400 text-sm">On all orders over ₹1500</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-3 px-4 pt-4 md:pt-0">
              <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center text-[var(--accent)] mb-2">
                <RefreshCw className="h-6 w-6" />
              </div>
              <h3 className="text-white font-semibold">Easy 30-Day Returns</h3>
              <p className="text-slate-400 text-sm">No questions asked policy</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-3 px-4 pt-4 md:pt-0">
              <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center text-[var(--accent)] mb-2">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-white font-semibold">Secure Checkout</h3>
              <p className="text-slate-400 text-sm">100% encrypted transactions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Curated Collections</h2>
              <p className="text-slate-400">Discover our meticulously tailored selections.</p>
            </div>
            <Link href="/collections" className="hidden md:flex items-center text-[var(--accent)] hover:text-white transition-colors font-medium">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
              <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80" alt="Techwear" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-8 left-8 z-20">
                <h3 className="text-2xl font-bold text-white mb-2">Techwear Ops</h3>
                <span className="text-sm font-medium text-white border-b border-[var(--accent)] pb-1">Shop Collection</span>
              </div>
            </div>
            <div className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
              <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80" alt="Essentials" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-8 left-8 z-20">
                <h3 className="text-2xl font-bold text-white mb-2">Core Essentials</h3>
                <span className="text-sm font-medium text-white border-b border-[var(--accent)] pb-1">Shop Collection</span>
              </div>
            </div>
            <div className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer md:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
              <img src="https://images.unsplash.com/photo-1550246140-5119ae4790b8?auto=format&fit=crop&q=80" alt="Accessories" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-8 left-8 z-20">
                <h3 className="text-2xl font-bold text-white mb-2">Accessories</h3>
                <span className="text-sm font-medium text-white border-b border-[var(--accent)] pb-1">Shop Collection</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Trending Now</h2>
            <p className="text-slate-400">Our currently most demanded pieces.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="group cursor-pointer bg-slate-800 border-none rounded-xl overflow-hidden">
                <div className="relative aspect-square overflow-hidden bg-slate-700">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-full">
                      Bestseller
                    </span>
                  </div>
                  <img 
                    src={`https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500&h=500&id=${i}`} 
                    alt={`Product ${i}`} 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                    <Button fullWidth variant="primary" className="shadow-lg backdrop-blur-md">Add to Cart</Button>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white truncate pr-4">Aero Heavyweight Hoodie</h3>
                    <span className="font-bold text-[var(--accent)]">₹8500</span>
                  </div>
                  <p className="text-sm text-slate-400">Men's Apparel</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white text-center mb-16">Trusted by the Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-8">
                  <div className="flex space-x-1 mb-6 text-yellow-400">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                  <p className="text-slate-300 italic mb-8 leading-relaxed">
                    "The quality of the AeroGear pieces is absolutely unmatched. This is the only brand I wear for everyday urban commuting and high-intensity workouts alike."
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-slate-700 flex items-center justify-center text-xl font-bold text-white">
                      CX
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Customer {i}</h4>
                      <p className="text-xs text-slate-500">Verified Buyer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-black relative overflow-hidden border-t border-slate-800">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-[var(--accent)]/10 rounded-full blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-[var(--accent)]/10 rounded-full blur-3xl rounded-full" />
        
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-heading font-black text-white mb-6">JOIN THE MOVEMENT</h2>
          <p className="text-slate-400 mb-10 text-lg">
            Sign up for our newsletter and get 15% off your first order. Plus, early access to exclusive drops and events.
          </p>
          <form className="flex flex-col sm:flex-row max-w-xl mx-auto gap-3">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow bg-slate-800/80 border border-slate-700 rounded-lg px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all"
              required
            />
            <Button type="submit" size="lg" className="whitespace-nowrap px-8">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-slate-500 mt-4">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </section>

    </div>
  );
}
