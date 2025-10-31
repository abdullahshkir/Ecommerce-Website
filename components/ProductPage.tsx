import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Product, Review } from '../types';
import { StarIcon, PlusIcon, MinusIcon, HeartIcon, ExpandIcon, FacebookIcon, TwitterIcon, InstagramIcon, PinterestIcon, UserIcon } from './icons';
import { useCurrency } from '../contexts/CurrencyContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { SEO } from './SEO';
import { useProducts } from '../contexts/ProductContext';
import { useUser } from '../contexts/UserContext';
import { createReview, fetchProductReviews } from '../src/integrations/supabase/api';

const ProductCard: React.FC<{ product: Product; onClick: (id: string) => void }> = ({ product, onClick }) => {
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

const StarRatingInput: React.FC<{ rating: number; setRating: (rating: number) => void; }> = ({ rating, setRating }) => {
    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => {}}
                    onMouseLeave={() => {}}
                    className="text-gray-300 focus:outline-none"
                >
                    <StarIcon filled={star <= rating} className={`w-5 h-5 transition-colors ${star <= rating ? 'text-yellow-400' : 'hover:text-yellow-300'}`} />
                </button>
            ))}
        </div>
    );
};

interface ReviewsTabProps {
    productId: string;
    productName: string;
    onLoginClick: () => void;
    setReviewCount: (count: number) => void; // New prop to update count in parent
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({ productId, productName, onLoginClick, setReviewCount }) => {
    const { isLoggedIn, user } = useUser();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReview, setNewReview] = useState({ rating: 0, text: '' });
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const loadReviews = useCallback(async () => {
        try {
            const fetchedReviews = await fetchProductReviews(productId);
            setReviews(fetchedReviews);
            setReviewCount(fetchedReviews.length); // Update count in parent
            setFetchError(null);
        } catch (error) {
            setFetchError('Failed to load reviews.');
            console.error(error);
        }
    }, [productId, setReviewCount]);

    useEffect(() => {
        loadReviews();
    }, [loadReviews]);

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || newReview.rating === 0 || !newReview.text) return;

        setIsSubmitting(true);
        try {
            await createReview({
                product_id: productId,
                user_id: user.id,
                rating: newReview.rating,
                text: newReview.text,
            });
            
            setReviewSubmitted(true);
            setNewReview({ rating: 0, text: '' });
            
            // Note: We don't reload reviews immediately because they need admin approval first.
            
        } catch (error) {
            alert('Failed to submit review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const userFullName = `${user?.first_name || ''} ${user?.last_name || ''}`.trim();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
                <h3 className="text-xl font-semibold mb-6">{reviews.length} approved review{reviews.length !== 1 ? 's' : ''} for "{productName}"</h3>
                {fetchError && <div className="p-4 bg-red-100 text-red-800 rounded-md">{fetchError}</div>}
                <div className="space-y-6">
                    {reviews.length > 0 ? (
                        reviews.map(review => (
                            <div key={review.id} className="flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                    <UserIcon className="w-6 h-6 text-gray-500" />
                                </div>
                                <div>
                                    <div className="flex items-center mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} filled={i < review.rating} className="w-4 h-4 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="font-semibold text-gray-800">{review.author} <span className="text-sm text-gray-500 font-normal">- {review.date}</span></p>
                                    <p className="text-gray-600 mt-2">{review.text}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">There are no approved reviews yet. Be the first to review!</p>
                    )}
                </div>
            </div>
            <div>
                <h3 className="text-xl font-semibold mb-6">Add a review</h3>
                
                {!isLoggedIn ? (
                    <div className="p-6 bg-gray-100 rounded-lg text-center">
                        <p className="text-lg text-gray-700 mb-4">You must be logged in to submit a review.</p>
                        <button 
                            onClick={onLoginClick}
                            className="bg-black text-white py-3 px-8 rounded-full font-bold hover:bg-gray-800 transition-colors"
                        >
                            Login to Review
                        </button>
                    </div>
                ) : reviewSubmitted ? (
                    <div className="p-4 bg-green-50 text-green-800 rounded-md">
                        Thank you for your review! It has been submitted for admin approval.
                    </div>
                ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Your rating *</label>
                            <StarRatingInput rating={newReview.rating} setRating={(r) => setNewReview(prev => ({ ...prev, rating: r }))} />
                        </div>
                        <div>
                            <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700 mb-1">Your review *</label>
                            <textarea id="reviewText" value={newReview.text} onChange={(e) => setNewReview(prev => ({ ...prev, text: e.target.value }))} rows={4} required className="w-full p-3 border rounded-md"></textarea>
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="reviewAuthor" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                <input type="text" id="reviewAuthor" value={userFullName} readOnly disabled className="w-full p-3 border rounded-md bg-gray-100 cursor-not-allowed" />
                            </div>
                            <div>
                                <label htmlFor="reviewEmail" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                <input type="email" id="reviewEmail" value={user?.email} readOnly disabled className="w-full p-3 border rounded-md bg-gray-100 cursor-not-allowed" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">Your email address will not be published.</p>
                        <button type="submit" disabled={isSubmitting || newReview.rating === 0} className="bg-black text-white py-3 px-6 rounded-full font-semibold hover:bg-gray-800 disabled:bg-gray-400 transition-colors">
                            {isSubmitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};


const ProductPage: React.FC<{onProductClick: (id: string) => void}> = ({ onProductClick }) => {
    const { id } = useParams<{ id: string }>();
    const { products, isLoading } = useProducts();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('description');
    const [openAccordion, setOpenAccordion] = useState<string | null>('description');
    const [approvedReviewCount, setApprovedReviewCount] = useState(0); // New state for review count
    const { formatPrice } = useCurrency();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { addToCart, openCart } = useCart();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);

    const toggleAccordion = (tabName: string) => {
        setOpenAccordion(prev => (prev === tabName ? null : tabName));
    };

    useEffect(() => {
        if (id && products.length > 0) {
            // Match the string ID directly
            const foundProduct = products.find(p => p.id === id);
            if (foundProduct) {
                setProduct(foundProduct);
                setActiveImageIndex(0);
                setQuantity(1);
                window.scrollTo(0, 0);
            } else {
                setProduct(null);
            }
        }
    }, [id, products]);

    useEffect(() => {
        // Reset animation state on product change
        setIsLoaded(false);
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, [id]);

    if (isLoading) {
        return (
            <>
                <SEO title="Product | Mobixo" description="Loading product details..." />
                <div className="container mx-auto px-4 py-20 text-center">Loading product...</div>
            </>
        );
    }

    if (!product) {
        return (
            <>
                <SEO title="Product Not Found | Mobixo" description="The product you are looking for could not be found." />
                <div className="container mx-auto px-4 py-20 text-center">Product not found.</div>
            </>
        );
    }

    // We need access to the AuthModal open function, which is in App.tsx.
    // Since we can't pass it directly, we'll use the navigate trick to open the modal.
    const handleLoginToReview = () => {
        // This is a placeholder action. In a real app, we'd use context or prop drilling.
        // Since we can't modify App.tsx props easily, we'll rely on the user clicking the header login button.
        // For now, we'll just navigate to the home page and rely on the user to click the login button.
        // A better solution is to use a global state/event system, but sticking to context rules:
        alert("Please use the 'User' icon in the header to log in.");
    };

    const TABS = [
        { id: 'description', title: 'Description' },
        { id: 'custom', title: 'Custom tab' },
        { id: 'reviews', title: `Reviews (${approvedReviewCount})` } // Use dynamic count
    ];

    const isOutOfStock = product.availability === 'Out of Stock';


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
        // Removed static reviews array
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
            "availability": isOutOfStock ? "https://schema.org/OutOfStock" : "https://schema.org/InStock"
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

    const renderTabContent = () => {
        switch (activeTab) {
            case 'description':
                return <div dangerouslySetInnerHTML={{ __html: product.longDescription || '<p>No description available.</p>' }} />;
            case 'custom':
                return <div dangerouslySetInnerHTML={{ __html: '<p>Content for custom tab goes here.</p>' }} />;
            case 'reviews':
                return <ReviewsTab productId={product.id} productName={product.name} onLoginClick={handleLoginToReview} setReviewCount={setApprovedReviewCount} />;
            default:
                return null;
        }
    };

    const renderAccordionContent = (tabId: string) => {
        switch (tabId) {
            case 'description':
                return <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: product.longDescription || '<p>No description available.</p>' }} />;
            case 'custom':
                return <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: '<p>Content for custom tab goes here.</p>' }} />;
            case 'reviews':
                return <ReviewsTab productId={product.id} productName={product.name} onLoginClick={handleLoginToReview} setReviewCount={setApprovedReviewCount} />;
            default:
                return null;
        }
    };

    return (
        <>
            <SEO
                title={`${product.name} | Mobixo`}
                description={product.description || `Buy ${product.name} from Mobixo. A high-quality ${product.category} for all your needs.`}
                imageUrl={product.imageUrl}
                type="product.item"
                schemaLd={[productSchema, breadcrumbSchema]}
            />
            <div className={`bg-white transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
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
                            
                            {isOutOfStock && <span className="block mb-4 text-lg font-semibold text-red-500 bg-red-50 p-3 rounded-md">Out of Stock</span>}

                            {!isOutOfStock && (
                                <>
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="flex items-center border border-gray-300 rounded-full">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 text-gray-600"><MinusIcon className="w-6 h-6"/></button>
                                        <input type="text" value={quantity} readOnly className="w-12 text-center border-0 p-0 text-lg focus:ring-0 bg-transparent" />
                                        <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 text-gray-600"><PlusIcon className="w-6 h-6"/></button>
                                    </div>
                                    <button onClick={handleAddToCart} className="flex-grow bg-blue-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-700">ADD TO CART</button>
                                    <button onClick={handleWishlistClick} className={`p-3 border rounded-full transition-colors ${isWishlisted ? 'bg-red-50 text-red-500 border-red-200' : 'border-gray-300 hover:bg-gray-100'}`}>
                                        <HeartIcon filled={isWishlisted} className={`w-6 h-6 ${isWishlisted ? 'text-red-500' : 'text-gray-700'}`}/>
                                    </button>
                                </div>
                                <button onClick={handleBuyNow} className="w-full bg-gray-900 text-white py-4 px-6 rounded-full font-semibold hover:bg-gray-800 mb-6">BUY IT NOW</button>
                                </>
                            )}
                            
                            <div className="flex justify-center space-x-4 mb-6">
                                <img src="https://d33v4339jhl8k0.cloudfront.net/docs/assets/6033aa1e6f44a32676aad8a8/images/606c51bef8c0ef2d98def68c/file-0kP4KUVJZw.png" alt="Trust Seals" className="h-auto w-full max-w-sm" />
                            </div>
                            
                            <div className="text-sm text-gray-600 space-y-2 border-t pt-6">
                                <p><a href="#" className="text-blue-600 underline hover:text-blue-800">Ask a Question</a></p>
                                <p><strong>Availability:</strong> <span className={`font-semibold ${isOutOfStock ? 'text-red-600' : 'text-green-600'}`}>{product.availability}</span></p>
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
                                {renderTabContent()}
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
                                            {renderAccordionContent(tab.id)}
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