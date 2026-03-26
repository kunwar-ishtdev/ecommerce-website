'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Lock, IndianRupee } from 'lucide-react';
import { RootState } from '@/lib/store';
import { useCreateOrderMutation } from '@/lib/slices/ordersApiSlice';
import { clearCartItems } from '@/lib/slices/cartSlice';

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const { cartItems, shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 1500 ? 0 : 150;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/cart');
    }
  }, [cartItems, router]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        items: cartItems.map(item => ({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          image: item.image,
          price: item.price
        })),
        shippingAddress: { address, city, postalCode, country },
        totalPrice: total,
      }).unwrap();
      dispatch(clearCartItems());
      router.push(`/orders/${res._id}`);
    } catch (err: any) {
      alert(err?.data?.message || 'Failed to place order');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8 text-white">
        <Lock className="h-6 w-6 text-[var(--accent)]" />
        <h1 className="text-3xl font-heading font-bold">Secure Checkout</h1>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Checkout Forms */}
        <div className="flex-grow space-y-8">
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Address</label>
                  <input 
                    type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" 
                    placeholder="Enter your full address"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">City</label>
                    <input 
                      type="text" 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Postal code</label>
                    <input 
                      type="text" 
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Country</label>
                    <input 
                      type="text" 
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Payment</h2>
              <p className="text-sm text-slate-400 mb-4 font-medium italic text-[var(--accent)]">COD Available Only - Pay on Delivery</p>
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-slate-300">
                Securely complete your order via Cash on Delivery.
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <Card className="sticky top-24 bg-slate-900 border-slate-800 shadow-2xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 bg-slate-800 rounded-md overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">{item.quantity}</span>
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="text-sm font-medium text-white truncate">{item.name}</h4>
                      <p className="text-sm text-slate-400">₹{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-3 text-sm text-slate-300 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-t border-slate-800 pt-6 mb-8">
                <span className="text-lg font-semibold text-white">Total</span>
                <span className="text-2xl font-bold text-[var(--accent)] flex items-center gap-1">
                  ₹{total.toLocaleString()}
                </span>
              </div>
              
              <Button 
                fullWidth 
                size="lg" 
                onClick={placeOrderHandler} 
                disabled={isLoading || cartItems.length === 0}
              >
                {isLoading ? 'Processing...' : 'Complete Order'}
              </Button>
              {error && <p className="text-red-500 text-xs mt-4 text-center">Failed to create order.</p>}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
