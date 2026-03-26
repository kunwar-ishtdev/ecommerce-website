'use client';

import { useGetOrdersQuery, useUpdateOrderStatusMutation } from '@/lib/slices/ordersApiSlice';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Check, X, Truck, CreditCard, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function AdminOrdersPage() {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
  const [updateStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();

  const handleUpdateStatus = async (id: string, isPaid?: boolean, isDelivered?: boolean) => {
    try {
      await updateStatus({ id, isPaid, isDelivered }).unwrap();
    } catch (err: any) {
      alert(err?.data?.message || 'Update failed');
    }
  };

  if (isLoading) return <div className="p-10 text-white text-center">Loading orders...</div>;
  if (error) return <div className="p-10 text-red-500 text-center">Failed to load orders.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-heading font-black text-white tracking-tight">ORDER MANAGEMENT</h1>
          <p className="text-slate-400 mt-2">Track and fulfillment orders from all customers.</p>
        </div>
        <Button onClick={() => refetch()} variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </div>

      <Card className="bg-slate-900 border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 border-b border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Customer ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Paid</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Delivered</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders?.map((order: any) => (
                <tr key={order._id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">#{order._id.substring(16)}</td>
                  <td className="px-6 py-4 font-medium text-white">{order.userId}</td>
                  <td className="px-6 py-4 text-slate-300 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-bold text-[var(--accent)]">₹{order.totalPrice.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    {order.isPaid ? (
                      <span className="flex items-center gap-1.5 text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded">
                        <Check className="h-3 w-3" /> {new Date(order.paidAt).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-red-400 text-xs font-bold bg-red-400/10 px-2 py-1 rounded">
                        <X className="h-3 w-3" /> Unpaid
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {order.isDelivered ? (
                      <span className="flex items-center gap-1.5 text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded">
                        <Truck className="h-3 w-3" /> {new Date(order.deliveredAt).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-yellow-400 text-xs font-bold bg-yellow-400/10 px-2 py-1 rounded">
                        <X className="h-3 w-3" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                       {!order.isPaid && (
                         <Button 
                           size="sm" 
                           onClick={() => handleUpdateStatus(order._id, true)}
                           className="bg-green-600 hover:bg-green-700 h-8 px-2"
                         >
                           <CreditCard className="h-3.5 w-3.5" />
                         </Button>
                       )}
                       {!order.isDelivered && (
                         <Button 
                           size="sm" 
                           onClick={() => handleUpdateStatus(order._id, undefined, true)}
                           className="bg-blue-600 hover:bg-blue-700 h-8 px-2"
                         >
                           <Truck className="h-3.5 w-3.5" />
                         </Button>
                       )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
