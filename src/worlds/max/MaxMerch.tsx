// ============================================
// Max Merch - E-commerce with Payment Gateway
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, Filter, X, Plus, Minus, CreditCard, Truck, Shield } from 'lucide-react';

// Merch products data
const merchProducts = [
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
    sizes: ['iPhone', 'Samsung'],
    rating: 4.5,
    reviews: 34,
  },
];

const categories = ['all', 'apparel', 'accessories'];

export function MaxMerch() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState<{ id: number; size: string; quantity: number }[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof merchProducts[0] | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const filteredProducts = activeCategory === 'all'
    ? merchProducts
    : merchProducts.filter((p) => p.category === activeCategory);

  const addToCart = (productId: number, size: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.id === productId && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: productId, size, quantity: 1 }];
    });
    setSelectedProduct(null);
    setShowCart(true);
  };

  const removeFromCart = (productId: number, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === productId && item.size === size)));
  };

  const updateQuantity = (productId: number, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId && item.size === size
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartTotal = cart.reduce((sum, item) => {
    const product = merchProducts.find((p) => p.id === item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const handleCheckout = () => {
    // In production, this would initiate Stripe checkout
    console.log('Initiating Stripe checkout for:', cart);
    setShowCheckout(true);
  };

  return (
    <section id="merch" className="relative py-32 overflow-hidden" style={{ background: '#020814' }}>
      {/* Background decoration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }}
      />

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: '#00d4ff' }}>
            Official Store
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
            MAX <span style={{ color: '#00d4ff' }}>Merch</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Premium merchandise for creators and digital natives. Wear the future.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="px-6 py-2 rounded-full text-sm font-medium capitalize transition-all"
              style={{
                backgroundColor: activeCategory === category ? 'rgba(0, 212, 255, 0.15)' : 'transparent',
                color: activeCategory === category ? '#00d4ff' : 'rgba(255,255,255,0.5)',
                border: activeCategory === category ? '1px solid rgba(0, 212, 255, 0.5)' : '1px solid transparent',
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Cart Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <motion.button
            onClick={() => setShowCart(!showCart)}
            className="relative p-4 rounded-full shadow-lg"
            style={{ background: '#00d4ff', boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingBag className="w-6 h-6 text-black" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </motion.button>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-xl overflow-hidden border border-white/10 hover:border-[#00d4ff]/50 transition-all cursor-pointer"
              style={{ background: 'rgba(0, 212, 255, 0.02)' }}
              onClick={() => setSelectedProduct(product)}
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold" style={{ background: '#ff4444', color: 'white' }}>
                    SALE
                  </div>
                )}
                {product.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold" style={{ background: '#00d4ff', color: '#000' }}>
                    FEATURED
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-white/70">{product.rating}</span>
                  <span className="text-sm text-white/40">({product.reviews})</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00d4ff] transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold" style={{ color: '#00d4ff' }}>${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-white/40 line-through">${product.originalPrice}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Product Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-2xl w-full rounded-2xl overflow-hidden"
                style={{ background: '#0a1628', border: '1px solid rgba(0, 212, 255, 0.3)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <div className="grid md:grid-cols-2">
                  <div className="aspect-square">
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-white/70">{selectedProduct.rating} ({selectedProduct.reviews} reviews)</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{selectedProduct.name}</h3>
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-2xl font-bold" style={{ color: '#00d4ff' }}>${selectedProduct.price}</span>
                      {selectedProduct.originalPrice && (
                        <span className="text-lg text-white/40 line-through">${selectedProduct.originalPrice}</span>
                      )}
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-white/50 mb-2">Size</p>
                      <div className="flex gap-2">
                        {selectedProduct.sizes.map((size) => (
                          <button
                            key={size}
                            className="px-4 py-2 rounded-lg border border-white/20 text-white hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all"
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(selectedProduct.id, selectedProduct.sizes[0])}
                      className="w-full py-4 rounded-lg font-semibold transition-all hover:scale-[1.02]"
                      style={{ background: '#00d4ff', color: '#000' }}
                    >
                      Add to Cart
                    </button>

                    <div className="flex items-center gap-4 mt-6 text-white/50 text-sm">
                      <div className="flex items-center gap-1">
                        <Truck className="w-4 h-4" />
                        <span>Free shipping</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4" />
                        <span>Secure payment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shopping Cart Sidebar */}
        <AnimatePresence>
          {showCart && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md z-50"
              style={{ background: '#0a1628', borderLeft: '1px solid rgba(0, 212, 255, 0.2)' }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <h3 className="text-xl font-bold text-white">Your Cart</h3>
                  <button onClick={() => setShowCart(false)} className="p-2 rounded-lg hover:bg-white/10">
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-white/20" />
                      <p className="text-white/50">Your cart is empty</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => {
                        const product = merchProducts.find((p) => p.id === item.id);
                        if (!product) return null;
                        return (
                          <div key={`${item.id}-${item.size}`} className="flex gap-4 p-4 rounded-lg" style={{ background: 'rgba(0, 212, 255, 0.05)' }}>
                            <img src={product.image} alt={product.name} className="w-20 h-20 rounded-lg object-cover" />
                            <div className="flex-1">
                              <h4 className="text-white font-medium">{product.name}</h4>
                              <p className="text-white/50 text-sm">Size: {item.size}</p>
                              <div className="flex items-center gap-3 mt-2">
                                <button onClick={() => updateQuantity(item.id, item.size, -1)} className="p-1 rounded bg-white/10">
                                  <Minus className="w-4 h-4 text-white" />
                                </button>
                                <span className="text-white">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.size, 1)} className="p-1 rounded bg-white/10">
                                  <Plus className="w-4 h-4 text-white" />
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-white font-bold">${(product.price * item.quantity).toFixed(2)}</p>
                              <button
                                onClick={() => removeFromCart(item.id, item.size)}
                                className="text-sm text-red-400 hover:text-red-300 mt-2"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Checkout */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-white/10">
                    <div className="flex justify-between mb-4">
                      <span className="text-white/70">Subtotal</span>
                      <span className="text-xl font-bold text-white">${cartTotal.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                      style={{ background: '#00d4ff', color: '#000' }}
                    >
                      <CreditCard className="w-5 h-5" />
                      Checkout
                    </button>
                    <p className="text-center text-sm text-white/40 mt-3">
                      Secure checkout powered by Stripe
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default MaxMerch;
