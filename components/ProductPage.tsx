import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { Product } from '../types';
import { StarIcon, PlusIcon, MinusIcon, HeartIcon, ExpandIcon, FacebookIcon, TwitterIcon, InstagramIcon, PinterestIcon } from './icons';
import { useCurrency } from '../contexts/CurrencyContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { SEO } from './SEO';

const ProductCard: React.FC<{ product: Product; onClick: (id: number) => void }> = ({ product, onClick }) => {
    const { formatPrice } = useCurrency();
    return (
        <div className="group relative text-center cursor-pointer" onClick={() => onClick(product.id)}>
            <div className="relative overflow-hidden">
                 <div className="relative h-[220px] sm:h-[300px]">
                    <img src={product.imageUrl} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
                </div>
            </div>
            <div className="pt-4">
                <h3 className="text-base font-semibold text-gray-800 mt-1 mb-2">
                    <span className="hover:text-black">{product.name}</span>
                </h3>
                <div className="flex justify-center items-center space-x-2">
                    <span className="text-lg font-bold text-black">{formatPrice(product.price)}</span>
                    {product.oldPrice && <span className="text-sm text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>}
                </div>
            </div>
        </div>
    );
};

const ProductPage: React.FC<{onProductClick: (id: number) => void}> = ({ onProductClick }) => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('description');
    const [openAccordion, setOpenAccordion] = useState<string | null>('description');
    const { formatPrice } = useCurrency();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { addToCart, openCart } = useCart();
    const navigate = useNavigate();

    const toggleAccordion = (tabName: string) => {
        setOpenAccordion(prev => (prev === tabName ? null : tabName));
    };

    useEffect(() => {
        const productId = parseInt(id || '', 10);
        const foundProduct = products.find(p => p.id === productId);
        if (foundProduct) {
            setProduct(foundProduct);
            setActiveImageIndex(0);
            setQuantity(1);
            window.scrollTo(0, 0);
        } else {
            setProduct(null);
        }
    }, [id]);

    if (!product) {
        return (
            <>
                <SEO title="Product Not Found | Mobixo" description="The product you are looking for could not be found." />
                <div className="container mx-auto px-4 py-20 text-center">Product not found.</div>
            </>
        );
    }

    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": product.images || [product.imageUrl],
        "description": product.description,
        "sku": `MOB-${product.id}`,
        "brand": {
            "@type": "Brand",
            "name": "Mobixo"
        },
        "review": {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": product.rating || "4",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "Mobixo Customer"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating || "4.5",
            "reviewCount": product.reviewCount || Math.floor(Math.random() * 50) + 5
        },
        "offers": {
            "@type": "Offer",
            "url": `https://mobixo.com/#/product/${product.id}`,
            "priceCurrency": "USD",
            "price": product.price.toFixed(2),
            "priceValidUntil": "2025-12-31",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": product.availability === 'In Stock' ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://mobixo.com/#/"
        },{
            "@type": "ListItem",
            "position": 2,
            "name": product.category,
        },{
            "@type": "ListItem",
            "position": 3,
            "name": product.name
        }]
    };
    
    const TABS = [
        { id: 'description', title: 'Description', content: product.longDescription || '<p>No description available.</p>' },
        { id: 'custom', title: 'Custom tab', content: '<p>Content for custom tab goes here.</p>' },
        { id: 'reviews', title: 'Reviews', content: '<p>Reviews will be displayed here.</p>' }
    ];

    const isWishlisted = isInWishlist(product.id);
    const handleWishlistClick = () => {
        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };
    
    const handleAddToCart = () => {
        if (product) {
          addToCart(product, quantity);
          openCart();
        }
    };

    const handleBuyNow = () => {
        if (product) {
            const buyNowItem = { ...product, quantity };
            navigate('/checkout', { state: { buyNowItem } });
        }
    };

    const images = product.images || [product.imageUrl, product.imageUrl2];
    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <>
            <SEO
                title={`${product.name} | Mobixo`}
                description={product.description || `Buy ${product.name} from Mobixo. A high-quality ${product.category} for all your needs.`}
                imageUrl={product.imageUrl}
                type="product.item"
                schemaLd={[productSchema, breadcrumbSchema]}
            />
            <div className="bg-white">
                {/* Breadcrumbs */}
                <div className="bg-gray-100 py-3">
                    <div className="container mx-auto px-4 text-sm text-gray-500">
                        <Link to="/" className="hover:text-gray-800">Home</Link>
                        <span className="mx-2">/</span>
                        <span className="hover:text-gray-800">{product.category}</span>
                        <span className="mx-2">/</span>
                        <span className="text-gray-800">{product.name}</span>
                    </div>
                </div>

                {/* Main Product Section */}
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Image Gallery */}
                        <div>
                            <div className="relative mb-4 border rounded-lg overflow-hidden">
                                <img src={images[activeImageIndex]} alt={product.name} className="w-full h-auto aspect-square object-contain" />
                                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow hover:bg-gray-100"><ExpandIcon /></button>
                            </div>
                            <div className="grid grid-cols-5 gap-2">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveImageIndex(index)}
                                        className={`border-2 rounded-lg overflow-hidden ${activeImageIndex === index ? 'border-blue-500' : 'border-transparent'}`}
                                    >
                                        <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-auto aspect-square object-contain" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                            <div className="flex items-center mb-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon key={i} filled={i < (product.rating || 0)} className="w-5 h-5 text-yellow-400" />
                                    ))}
                                </div>
                                <span className="ml-2 text-sm text-gray-500">({product.reviewCount || 0} review)</span>
                            </div>
                            <p className="text-4xl font-bold text-gray-900 mb-4">{formatPrice(product.price)}</p>
                            <p className="text-gray-600 mb-6">{product.description}</p>

                            <div className="flex items-center space-x-4 mb-6">
                                <div className="flex items-center border border-gray-300 rounded-full">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-gray-600"><MinusIcon /></button>
                                    <input type="text" value={quantity} readOnly className="w-12 text-center border-0 p-0 text-lg focus:ring-0 bg-transparent" />
                                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-gray-600"><PlusIcon /></button>
                                </div>
                                <button onClick={handleAddToCart} className="flex-grow bg-blue-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-700">ADD TO CART</button>
                                <button onClick={handleWishlistClick} className={`p-3 border rounded-full transition-colors ${isWishlisted ? 'bg-red-50 text-red-500 border-red-200' : 'border-gray-300 hover:bg-gray-100'}`}>
                                    <HeartIcon filled={isWishlisted} className={`w-6 h-6 ${isWishlisted ? 'text-red-500' : 'text-gray-700'}`}/>
                                </button>
                            </div>
                            
                            <button onClick={handleBuyNow} className="w-full bg-gray-900 text-white py-4 px-6 rounded-full font-semibold hover:bg-gray-800 mb-6">BUY IT NOW</button>

                            <div className="flex justify-center space-x-4 mb-6">
                                <img src="https://d33v4339jhl8k0.cloudfront.net/docs/assets/6033aa1e6f44a32676aad8a8/images/606c51bef8c0ef2d98def68c/file-0kP4KUVJZw.png" alt="Trust Seals" className="h-auto w-full max-w-sm" />
                            </div>
                            
                            <div className="text-sm text-gray-600 space-y-2 border-t pt-6">
                                <p><a href="#" className="text-blue-600 underline hover:text-blue-800">Ask a Question</a></p>
                                <p><strong>Availability:</strong> <span className="text-green-600 font-semibold">{product.availability}</span></p>
                                <p><strong>Categories:</strong> {product.categories?.join(', ')}</p>
                                <p><strong>Tags:</strong> {product.tags?.join(', ')}</p>
                                <div className="flex items-center space-x-4 pt-4">
                                    <strong>Share:</strong>
                                    <a href="#" className="text-gray-500 hover:text-blue-600"><FacebookIcon /></a>
                                    <a href="#" className="text-gray-500 hover:text-blue-400"><TwitterIcon /></a>
                                    <a href="#" className="text-gray-500 hover:text-pink-500"><InstagramIcon /></a>
                                    <a href="#" className="text-gray-500 hover:text-red-600"><PinterestIcon /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description Tabs & Accordion */}
                <div className="bg-gray-50 border-t">
                    <div className="container mx-auto px-4 py-12">
                        {/* Desktop Tabs */}
                        <div className="hidden md:block">
                            <div className="border-b mb-8 flex justify-center">
                                {TABS.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-8 py-3 font-semibold ${activeTab === tab.id ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
                                    >
                                        {tab.title}
                                    </button>
                                ))}
                            </div>
                            <div className="max-w-4xl mx-auto text-gray-700 leading-relaxed">
                                {TABS.map(tab => activeTab === tab.id && (
                                    <div key={tab.id} dangerouslySetInnerHTML={{ __html: tab.content }} />
                                ))}
                            </div>
                        </div>

                        {/* Mobile Accordion */}
                        <div className="md:hidden max-w-4xl mx-auto">
                            {TABS.map((tab) => (
                                <div key={tab.id} className="border-b border-gray-200 last:border-b-0">
                                    <button
                                        onClick={() => toggleAccordion(tab.id)}
                                        className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="font-semibold text-gray-900 text-lg">{tab.title}</span>
                                        <span className="bg-gray-800 text-white w-8 h-8 flex items-center justify-center shrink-0 rounded-sm">
                                            {openAccordion === tab.id ? <MinusIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
                                        </span>
                                    </button>
                                    {openAccordion === tab.id && (
                                        <div className="bg-white p-4">
                                            <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: tab.content }} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* You May Also Like */}
                {relatedProducts.length > 0 && (
                    <section className="py-16 sm:py-24 bg-white">
                        <div className="container mx-auto px-4">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">You may also like</h2>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                                {relatedProducts.map(p => (
                                    <ProductCard key={p.id} product={p} onClick={onProductClick} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
};

export default ProductPage;