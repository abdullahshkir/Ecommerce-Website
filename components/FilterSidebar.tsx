import React, { useState } from 'react';
import { CloseIcon, MinusIcon, PlusIcon } from './icons';

interface FilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
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
    <button onClick={() => onClick(name)} className={`w-8 h-8 rounded-full border-2 ${selected ? 'border-blue-500' : 'border-transparent'} flex items-center justify-center`}>
        <span style={{ backgroundColor: color }} className="w-6 h-6 rounded-full border border-gray-200"></span>
    </button>
);

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose }) => {
    const categories = ['Accesories', 'Smart TV', 'Camera', 'Digital', 'Watch', 'Headphones'];
    const colors = [{name: 'Black', hex: '#000000'}, {name: 'Blue', hex: '#3b82f6'}, {name: 'Brown', hex: '#a52a2a'}, {name: 'Silver', hex: '#c0c0c0'}, {name: 'White', hex: '#ffffff'}];
    const sizes = ['S', 'M', 'L', 'XL'];
    const brands = ['Apple', 'Canon', 'DJI', 'GoPro', 'Logitech', 'Samsung', 'Sony', 'Timex'];
    
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

    const handleColorClick = (color: string) => {
        setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
    }
    const handleSizeClick = (size: string) => {
        setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
    }

    const sidebarContent = (
        <div className="flex flex-col h-full">
            <div className="p-6 border-b flex justify-between items-center lg:hidden">
                <h2 className="font-bold text-lg">Filters</h2>
                <button onClick={onClose}><CloseIcon className="w-5 h-5"/></button>
            </div>
            <div className="flex-grow p-6 overflow-y-auto">
                <AccordionItem title="CATEGORIES" defaultOpen>
                    <ul className="space-y-2">
                        {categories.map(cat => (
                             <li key={cat}><a href="#" className="text-gray-600 hover:text-black">{cat}</a></li>
                        ))}
                    </ul>
                </AccordionItem>
                <AccordionItem title="PRICE">
                   <div className="mt-4">
                        <input type="range" min="0" max="1500" className="w-full" />
                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                            <span>$0</span>
                            <span>$1500</span>
                        </div>
                    </div>
                </AccordionItem>
                <AccordionItem title="COLOR">
                    <div className="flex flex-wrap gap-2 pt-2">
                        {colors.map(color => <ColorSwatch key={color.name} color={color.hex} name={color.name} selected={selectedColors.includes(color.name)} onClick={handleColorClick} />)}
                    </div>
                </AccordionItem>
                <AccordionItem title="SIZE">
                     <div className="flex flex-wrap gap-2 pt-2">
                        {sizes.map(size => (
                            <button key={size} onClick={() => handleSizeClick(size)} className={`px-4 py-2 text-sm border rounded-md transition-colors ${selectedSizes.includes(size) ? 'bg-black text-white border-black' : 'bg-white hover:bg-gray-100'}`}>{size}</button>
                        ))}
                    </div>
                </AccordionItem>
                 <AccordionItem title="BRAND">
                    <ul className="space-y-3 pt-2">
                        {brands.map(brand => (
                            <li key={brand} className="flex items-center">
                                <input id={`brand-${brand}`} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <label htmlFor={`brand-${brand}`} className="ml-3 text-sm text-gray-600">{brand}</label>
                            </li>
                        ))}
                    </ul>
                </AccordionItem>
            </div>
            <div className="p-6 border-t mt-auto">
                <button className="w-full bg-black text-white py-3 rounded-full font-bold hover:bg-gray-800">
                    Apply Filters
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Off-canvas */}
            <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
                <div className={`relative w-full max-w-xs bg-white h-full shadow-xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                   {sidebarContent}
                </div>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block">
                {sidebarContent}
            </aside>
        </>
    );
};

export default FilterSidebar;