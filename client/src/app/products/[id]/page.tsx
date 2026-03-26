'use client';

import { use } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useGetProductDetailsQuery } from '@/lib/slices/productsApiSlice';
import { addToCart } from '@/lib/slices/cartSlice';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Star, ShoppingBag, ShieldCheck, RefreshCw } from 'lucide-react';

export default function ProductDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const { id } = params;
  const dispatch = useDispatch();
  const { data: product, isLoading, error } = useGetProductDetailsQuery(id);

  if (isLoading) return <div className="p-20 text-center text-white">Loading gear...</div>;
  if (error || !product) return <div className="p-20 text-center text-red-500">Gear not found.</div>;

  const addToCartHandler = () => {
    dispatch(addToCart({
      productId: product._id,
      name: product.title,
      image: product.images[0],
      price: product.price,
      quantity: 1,
      stock: product.stock,
    }));
    alert('Added to Gear Bag!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/products" className="text-[var(--accent)] hover:underline flex items-center gap-2 mb-8 text-sm font-medium transition-all group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Collection
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl group">
            <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img: string, i: number) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer hover:border-[var(--accent)] transition-all">
                <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-[var(--accent)] text-xs font-black tracking-widest uppercase px-3 py-1 bg-[var(--accent)]/10 rounded-full border border-[var(--accent)]/20">{product.category}</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-heading font-black text-white mb-6 uppercase tracking-tighter leading-none">{product.title}</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="flex text-yellow-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`h-5 w-5 ${star <= 4.5 ? 'fill-current' : 'text-slate-600'}`} />
              ))}
            </div>
            <span className="text-slate-500 text-xs font-black uppercase tracking-widest border-l border-slate-800 pl-4">Verified Gear</span>
          </div>

          <div className="text-5xl font-black text-white mb-10 tracking-tighter">₹{product.price.toLocaleString()}</div>

          <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium max-w-lg">
            {product.description}
          </p>

          <div className="space-y-6 mb-10">
            <div className={`flex items-center gap-2 font-bold text-xs uppercase tracking-widest ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
              <div className={`h-2 w-2 rounded-full animate-pulse ${product.stock > 0 ? 'bg-green-400' : 'bg-red-400'}`}></div>
              {product.stock > 0 ? `In Stock / Ready to Ship` : 'Currently Unavailable'}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-10 border-t border-slate-800/50">
            <Button size="lg" className="flex-grow h-16 text-xl font-black uppercase tracking-widest shadow-2xl shadow-[var(--accent)]/20" onClick={addToCartHandler} disabled={product.stock === 0}>
              <ShoppingBag className="mr-3 h-6 w-6" /> Add to Gear Bag
            </Button>
            <Button variant="outline" size="lg" className="px-8 h-16 border-slate-700 hover:bg-slate-800">
              <Star className="h-6 w-6" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
            <div className="flex items-center gap-4 p-5 bg-slate-900/30 rounded-2xl border border-slate-800/50 backdrop-blur-sm">
              <div className="h-10 w-10 bg-slate-800 rounded-xl flex items-center justify-center text-[var(--accent)]">
                 <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-white text-[10px] font-black uppercase tracking-widest">Aero Guarantee</p>
                <p className="text-slate-500 text-[9px] uppercase font-bold mt-0.5 tracking-tighter">Premium Grade Materials</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-slate-900/30 rounded-2xl border border-slate-800/50 backdrop-blur-sm">
              <div className="h-10 w-10 bg-slate-800 rounded-xl flex items-center justify-center text-[var(--accent)]">
                 <RefreshCw className="h-5 w-5" />
              </div>
              <div>
                <p className="text-white text-[10px] font-black uppercase tracking-widest">Global Support</p>
                <p className="text-slate-500 text-[9px] uppercase font-bold mt-0.5 tracking-tighter">30-Day Exchange Access</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
