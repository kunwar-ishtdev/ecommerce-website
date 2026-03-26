'use client';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { RootState } from '@/lib/store';
import { addToCart, removeFromCart } from '@/lib/slices/cartSlice';

export default function CartPage() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const updateCartHandler = (item: any, qty: number) => {
    dispatch(addToCart({ ...item, quantity: qty }));
  };

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 1500 ? 0 : 150;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-12 w-12 bg-[var(--accent)] rounded-2xl flex items-center justify-center text-white shadow-lg">
          <ShoppingBag className="h-6 w-6" />
        </div>
        <h1 className="text-4xl font-heading font-black text-white tracking-tight uppercase">YOUR GEAR</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">

        {/* Cart Items */}
        <div className="flex-grow space-y-6">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.productId} className="flex flex-col sm:flex-row gap-6 bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 items-center transition-all hover:border-slate-700 shadow-xl">
                <div className="h-24 w-24 bg-slate-800 rounded-xl overflow-hidden shrink-0 border border-slate-700">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-grow text-center sm:text-left min-w-0">
                  <h3 className="text-lg font-bold text-white truncate pr-4">{item.name}</h3>
                  <p className="text-[var(--accent)] font-black mt-1 text-xl">₹{item.price.toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-slate-700 rounded-xl overflow-hidden bg-slate-950/50">
                    <button
                      onClick={() => updateCartHandler(item, Math.max(1, item.quantity - 1))}
                      className="px-4 py-2 bg-slate-800 text-white hover:bg-slate-700 transition-colors font-bold"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 text-white font-mono font-bold text-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateCartHandler(item, Math.min(item.stock, item.quantity + 1))}
                      className="px-4 py-2 bg-slate-800 text-white hover:bg-slate-700 transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCartHandler(item.productId)}
                    className="text-slate-500 hover:text-red-500 transition-all p-3 hover:bg-red-500/10 rounded-xl"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-2xl">
              <ShoppingBag className="h-16 w-16 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-400 mb-8 text-lg font-medium">Your gear bag is currently empty.</p>
              <Link href="/products">
                <Button size="lg" className="px-10">Start Shopping</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <Card className="sticky top-24 border-slate-800 bg-slate-900 shadow-2xl">
            <CardContent className="p-8">
              <h2 className="text-xl font-black text-white mb-8 border-b border-slate-800 pb-6 tracking-widest uppercase">Summary</h2>

              <div className="space-y-5 mb-8 text-slate-300 font-medium">
                <div className="flex justify-between">
                  <span className="text-slate-500 uppercase text-xs tracking-widest">Subtotal</span>
                  <span className="text-white">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 uppercase text-xs tracking-widest">Shipping</span>
                  <span className="text-white">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-[var(--accent)] font-bold uppercase tracking-tighter text-right">
                    Add ₹{(1500 - subtotal).toLocaleString()} more for free shipping
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center border-t border-slate-800 pt-8 mb-10">
                <span className="text-sm font-black text-slate-500 uppercase tracking-widest">Total</span>
                <span className="text-3xl font-black text-[var(--accent)]">₹{total.toLocaleString()}</span>
              </div>

              <Link href="/checkout" className={`block w-full ${cartItems.length === 0 ? 'pointer-events-none opacity-50' : ''}`}>
                <Button fullWidth size="lg" className="group h-14 text-lg font-black tracking-widest uppercase">
                  Checkout
                  <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <div className="mt-6 text-center">
                <Link href="/products" className="text-xs text-slate-500 hover:text-[var(--accent)] transition-all uppercase font-bold tracking-widest underline decoration-[var(--accent)]/30 underline-offset-8">
                  Back to store
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
