import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import FilterSidebar from './FilterSidebar';
import { GridListIcon, Grid2Icon, Grid3Icon, Grid4Icon, ChevronDownIcon, FilterIcon } from './icons';
import { useProducts } from '../contexts/ProductContext'; // Import useProducts

interface ShopPageProps {
    onProductQuickView: (product: Product) => void;
    onProductClick: (id: number) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ onProductQuickView, onProductClick }) => {
    const { products: allProducts, isLoading } = useProducts(); // Use products from context
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
    const [gridCols, setGridCols] = useState(4);
    const [sortOption, setSortOption] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    const [filters, setFilters] = useState({
        categories: [] as string[],
        price: { min: 0, max: 1500 },
        colors: [] as string[],
        sizes: [] as string[],
        brands: [] as string[],
    });

    const handleFilterChange = (filterName: string, value: any) => {
        setFilters(prev => ({...prev, [filterName]: value}));
        setCurrentPage(1); // Reset to first page on filter change
    };

    const clearFilters = () => {
        setFilters({
            categories: [],
            price: { min: 0, max: 1500 },
            colors: [],
            sizes: [],
            brands: [],
        });
        setCurrentPage(1);
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const productsPerPage = 8;

    useEffect(() => {
        let processedProducts = [...allProducts];

        // Filtering logic
        if (filters.categories.length > 0) {
            processedProducts = processedProducts.filter(p => filters.categories.includes(p.category));
        }
        processedProducts = processedProducts.filter(p => p.price >= filters.price.min && p.price <= filters.price.max);
        if (filters.colors.length > 0) {
            processedProducts = processedProducts.filter(p => p.color?.some(c => filters.colors.includes(c)));
        }
        if (filters.sizes.length > 0) {
            processedProducts = processedProducts.filter(p => p.size?.some(s => filters.sizes.includes(s)));
        }
        if (filters.brands.length > 0) {
            processedProducts = processedProducts.filter(p => p.brand && filters.brands.includes(p.brand));
        }
        
        // Sorting logic
        processedProducts.sort((a, b) => {
            switch (sortOption) {
                case 'price-asc': return a.price - b.price;
                case 'price-desc': return b.price - a.price;
                case 'rating': return (b.rating || 0) - (a.rating || 0);
                default: return 0;
            }
        });
        
        setTotalPages(Math.ceil(processedProducts.length / productsPerPage));

        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        setDisplayedProducts(processedProducts.slice(startIndex, endIndex));

    }, [allProducts, currentPage, sortOption, filters]);
    
    const gridClasses: { [key: number]: string } = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-2 md:grid-cols-3',
        4: 'grid-cols-2 md:grid-cols-4',
    };

    const gridOptions = [
        { cols: 1, icon: <GridListIcon className="w-5 h-5" /> },
        { cols: 2, icon: <Grid2Icon className="w-5 h-5" /> },
        { cols: 3, icon: <Grid3Icon className="w-5 h-5" /> },
        { cols: 4, icon: <Grid4Icon className="w-5 h-5" /> },
    ];

    const currentProductCount = displayedProducts.length;
    const totalFilteredProducts = allProducts.filter(p => {
         if (filters.categories.length > 0 && !filters.categories.includes(p.category)) return false;
         if (p.price < filters.price.min || p.price > filters.price.max) return false;
         if (filters.colors.length > 0 && !p.color?.some(c => filters.colors.includes(c))) return false;
         if (filters.sizes.length > 0 && !p.size?.some(s => filters.sizes.includes(s))) return false;
         if (filters.brands.length > 0 && (!p.brand || !filters.brands.includes(p.brand))) return false;
         return true;
    }).length;

    if (isLoading) {
        return <div className="bg-white"><div className="container mx-auto px-4 py-20 text-center">Loading products...</div></div>;
    }


    return (
        <div className="bg-white">
            <div className="bg-gray-100 py-8" style={{backgroundImage: 'url(https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761502936/breadcrumb_bg_xwnbkv.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-gray-800">Shop</h1>
                    <div className="text-sm text-gray-600 mt-2">
                        <Link to="/" className="hover:text-black">Home</Link>
                        <span className="mx-2">/</span>
                        <span>Shop</span>
                    </div>
                </div>
            </div>

            <div className={`container mx-auto px-4 py-12 transition-opacity duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8">
                    {/* Filters */}
                    <FilterSidebar 
                        isOpen={isFilterOpen} 
                        onClose={() => setFilterOpen(false)} 
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onClearFilters={clearFilters}
                    />

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        {/* Top bar */}
                        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center mb-6 border-b pb-4 gap-y-4">
                            <p className="text-sm text-gray-600 w-full sm:w-auto order-2 sm:order-1 text-left">
                                Showing {Math.min((currentPage - 1) * productsPerPage + 1, totalFilteredProducts)}–{Math.min(currentPage * productsPerPage, totalFilteredProducts)} of {totalFilteredProducts} results
                            </p>

                            <div className="flex items-center justify-between sm:justify-end gap-x-4 w-full sm:w-auto order-1 sm:order-2">
                                <button onClick={() => setFilterOpen(true)} className="lg:hidden flex items-center gap-2 font-semibold text-sm border px-3 py-2 rounded-md hover:bg-gray-100">
                                    <FilterIcon className="w-5 h-5"/>
                                    Filters
                                </button>
                                
                                <div className="hidden md:flex items-center space-x-2">
                                    {gridOptions.map(option => (
                                        <button
                                            key={option.cols}
                                            onClick={() => setGridCols(option.cols)}
                                            className={`p-2 rounded-md transition-colors ${gridCols === option.cols ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                            aria-label={`Set grid to ${option.cols} columns`}
                                        >
                                            {option.icon}
                                        </button>
                                    ))}
                                </div>
                                <div className="relative">
                                    <select
                                        value={sortOption}
                                        onChange={(e) => setSortOption(e.target.value)}
                                        className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="default">Default sorting</option>
                                        <option value="rating">Sort by average rating</option>
                                        <option value="price-asc">Sort by price: low to high</option>
                                        <option value="price-desc">Sort by price: high to low</option>
                                    </select>
                                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Product grid */}
                        {displayedProducts.length > 0 ? (
                             <div className={`grid ${gridClasses[gridCols]} gap-6`}>
                                {displayedProducts.map(product => (
                                    <ProductCard 
                                        key={product.id} 
                                        product={product} 
                                        onQuickView={onProductQuickView} 
                                        onProductClick={onProductClick} 
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-lg text-gray-600">No products found matching your criteria.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        <Pagination 
                            currentPage={currentPage} 
                            totalPages={totalPages} 
                            onPageChange={(page) => setCurrentPage(page)} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;