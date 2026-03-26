import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Users, Package, ShoppingCart, DollarSign } from 'lucide-react';

export default function AdminDashboardPage() {
  const stats = [
    { name: 'Total Revenue', value: '₹4,52,431.89', icon: DollarSign, trend: '+20.1%' },
    { name: 'Orders', value: '+573', icon: ShoppingCart, trend: '+12.5%' },
    { name: 'Products', value: '1,204', icon: Package, trend: '+3.2%' },
    { name: 'Active Users', value: '+2,341', icon: Users, trend: '+15.3%' },
  ];

  const recentOrders = [
    { id: 'ORD-7290', customer: 'Liam Johnson', status: 'Processing', total: '₹12,900.00' },
    { id: 'ORD-7291', customer: 'Emma Williams', status: 'Shipped', total: '₹8,500.00' },
    { id: 'ORD-7292', customer: 'Noah Brown', status: 'Delivered', total: '₹34,550.00' },
    { id: 'ORD-7293', customer: 'Olivia Davis', status: 'Pending', total: '₹19,000.00' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-400">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/products" className="bg-slate-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-700 transition">
            Manage Products
          </Link>
          <Link href="/admin/orders" className="bg-[var(--accent)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[var(--accent-hover)] transition">
            View Orders
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <Card key={idx} className="bg-slate-900 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-400 font-medium">{stat.name}</span>
                <div className="p-2 bg-slate-800 rounded-md text-[var(--accent)]">
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Orders Overview */}
        <Card className="lg:col-span-2 bg-slate-900 border-slate-800">
          <CardContent className="p-0">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h3 className="font-semibold text-white">Recent Orders</h3>
              <Link href="/admin/orders" className="text-sm text-[var(--accent)] hover:underline">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-800 text-slate-400 font-medium">
                  <tr>
                    <th className="px-6 py-4 rounded-tl-lg">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 rounded-tr-lg">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {recentOrders.map((order, i) => (
                    <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{order.id}</td>
                      <td className="px-6 py-4">{order.customer}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 bg-slate-800 rounded-full text-xs font-medium border
                          ${order.status === 'Delivered' ? 'text-green-400 border-green-400/20 bg-green-400/10' : 
                            order.status === 'Processing' ? 'text-blue-400 border-blue-400/20 bg-blue-400/10' :
                            'text-yellow-400 border-yellow-400/20 bg-yellow-400/10'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white font-medium">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions / System Status */}
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <h3 className="font-semibold text-white mb-6 border-b border-slate-800 pb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-lg border border-slate-800">
                <div>
                  <h4 className="text-white text-sm font-medium">Database (MongoDB)</h4>
                  <p className="text-xs text-slate-400">Connected & Syncing</p>
                </div>
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
              </div>
              <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-lg border border-slate-800">
                <div>
                  <h4 className="text-white text-sm font-medium">Server API</h4>
                  <p className="text-xs text-slate-400">Express Online</p>
                </div>
                <div className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
              </div>
              <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-lg border border-slate-800">
                <div>
                  <h4 className="text-white text-sm font-medium">Image Storage (Cloudinary)</h4>
                  <p className="text-xs text-slate-400">Ready</p>
                </div>
                <div className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
