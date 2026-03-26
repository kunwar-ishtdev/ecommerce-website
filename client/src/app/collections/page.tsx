import Link from 'next/link';

export default function CollectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[80vh]">
      <h1 className="text-4xl font-heading font-bold text-white mb-12 text-center">Our Collections</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <Link href="/products" className="group relative h-96 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors z-10" />
          <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80" alt="Techwear" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute bottom-8 left-8 z-20">
            <h2 className="text-3xl font-bold text-white mb-2">New Arrivals</h2>
            <span className="text-sm font-medium text-white border-b border-[var(--accent)] pb-1">Explore</span>
          </div>
        </Link>
        
        <Link href="/products" className="group relative h-96 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors z-10" />
          <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80" alt="Best Sellers" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute bottom-8 left-8 z-20">
            <h2 className="text-3xl font-bold text-white mb-2">Best Sellers</h2>
            <span className="text-sm font-medium text-white border-b border-[var(--accent)] pb-1">Explore</span>
          </div>
        </Link>

        <Link href="/products" className="group relative h-96 rounded-2xl overflow-hidden md:col-span-2 lg:col-span-1">
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors z-10" />
          <img src="https://images.unsplash.com/photo-1550246140-5119ae4790b8?auto=format&fit=crop&q=80" alt="Accessories" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute bottom-8 left-8 z-20">
            <h2 className="text-3xl font-bold text-white mb-2">Accessories</h2>
            <span className="text-sm font-medium text-white border-b border-[var(--accent)] pb-1">Explore</span>
          </div>
        </Link>
        
      </div>
    </div>
  );
}
