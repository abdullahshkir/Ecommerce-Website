import React, { useState, useEffect, useContext } from 'react';
import { CloseIcon, MinusIcon, PlusIcon } from './icons';
import { ProductContext } from '../contexts/ProductContext';

interface FilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    filters: any;
    onFilterChange: (filterName: string, value: any) => void;
    onClearFilters: () => void;
}

const AccordionItem: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-4 text-left"
            >
                <h3 className="font-semibold text-gray-800">{title}</h3>
                {isOpen ? <MinusIcon className="w-4 h-4 text-gray-500" /> : <PlusIcon className="w-4 h-4 text-gray-500" />}
            </button>
            {isOpen && <div className="pb-4">{children}</div>}
        </div>
    );
};

const ColorSwatch: React.FC<{ color: string; name: string; selected?: boolean, onClick: (color: string) => void }> = ({ color, name, selected, onClick }) => (
    <button onClick={() => onClick(name)} className={`w-8 h-8 rounded-full border-2 ${selected ? 'border-blue-500 p-0.5' : 'border-transparent'} flex items-center justify-center transition-all`}>
        <span style={{ backgroundColor: color }} className="w-full h-full rounded-full border border-gray-200"></span>
    </button>
);

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose, filters, onFilterChange, onClearFilters }) => {
    const { products } = useContext(ProductContext);
    
    const [isMounted, setIsMounted] = useState(isOpen);
    const [isActive, setIsActive] = useState(isOpen);

    useEffect(() => {
        let mountTimeout: number;
        let activeTimeout: number;

        if (isOpen) {
            setIsMounted(true);
            mountTimeout = window.setTimeout(() => {
                 setIsActive(true);
            }, 10);
        } else {
            setIsActive(false);
            activeTimeout = window.setTimeout(() => {
                setIsMounted(false);
            }, 300);
        }
        
        return () => {
            window.clearTimeout(mountTimeout);
            window.clearTimeout(activeTimeout);
        };
    }, [isOpen]);

    const handleCheckboxChange = (filterName: string, value: string) => {
        const currentValues = filters[filterName] as string[];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        onFilterChange(filterName, newValues);
    };
    
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFilterChange('price', { ...filters.price, max: Number(e.target.value) });
    };

    // Extract unique values from products for filters
    const allCategories = [...new Set(products.map(p => p.category))];
    const allColors = [...new Set(products.flatMap(p => p.color || []))].map(colorName => ({ name: colorName, hex: colorName.toLowerCase() }));
    const allSizes = [...new Set(products.flatMap(p => p.size || []))];
    const allBrands = [...new Set(products.flatMap(p => p.brand || []))];

    const sidebarContent = (
        <div className="flex flex-col h-full">
            <div className="p-6 border-b flex justify-between items-center">
                <h2 className="font-bold text-lg">Filters</h2>
                <button onClick={onClose} className="lg:hidden"><CloseIcon className="w-5 h-5"/></button>
            </div>
            <div className="flex-grow p-6 overflow-y-auto">
                <AccordionItem title="CATEGORIES" defaultOpen>
                    <ul className="space-y-3 pt-2">
                        {allCategories.map(cat => (
                           <li key={cat} className="flex items-center">
                                <input id={`cat-${cat}`} type="checkbox" checked={filters.categories.includes(cat)} onChange={() => handleCheckboxChange('categories', cat)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <label htmlFor={`cat-${cat}`} className="ml-3 text-sm text-gray-600 cursor-pointer">{cat}</label>
                            </li>
                        ))}
                    </ul>
                </AccordionItem>
                <AccordionItem title="PRICE">
                   <div className="mt-4">
                        <input type="range" min="0" max="1500" value={filters.price.max} onChange={handlePriceChange} className="w-full" />
                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                            <span>$0</span>
                            <span>${filters.price.max}</span>
                        </div>
                    </div>
                </AccordionItem>
                <AccordionItem title="COLOR">
                    <div className="flex flex-wrap gap-2 pt-2">
                        {allColors.map(color => <ColorSwatch key={color.name} color={color.hex} name={color.name} selected={filters.colors.includes(color.name)} onClick={(name) => handleCheckboxChange('colors', name)} />)}
                    </div>
                </AccordionItem>
                <AccordionItem title="SIZE">
                     <div className="flex flex-wrap gap-2 pt-2">
                        {allSizes.map(size => (
                            <button key={size} onClick={() => handleCheckboxChange('sizes', size)} className={`px-4 py-2 text-sm border rounded-md transition-colors ${filters.sizes.includes(size) ? 'bg-black text-white border-black' : 'bg-white hover:bg-gray-100'}`}>{size}</button>
                        ))}
                    </div>
                </AccordionItem>
                 <AccordionItem title="BRAND">
                    <ul className="space-y-3 pt-2">
                        {allBrands.map(brand => (
                            <li key={brand} className="flex items-center">
                                <input id={`brand-${brand}`} type="checkbox" checked={filters.brands.includes(brand)} onChange={() => handleCheckboxChange('brands', brand)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <label htmlFor={`brand-${brand}`} className="ml-3 text-sm text-gray-600 cursor-pointer">{brand}</label>
                            </li>
                        ))}
                    </ul>
                </AccordionItem>
            </div>
            <div className="p-6 border-t mt-auto">
                <button onClick={onClearFilters} className="w-full bg-gray-200 text-gray-800 py-3 rounded-full font-bold hover:bg-gray-300 text-sm">
                    Clear All Filters
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Off-canvas */}
            {isMounted && (
                <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
                    <div className={`relative w-full max-w-xs bg-white h-full shadow-xl transform transition-transform duration-300 ease-in-out ${isActive ? 'translate-x-0' : '-translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
                       {sidebarContent}
                    </div>
                </div>
            )}


            {/* Desktop Sidebar */}
            <aside className="hidden lg:block">
                {sidebarContent}
            </aside>
        </>
    );
};

export default FilterSidebar;