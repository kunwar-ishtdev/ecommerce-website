'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useGetProductsQuery } from '@/lib/slices/productsApiSlice';

export default function ProductsPage() {
  const { data: products, isLoading, error } = useGetProductsQuery({});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Shop All</h1>
          <p className="text-slate-300">We offer free global shipping on all orders over ₹1500 and an easy 30-day return policy.</p>
        </div>
        
        {/* Search & Sort */}
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          </div>
          
          <button className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 hover:text-white transition-colors">
            Sort <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6 text-white font-semibold border-b border-slate-800 pb-4">
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-3 uppercase tracking-wider">Categories</h4>
                <div className="space-y-2">
                  {['All', 'Outerwear', 'T-Shirts', 'Bottoms', 'Accessories'].map((cat) => (
                    <label key={cat} className="flex items-center gap-3 text-slate-400 hover:text-white cursor-pointer transition-colors">
                      <input type="checkbox" className="form-checkbox rounded bg-slate-800 border-slate-700 text-[var(--accent)] focus:ring-[var(--accent)] focus:ring-offset-slate-900" />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          {isLoading ? (
            <div className="flex justify-center items-center h-64 text-white text-lg">Loading amazing products...</div>
          ) : error ? (
            <div className="flex justify-center items-center h-64 text-red-500">Failed to load products.</div>
          ) : products?.length === 0 ? (
            <div className="flex justify-center items-center h-64 text-slate-400">No products available at the moment.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product: any, i: number) => (
                <Card key={product._id} className="group bg-slate-800 border-none rounded-xl overflow-hidden cursor-pointer h-full flex flex-col">
                  <Link href={`/products/${product._id}`} className="flex-grow flex flex-col">
                    <div className="relative aspect-square overflow-hidden bg-slate-700">
                      <img 
                        src={product.images && product.images.length > 0 ? product.images[0] : `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500&h=500`} 
                        alt={product.title} 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                      />
                    </div>
                    <CardContent className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <p className="text-xs text-[var(--accent)] mb-1 font-medium">{product.category}</p>
                        <h3 className="font-semibold text-white mb-2 leading-tight">{product.title}</h3>
                      </div>
                      <span className="font-bold text-lg text-white">₹{product.price.toFixed(2)}</span>
                    </CardContent>
                  </Link>
                  <div className="px-5 pb-5">
                    <Button fullWidth variant="outline" className="border-slate-600 hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-white pointer-events-none">
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
