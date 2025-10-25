import { Product } from '../types';

export const products: Product[] = [
    {
        id: 1,
        collection: 'Accesories',
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405072/p1_oklq8n.jpg',
        imageUrl2: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405072/p1-2_xfl63h.jpg',
        category: 'Watch',
        name: 'Classic Leather Watch',
        price: 250.00,
        oldPrice: 300.00,
        isSale: true,
        rating: 4,
        reviewCount: 12,
        description: 'A timeless piece that combines classic design with modern functionality.',
        availability: 'In Stock',
        categories: ['Accesories', 'Watch'],
        tags: ['watch', 'leather', 'classic'],
        images: [
            'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405072/p1_oklq8n.jpg',
            'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405072/p1-2_xfl63h.jpg',
        ]
    },
    {
        id: 2,
        collection: 'Accesories',
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405073/p2_y4qcca.jpg',
        imageUrl2: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405073/p2-2_y2fgrc.jpg',
        category: 'Headphones',
        name: 'Noise-Cancelling Headphones',
        price: 180.00,
        oldPrice: null,
        rating: 5,
        reviewCount: 34,
        description: 'Immerse yourself in music with these high-fidelity noise-cancelling headphones.',
        availability: 'In Stock',
        categories: ['Accesories', 'Audio'],
        tags: ['headphones', 'audio', 'noise-cancelling'],
        images: [
            'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405073/p2_y4qcca.jpg',
            'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405073/p2-2_y2fgrc.jpg',
        ]
    },
    {
        id: 3,
        collection: 'Camera',
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405073/p3_chb27s.jpg',
        imageUrl2: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405074/p3-2_oeb94j.jpg',
        category: 'Camera',
        name: 'Compact Digital Camera',
        price: 450.00,
        oldPrice: 500.00,
        isSale: true,
        rating: 4,
        reviewCount: 20,
        description: 'Capture life\'s moments with this powerful and compact digital camera.',
        availability: 'In Stock',
        categories: ['Camera', 'Digital'],
        tags: ['camera', 'digital', '4k'],
        images: [
            'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405073/p3_chb27s.jpg',
            'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405074/p3-2_oeb94j.jpg',
        ]
    },
    {
        id: 4,
        collection: 'Digital',
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761464405/s2_zxf25n.jpg',
        imageUrl2: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405075/p4_iz2fxi.jpg',
        category: 'Digital',
        name: 'X-Star Premium Drone with 4K',
        price: 450.00,
        oldPrice: null,
        isNew: true,
        rating: 5,
        reviewCount: 1,
        description: 'Go kalles this summer with this vintage navy and white striped v-neck t-shirt from the Nike. Perfect for pairing with denim and white kicks for a stylish kalles vibe.',
        longDescription: `
            <h4 class="font-bold text-lg mb-2">Viverra a consectetur</h4>
            <p class="mb-4">Go sporty this summer with this vintage navy and white striped v-neck t-shirt from the Nike. Perfect for pairing with denim and white kicks for a stylish kalles vibe.</p>
            <h4 class="font-bold text-lg mb-2">Facilisis scelerisque mi</h4>
            <p class="mb-4">Typography is the work of typesetters, compositors, typographers, graphic designers, art directors, manga artists, comic book artists, graffiti artists, and now—anyone who arranges words, letters, numbers, and symbols for publication, display, or distribution—from clerical workers and newsletter writers to anyone self-publishing materials.</p>
            <h4 class="font-bold text-lg mb-2">Ullamcorper metus</h4>
            <p class="mb-4">As the capability to create typography has become ubiquitous, the application of principles and best practices developed over generations of skilled workers and professionals has diminished. Ironically, at a time when scientific techniques.</p>
            <h4 class="font-bold text-lg mb-2">Dignissim a leo cum</h4>
            <p>Digitization opened up typography to new generations of previously unrelated designers and lay users, and David Jury, head of graphic design at Colchester Institute in England, states that "typography is now something everybody does. As the capability to create typography has become ubiquitous, the application of principles and best practices developed over generations of skilled workers and professionals has diminished. Ironically, at a time when scientific techniques.</p>
        `,
        availability: 'In Stock',
        categories: ['Digital'],
        tags: ['digital', 'drone', '4k'],
        images: [
            'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761464405/s2_zxf25n.jpg',
            'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405073/p3_chb27s.jpg',
            'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405075/p4-2_p7xbnq.jpg',
            'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405075/p4_iz2fxi.jpg',
        ],
    },
    {
        id: 5,
        collection: 'Smart TV',
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405076/p5_rbfncl.jpg',
        imageUrl2: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405077/p5-2_fr4vbl.jpg',
        category: 'Speaker',
        name: 'Smart TV Soundbar',
        price: 285.00,
        oldPrice: 350.00,
        isSale: true,
        rating: 4,
        reviewCount: 15,
        description: 'Upgrade your TV audio experience with this powerful and sleek soundbar.',
        availability: 'In Stock',
        categories: ['Smart TV', 'Audio'],
        tags: ['soundbar', 'tv', 'audio'],
        images: [
            'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405076/p5_rbfncl.jpg',
            'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405077/p5-2_fr4vbl.jpg',
        ]
    },
    {
        id: 6,
        collection: 'Digital',
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405077/p6_q8m3go.jpg',
        imageUrl2: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405078/p6-2_y80q1u.jpg',
        category: 'Laptop',
        name: 'Ultra-thin Laptop 13"',
        price: 1200.00,
        oldPrice: null,
        rating: 5,
        reviewCount: 50,
        description: 'A lightweight yet powerful laptop for professionals on the go.',
        availability: 'In Stock',
        categories: ['Digital', 'Computers'],
        tags: ['laptop', 'ultrabook', 'computer'],
        images: [
            'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405077/p6_q8m3go.jpg',
            'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405078/p6-2_y80q1u.jpg',
        ]
    },
    {
        id: 7,
        collection: 'Accesories',
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405079/p7_nd7kfh.jpg',
        imageUrl2: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405079/p7-2_u8f5g6.jpg',
        category: 'Accessories',
        name: 'Wireless Mouse',
        price: 40.00,
        oldPrice: null,
        rating: 4,
        reviewCount: 18,
        description: 'Ergonomic and responsive wireless mouse for seamless navigation.',
        availability: 'Out of Stock',
        categories: ['Accesories', 'Computers'],
        tags: ['mouse', 'wireless', 'accessory'],
        images: [
            'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405079/p7_nd7kfh.jpg',
            'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405079/p7-2_u8f5g6.jpg',
        ]
    },
    {
        id: 8,
        collection: 'Camera',
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761408097/deal1_x6z8gq.jpg',
        imageUrl2: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405073/p3_chb27s.jpg',
        category: 'Camera',
        name: '4K Action Camera',
        price: 350.00,
        oldPrice: 420.00,
        isSale: true,
        isNew: true,
        rating: 5,
        reviewCount: 42,
        description: 'Capture your adventures in stunning detail with this rugged 4K action camera.',
        availability: 'In Stock',
        categories: ['Camera', 'Digital'],
        tags: ['camera', 'action cam', '4k'],
        images: [
            'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761408097/deal1_x6z8gq.jpg',
            'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405073/p3_chb27s.jpg',
        ]
    }
];
