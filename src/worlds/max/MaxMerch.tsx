// ============================================
// Max Merch - E-commerce with Cart
// Cart slides in from right, starts below navbar
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, Star, X, Plus, Minus, CreditCard, Truck, Shield
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  sizes: string[];
  rating: number;
  reviews: number;
  featured?: boolean;
}

interface CartItem {
  id: number;
  size: string;
  quantity: number;
}

const merchProducts: Product[] = [
  {
    id: 1,
    name: 'MAX Logo Hoodie',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.pexels.com/photos/6203601/pexels-photo-6203601.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'apparel',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviews: 128,
    featured: true,
  },
  {
    id: 2,
    name: 'Digital Wave T-Shirt',
    price: 34.99,
    image: 'https://images.pexels.com/photos/5632401/pexels-photo-5632401.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'apparel',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviews: 96,
  },
  {
    id: 3,
    name: 'X-ERA LED Cap',
    price: 29.99,
    image: 'https://images.pexels.com/photos/7691389/pexels-photo-7691389.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'accessories',
    sizes: ['One Size'],
    rating: 4.7,
    reviews: 64,
  },
  {
    id: 4,
    name: 'Creator Energy Mug',
    price: 24.99,
    image: 'https://images.pexels.com/photos/3028995/pexels-photo-3028995.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'accessories',
    sizes: ['Standard'],
    rating: 4.6,
    reviews: 52,
  },
  {
    id: 5,
    name: 'MAX Edition Backpack',
    price: 89.99,
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'accessories',
    sizes: ['One Size'],
    rating: 4.9,
    reviews: 78,
    featured: true,
  },
  {
    id: 6,
    name: 'Neon Dreams Phone Case',
    price: 19.99,
    image: 'https://images.pexels.com/photos/7889401/pexels-photo-7889401.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'accessories',
    sizes: ['iPhone 15', 'iPhone 14', 'Samsung S24'],
    rating: 4.5,
    reviews: 34,
  },
];

const categories = ['all', 'apparel', 'accessories'];

export function MaxMerch() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});

  const filteredProducts = activeCategory === 'all'
    ? merchProducts
    : merchProducts.filter((p) => p.category === activeCategory);

  const cartTotal = cart.reduce((sum, item) => {
    const product = merchProducts.find((p) => p.id === item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (productId: number) => {
    const product = merchProducts.find((p) => p.id === productId);
    if (!product) return;
    const size = selectedSizes[productId] || product.sizes[0];
    setCart((prev) => {
      const existing = prev.find((i) => i.id === productId && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.id === productId && i.size === size ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { id: productId, size, quantity: 1 }];
    });
    setShowCart(true);
  };

  const updateQuantity = (id: number, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id && i.size === size ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (id: number, size: string) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  return (
    <section id="merch" className="relative py-32 overflow-hidden" style={{ background: '#020814' }}>
      {/* Background decoration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-4 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-start justify-between mb-12 flex-wrap gap-6"
        >
          <div>
            <span className="text-xs font-bold tracking-widest uppercase block mb-3" style={{ color: '#00d4ff' }}>
              Official Store
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              MAX <span style={{ color: '#00d4ff', textShadow: '0 0 30px rgba(0,212,255,0.5)' }}>Merch</span>
            </h2>
          </div>

          {/* Cart Toggle Button */}
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              color: '#000',
              border: '2px solid rgba(255, 255, 255, 0.9)',
              boxShadow: totalItems > 0
                ? '0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 212, 255, 0.2)'
                : '0 0 15px rgba(255,255,255,0.2)'
            }}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="font-semibold text-sm">Cart</span>
            {totalItems > 0 && (
              <span
                className="ml-1 w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center"
                style={{ background: '#00d4ff' }}
              >
                {totalItems}
              </span>
            )}
          </button>
        </motion.div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300"
              style={{
                background: activeCategory === cat ? 'rgba(0, 212, 255, 0.15)' : 'transparent',
                color: activeCategory === cat ? '#00d4ff' : 'rgba(255,255,255,0.5)',
                border: activeCategory === cat ? '1px solid rgba(0, 212, 255, 0.5)' : '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => {
              const selectedSize = selectedSizes[product.id] || product.sizes[0];
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.07 }}
                  layout
                  className="group rounded-xl overflow-hidden transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.4)';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {product.originalPrice && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: '#ef4444', color: 'white' }}>
                        SALE
                      </div>
                    )}
                    {product.featured && !product.originalPrice && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(0,212,255,0.9)', color: '#000' }}>
                        FEATURED
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-white/60">{product.rating} ({product.reviews})</span>
                    </div>

                    <h3 className="text-base font-semibold text-white mb-2 group-hover:text-[#00d4ff] transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-bold" style={{ color: '#00d4ff' }}>${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-white/30 line-through">${product.originalPrice}</span>
                      )}
                    </div>

                    {/* Size selector - inline */}
                    <div className="mb-4">
                      <p className="text-xs text-white/40 mb-2 uppercase tracking-wider">Size</p>
                      <div className="flex flex-wrap gap-1.5">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSizes((prev) => ({ ...prev, [product.id]: size }))}
                            className="px-3 py-1.5 rounded text-xs font-medium transition-all duration-200"
                            style={{
                              background: selectedSize === size ? 'rgba(0,212,255,0.15)' : 'transparent',
                              color: selectedSize === size ? '#00d4ff' : 'rgba(255,255,255,0.4)',
                              border: selectedSize === size ? '1px solid rgba(0,212,255,0.5)' : '1px solid rgba(255,255,255,0.15)',
                            }}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => addToCart(product.id)}
                      className="w-full py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                      style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        color: '#000',
                        boxShadow: '0 0 15px rgba(255,255,255,0.2)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)';
                        e.currentTarget.style.color = '#00d4ff';
                        e.currentTarget.style.border = '2px solid rgba(0,212,255,0.6)';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.5), 0 0 40px rgba(0,212,255,0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                        e.currentTarget.style.color = '#000';
                        e.currentTarget.style.border = 'none';
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(255,255,255,0.2)';
                      }}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Cart Overlay Backdrop */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
            style={{ top: '64px' }}
            onClick={() => setShowCart(false)}
          />
        )}
      </AnimatePresence>

      {/* Shopping Cart Sidebar - starts BELOW the 64px navbar */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 bottom-0 w-full max-w-md z-50 flex flex-col"
            style={{
              top: '64px',
              background: '#0a0e1a',
              borderLeft: '1px solid rgba(0, 212, 255, 0.15)',
              boxShadow: '-20px 0 60px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Cart Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" style={{ color: '#00d4ff' }} />
                <h3 className="text-lg font-bold text-white">Your Cart</h3>
                {totalItems > 0 && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(0,212,255,0.2)', color: '#00d4ff' }}
                  >
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4" style={{ color: 'rgba(0,212,255,0.2)' }} />
                  <p className="text-white/40 text-sm">Your cart is empty</p>
                  <p className="text-white/25 text-xs mt-1">Add some items to get started</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => {
                    const product = merchProducts.find((p) => p.id === item.id);
                    if (!product) return null;
                    return (
                      <div
                        key={`${item.id}-${item.size}`}
                        className="flex gap-4 p-4 rounded-xl"
                        style={{ background: 'rgba(0, 212, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.1)' }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium text-sm truncate">{product.name}</h4>
                          <p className="text-white/40 text-xs mt-0.5">Size: {item.size}</p>
                          <p className="text-sm font-bold mt-1" style={{ color: '#00d4ff' }}>
                            ${(product.price * item.quantity).toFixed(2)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, -1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
                            >
                              <Minus className="w-3 h-3 text-white" />
                            </button>
                            <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, 1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
                            >
                              <Plus className="w-3 h-3 text-white" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id, item.size)}
                              className="ml-auto text-xs text-red-400/60 hover:text-red-400 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Checkout */}
            {cart.length > 0 && (
              <div className="px-6 py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                {/* Trust badges */}
                <div className="flex items-center gap-4 mb-4 text-white/30 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" />
                    Free shipping
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    Secure payment
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-white/60 text-sm">Subtotal</span>
                  <span className="text-2xl font-bold text-white">${cartTotal.toFixed(2)}</span>
                </div>

                <button
                  className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    color: '#000',
                    boxShadow: '0 0 20px rgba(255,255,255,0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 100%)';
                    e.currentTarget.style.color = '#00d4ff';
                    e.currentTarget.style.border = '2px solid rgba(0,212,255,0.6)';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(0,212,255,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                    e.currentTarget.style.color = '#000';
                    e.currentTarget.style.border = 'none';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(255,255,255,0.2)';
                  }}
                >
                  <CreditCard className="w-5 h-5" />
                  Checkout
                </button>
                <p className="text-center text-xs text-white/25 mt-3">
                  Secure checkout powered by Stripe
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default MaxMerch;
