'use client';

import { use } from 'react';
import { useGetOrderDetailsQuery } from '@/lib/slices/ordersApiSlice';
import { Card, CardContent } from '@/components/ui/Card';
import { CheckCircle2, Clock, MapPin, Package, CreditCard, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function OrderDetailsPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const { id } = params;
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(id);

  if (isLoading) return <div className="p-20 text-center text-white">Loading order details...</div>;
  if (error) return <div className="p-20 text-center text-red-500">Order not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/products" className="text-[var(--accent)] hover:underline flex items-center gap-2 mb-8 text-sm font-medium">
        <ArrowLeft className="h-4 w-4" /> Continue Shopping
      </Link>

      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-black text-white tracking-tighter uppercase">ORDER SUCCESSFUL</h1>
            <p className="text-slate-400 mt-1">ID: <span className="text-slate-200 font-mono">#{order._id}</span></p>
          </div>
          <div className="flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full border border-green-500/20 font-bold text-sm uppercase tracking-widest">
            <CheckCircle2 className="h-4 w-4" /> Order Placed
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <Package className="h-5 w-5 text-[var(--accent)]" /> Order Items
              </h2>
              <div className="space-y-6">
                {order.items.map((item: any) => (
                  <div key={item._id} className="flex items-center gap-6 pb-6 border-b border-slate-800 last:border-0 last:pb-0">
                    <div className="h-20 w-20 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-white font-bold">{item.name}</h3>
                      <p className="text-slate-400 text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                      <p className="text-slate-500 text-xs">₹{item.price.toLocaleString()} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-6">
                <h2 className="text-md font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[var(--accent)]" /> Shipping to
                </h2>
                <div className="text-slate-300 text-sm leading-relaxed">
                  <p className="font-bold text-white mb-1">Customer Name</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-6">
                <h2 className="text-md font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-[var(--accent)]" /> Payment Details
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm font-bold uppercase tracking-tighter">Status:</span>
                    {order.isPaid ? (
                      <span className="text-green-400 text-xs font-black uppercase">PAID</span>
                    ) : (
                      <span className="text-yellow-400 text-xs font-black uppercase">PAY ON DELIVERY (COD)</span>
                    )}
                  </div>
                  <div className="text-slate-500 text-[10px] leading-tight">
                    Your order will be processed immediately. Please keep the exact amount ready for the delivery partner.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800 shadow-2xl">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Summary</h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white">₹{(order.totalPrice / 1.18 - (order.totalPrice > 1500 ? 0 : 150)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping</span>
                  <span className="text-white">{order.totalPrice > 1500 ? 'FREE' : '₹150'}</span>
                </div>
                <div className="flex justify-between text-slate-400 border-b border-slate-800 pb-4">
                  <span>Tax (GST 18%)</span>
                  <span className="text-white">₹{(order.totalPrice * 0.18 / 1.18).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-black text-white pt-2">
                  <span className="uppercase tracking-tighter">TOTAL</span>
                  <span className="text-[var(--accent)]">₹{order.totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-950/50 border-slate-800">
            <CardContent className="p-6 flex items-start gap-4">
              <Clock className="h-5 w-5 text-slate-500 mt-1" />
              <div>
                <p className="text-white text-sm font-bold uppercase tracking-wider">Expected Delivery</p>
                <p className="text-slate-500 text-xs mt-1">Within 3-5 business days across India.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
