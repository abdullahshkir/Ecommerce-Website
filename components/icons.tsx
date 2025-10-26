import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  filled?: boolean;
}

const defaultProps: Omit<IconProps, 'children'> = {
  className: "w-6 h-6",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const PhoneIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);

export const MailIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);
export const EnvelopeIcon = MailIcon;

export const SearchIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

export const UserIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

export const HeartIcon: React.FC<IconProps> = ({ filled, ...props }) => (
    <svg {...defaultProps} fill={filled ? 'currentColor' : 'none'} {...props}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
);

export const CartIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
);

export const ChevronDownIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><polyline points="6 9 12 15 18 9"></polyline></svg>
);
export const ChevronUpIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><polyline points="18 15 12 9 6 15"></polyline></svg>
);

export const ArrowRightIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);

export const CloseIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

export const MenuIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);

export const TruckIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
);

export const SupportIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><path d="M12 1a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4v3l4-3h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z"></path></svg>
);

export const ReturnIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><polyline points="15 18 9 12 15 6"></polyline></svg>
);

export const StarIcon: React.FC<IconProps> = ({ filled, ...props }) => (
    <svg {...defaultProps} fill={filled ? 'currentColor' : 'none'} {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);

export const FacebookIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
export const TwitterIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
);
export const InstagramIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
export const YoutubeIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);
export const PinterestIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><path d="M12 2C6.5 2 2 6.5 2 12c0 4.1 2.5 7.6 6 9.1-.1-1-.2-2.3 0-3.3.2-.8 1.4-6 1.4-6s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .8-.5 2.1-1 3.2-.4.9.4 1.6 1.3 1.6 1.6 0 2.8-1.7 2.8-4.1 0-2.2-1.6-3.8-3.9-3.8-2.7 0-4.4 2-4.4 4.2 0 .8.3 1.6-.2 2.2-.1.3-.3.4-.6.3-.9-.4-1.4-1.7-1.4-2.8 0-2.3 1.7-5 5.2-5 2.8 0 4.9 2 4.9 4.7 0 2.8-1.8 5-4.4 5-.8 0-1.5-.4-1.8-1l-.4 1.5c-.2.7-.6 1.6-.9 2.2-1.3 2-3.3 2.7-3.3 2.7s-1.3-5.2 0-6.7z"></path></svg>
);

export const TrashIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);

export const GridListIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line></svg>
);

export const Grid2Icon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
);
export const Grid3Icon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="3" x2="12" y2="21"></line></svg>
);

export const Grid4Icon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="16" y2="21"></line></svg>
);

export const EyeIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
export const EyeOffIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
);

export const EmptyCartIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
);

export const PlusIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
export const MinusIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

export const ExpandIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
);
export const GiftIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
);

export const CheckCircleIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} strokeWidth="1" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);
export const ShopIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><path d="M2 7.64A1 1 0 012.7.4L12 5l9.3-4.6A1 1 0 0122 7.64V19a1 1 0 01-1 1h-5a1 1 0 01-1-1v-2.18a1 1 0 00-.5-.86L12 14.5l-2.5 1.46a1 1 0 00-.5.86V19a1 1 0 01-1 1H3a1 1 0 01-1-1V7.64z"></path></svg>
);
export const FilterIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
);
export const ClipboardIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
);
export const MapPinIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);
export const LogOutIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
);
export const SettingsIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
);
export const DashboardIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
);
export const ProductsIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
);
export const UsersIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);
export const DollarSignIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
);

export const EditIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
);

export const MoreVerticalIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
);
export const UploadIcon: React.FC<IconProps> = (props) => (
    <svg {...defaultProps} {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
);
