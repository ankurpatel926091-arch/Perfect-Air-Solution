import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, SlidersHorizontal, Grid, List, ExternalLink,
  Truck, Award, ShieldCheck, CheckCircle, Star,
  Wind, Zap, Phone, ShoppingCart, ChevronDown,
  MessageCircle
} from 'lucide-react';

// --- TYPES ---
export interface Product {
  id: string;
  brand: string;
  title: string;
  model: string;
  series: string;
  capacity: string;
  rating: string;
  warranty: string;
  keyFeatures: string[];
  moreFeaturesCount?: number;
  currentPrice: number;
  originalPrice: number;
  savings: number;
  discountPercentage: number;
  isFeatured: boolean;
  reviewCount: number;
  imageUrl?: string;
}

// --- MOCK DATA ---
const products: Product[] = [
  {
    id: '1',
    brand: 'Daikin',
    title: 'Daikin 1.5 Ton 3 Star Inverter Split AC',
    model: 'FTKC50UV',
    series: 'FTK Series',
    capacity: '1.5 Ton',
    rating: '3 Star',
    warranty: '5Y Warranty',
    keyFeatures: ['Inverter Technology', 'Copper Condenser', 'Anti-Viral Filter'],
    moreFeaturesCount: 2,
    currentPrice: 34000,
    originalPrice: 36999,
    savings: 2999,
    discountPercentage: 13,
    isFeatured: true,
    reviewCount: 127,
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400&h=200&auto=format&fit=crop'
  },
  {
    id: '2',
    brand: 'Mitsubishi Heavy',
    title: 'Mitsubishi Heavy 1.3 Ton Split AC (SRK 15CXS-W6)',
    model: 'SRK 15CXS-W6',
    series: 'Hybrid+',
    capacity: '1.3 Ton',
    rating: '3 Star',
    warranty: '5Y Warranty',
    keyFeatures: ['Dual Capillary Expansion', 'Super Tropical Rotary Compressor', 'Copper Condenser'],
    currentPrice: 44500,
    originalPrice: 51900,
    savings: 7400,
    discountPercentage: 14,
    isFeatured: false,
    reviewCount: 67,
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400&h=200&auto=format&fit=crop',
  },
  {
    id: '3',
    brand: 'Mitsubishi Heavy',
    title: 'Mitsubishi Heavy 2.1 Ton 5 Star (Heating + Cooling) Inverter Split...',
    model: 'SRK 71 ZR',
    series: 'Hyper Inverter',
    capacity: '2.1 Ton',
    rating: '5 Star',
    warranty: '9Y Warranty',
    keyFeatures: ['Best in industry', 'Turbojet Flow', 'Allergen Clear Filter'],
    currentPrice: 97999,
    originalPrice: 122499,
    savings: 24500,
    discountPercentage: 20,
    isFeatured: true,
    reviewCount: 48,
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400&h=200&auto=format&fit=crop'
  },
  {
    id: '4',
    brand: 'Mitsubishi Heavy',
    title: 'Mitsubishi Heavy 2.2 Ton 3 Star Non-Inverter Split AC',
    model: 'SRK25CSS-S6/A',
    series: 'Hybrid Heavy Duty Series',
    capacity: '2.2 Ton',
    rating: '3 Star',
    warranty: '4Y Warranty',
    keyFeatures: ['3D Airflow', 'Heavy Duty', 'Self Diagnosis'],
    moreFeaturesCount: 1,
    currentPrice: 68999,
    originalPrice: 82999,
    savings: 14000,
    discountPercentage: 18,
    isFeatured: true,
    reviewCount: 56,
    imageUrl: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?q=80&w=400&h=200&auto=format&fit=crop'
  }
];

// --- UTILS ---
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function Shop() {
  const navigate = useNavigate();

  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedRating, setSelectedRating] = useState('All Ratings');

  const brands = useMemo(() => ['All Brands', ...Array.from(new Set(products.map(p => p.brand)))], []);
  const ratings = useMemo(() => ['All Ratings', ...Array.from(new Set(products.map(p => p.rating)))].sort(), []);

  // --- FILTER LOGIC ---
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.model.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBrand = selectedBrand === 'All Brands' || product.brand === selectedBrand;
      const matchesRating = selectedRating === 'All Ratings' || product.rating === selectedRating;

      return matchesSearch && matchesBrand && matchesRating;
    });
  }, [searchQuery, selectedBrand, selectedRating]);

  // --- NAVIGATION ---
  const handleBuyNow = (product: Product) => {
    navigate('/checkout', { state: { product } });
  };

  const displayFont = { fontFamily: "'Inter', sans-serif", fontWeight: 800 as const };

  return (
    <>
      <div className="min-h-screen bg-[#F4FAFE] font-sans text-slate-800 pb-12">
        {/* Header Section */}
        <div className="bg-[#E8F6FC] pt-12 pb-8 px-4 flex flex-col items-center text-center">
          <h1
            style={displayFont}
            className="text-3xl md:text-4xl text-slate-900 mb-4 mt-14"
          >
            Shop Premium Air Conditioners & HVAC Products
          </h1>
          <p className="text-slate-500 max-w-2xl mb-8">
            Find the perfect solution for your home with our wide selection of energy-efficient
            HVAC products from top brands.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm px-6 py-4 flex items-center gap-4 min-w-[200px] relative">
              <ExternalLink className="absolute top-2 right-2 w-4 h-4 text-slate-300" />
              <div className="font-bold text-3xl text-orange-500">Jd</div>
              <div className="text-left">
                <div className="font-semibold text-sm">JustDial</div>
                <div className="text-xs text-slate-400">400+ ratings</div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm px-6 py-4 flex items-center gap-4 min-w-[200px] relative">
              <ExternalLink className="absolute top-2 right-2 w-4 h-4 text-slate-300" />
              <div className="font-bold text-2xl text-red-600">IndiaMART</div>
              <div className="text-left">
                <div className="font-semibold text-sm">IndiaMART</div>
                <div className="text-xs text-slate-400">Trusted Seller</div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm px-6 py-4 flex items-center gap-4 min-w-[200px] relative">
              <ExternalLink className="absolute top-2 right-2 w-4 h-4 text-slate-300" />
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-500 font-bold">G</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm">Google Maps</div>
                <div className="text-xs text-slate-400">Most Searched</div>
              </div>
            </div>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            <span className="bg-[#e2e8f0] text-slate-700 text-xs font-medium px-4 py-2 rounded-full flex items-center gap-2">
              <Truck className="w-4 h-4" /> Free Shipping All Over UP
            </span>
            <span className="bg-[#e2e8f0] text-slate-700 text-xs font-medium px-4 py-2 rounded-full flex items-center gap-2">
              <Award className="w-4 h-4" /> Best Price Guaranteed
            </span>
            <span className="bg-[#e2e8f0] text-slate-700 text-xs font-medium px-4 py-2 rounded-full flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Warranty On All Products
            </span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-slate-100">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for ACs by brand, model, or features..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="bg-[#082A45] text-white px-8 py-2 rounded-lg font-medium hover:bg-[#0E3D5E] transition-colors">
                Search
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </button>

                <div className="relative">
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="appearance-none flex items-center gap-2 border border-slate-200 pl-4 pr-10 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 bg-white outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className="appearance-none flex items-center gap-2 border border-slate-200 pl-4 pr-10 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 bg-white outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    {ratings.map(rating => (
                      <option key={rating} value={rating}>{rating}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 style={displayFont} className="text-xl text-slate-700">No products found</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                  <div className="relative p-4 pt-6 h-56 flex items-center justify-center bg-white">
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">
                      -{product.discountPercentage}% OFF
                    </div>
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="max-h-full object-contain mix-blend-multiply opacity-90 transition-transform hover:scale-105 duration-300"
                    />
                  </div>

                  <div className="p-5 flex-grow flex flex-col border-t border-slate-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs border border-slate-200 text-slate-500 px-2 py-1 rounded-full">
                        {product.brand}
                      </span>
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < parseInt(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-200 text-slate-200'}`} />
                          ))}
                        </div>
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-800 text-[15px] leading-tight mb-2 line-clamp-2">
                      {product.title}
                    </h3>

                    <div className="mt-auto">
                      <div className="flex items-baseline gap-2">
                        <span style={displayFont} className="text-[#082A45] text-xl">{formatCurrency(product.currentPrice)}</span>
                        <span className="text-slate-400 text-sm line-through">{formatCurrency(product.originalPrice)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 grid grid-cols-2 gap-3 border-t border-slate-100">
                    <a
                      href="tel:+919839171701"
                      className="flex items-center justify-center gap-2 border border-slate-300 text-slate-700 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors"
                      style={{ textDecoration: 'none' }}
                    >
                      <Phone className="w-4 h-4" /> Call Now
                    </a>


                    <button
                      onClick={() => handleBuyNow(product)}
                      className="flex items-center justify-center gap-2 bg-[#f97316] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#ea580c] transition-colors shadow-sm shadow-orange-200"
                    >
                      <MessageCircle className="w-4 h-4" /> Enquiry
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
