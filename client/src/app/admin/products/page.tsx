'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import { useGetProductsQuery, useDeleteProductMutation } from '@/lib/slices/productsApiSlice';

export default function AdminProductsPage() {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery({});
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id).unwrap();
        refetch(); // Refresh the datagrid
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Products Management</h1>
          <p className="text-slate-400">View, edit, and add new products to your store.</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="shrink-0">
            <Plus className="h-5 w-5 mr-2" /> Add New Product
          </Button>
        </Link>
      </div>

      <Card className="bg-slate-900 border-slate-800 overflow-hidden shadow-2xl">
        <CardContent className="p-0">
          <div className="p-4 border-b border-slate-800 bg-slate-800/20">
            <div className="relative max-w-md">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
            </div>
          </div>
          
          <div className="overflow-x-auto min-h-[300px]">
            {isLoading ? (
              <div className="flex justify-center items-center h-48 text-white">Loading products...</div>
            ) : error ? (
              <div className="flex justify-center items-center h-48 text-red-400">Error loading products</div>
            ) : products?.length === 0 ? (
              <div className="flex justify-center items-center h-48 text-slate-400">No products found. Add a new one!</div>
            ) : (
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-800 text-slate-400 font-medium">
                  <tr>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {products.map((product: any) => (
                    <tr key={product._id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">{product._id.substring(0, 8)}...</td>
                      <td className="px-6 py-4 font-medium text-white">{product.title}</td>
                      <td className="px-6 py-4">₹{product.price.toFixed(2)}</td>
                      <td className="px-6 py-4">{product.category}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                          {product.stock > 0 ? product.stock : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <button className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded transition-colors" title="Edit">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded transition-colors" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
        </CardContent>
      </Card>
      
    </div>
  );
}
