'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCreateProductMutation, useUploadProductImageMutation } from '@/lib/slices/productsApiSlice';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { ArrowLeft, Upload, X, Image as LucideImage } from 'lucide-react';

export default function NewProductPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Outerwear');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('10');
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  
  const router = useRouter();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const res = await uploadProductImage(formData).unwrap();
      setImages([...images, res.url]);
      setUploading(false);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      alert('Please upload at least one image');
      return;
    }
    try {
      await createProduct({ 
        title, 
        price: Number(price), 
        category, 
        description, 
        stock: Number(stock),
        images
      }).unwrap();
      router.push('/admin/products');
    } catch (err) {
      alert('Failed to create product');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 text-center sm:text-left">
        <Link href="/admin/products" className="text-[var(--accent)] hover:underline flex items-center justify-center sm:justify-start gap-2 mb-4 text-sm font-medium">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>
        <h1 className="text-3xl font-heading font-black text-white mb-2 tracking-tight">ADD NEW PRODUCT</h1>
        <p className="text-slate-400">Expand the AeroGear catalog with premium gear.</p>
      </div>

      <form onSubmit={submitHandler} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: General Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">Product Title</label>
                <input 
                  type="text" 
                  required 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[var(--accent)] focus:outline-none transition-all" 
                  placeholder="e.g. Aero Heavyweight Tech Hoodie" 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">Description</label>
                <textarea 
                  required 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white h-40 focus:ring-2 focus:ring-[var(--accent)] focus:outline-none transition-all resize-none" 
                  placeholder="Engineered for optimal performance..." 
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">Price (₹)</label>
                  <input 
                    type="number" 
                    required 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[var(--accent)] focus:outline-none transition-all" 
                    placeholder="8500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">Stock Quantity</label>
                  <input 
                    type="number" 
                    required 
                    value={stock} 
                    onChange={(e) => setStock(e.target.value)} 
                    className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[var(--accent)] focus:outline-none transition-all" 
                    placeholder="25" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Media & Meta */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[var(--accent)] focus:outline-none cursor-pointer transition-all"
                >
                  <option value="Outerwear">Outerwear</option>
                  <option value="T-Shirts">T-Shirts</option>
                  <option value="Bottoms">Bottoms</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <label className="block text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Images</label>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-slate-700 group">
                      <img src={img} alt="Product" className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <label className={`aspect-square rounded-lg border-2 border-dashed border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:border-[var(--accent)] hover:bg-slate-800/50 transition-all ${uploading ? 'opacity-50 cursor-wait' : ''}`}>
                    <input type="file" className="hidden" onChange={uploadFileHandler} disabled={uploading} />
                    <Upload className="h-6 w-6 text-slate-500 mb-1" />
                    <span className="text-[10px] text-slate-500 font-medium uppercase">{uploading ? 'Uploading...' : 'Add Image'}</span>
                  </label>
                </div>
              </div>

              <Button type="submit" fullWidth disabled={isLoading || uploading} size="lg">
                {isLoading ? 'Creating...' : 'Launch Product'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
