import React from 'react';

interface IconProps {
  className?: string;
}

export const PhoneIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

export const MailIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export const HeartIcon: React.FC<IconProps & { filled?: boolean }> = ({ className, filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

export const CartIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export const EnvelopeIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);

export const TruckIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
);

export const SupportIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
    </svg>
);

export const ReturnIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
);

export const EyeIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

export const EyeOffIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07l-2.07-2.07" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

export const StarIcon: React.FC<IconProps & { filled?: boolean }> = ({ className, filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
);


const GridIcon: React.FC<IconProps & { children: React.ReactNode }> = ({ className, children }) => (
    <svg className={className} viewBox="0 0 20 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
        {children}
    </svg>
);

export const GridListIcon: React.FC<IconProps> = ({ className }) => (
    <GridIcon className={className}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-1370.000000, -204.000000)" fill="currentColor">
                <g transform="translate(1370.000000, 204.000000)">
                    <rect x="0" y="0" width="20" height="2"></rect>
                    <rect x="0" y="8" width="20" height="2"></rect>
                    <rect x="0" y="16" width="20" height="2"></rect>
                </g>
            </g>
        </g>
    </GridIcon>
);

export const Grid2Icon: React.FC<IconProps> = ({ className }) => (
    <GridIcon className={className}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-1410.000000, -204.000000)" fill="currentColor">
                <g transform="translate(1410.000000, 204.000000)">
                    <rect x="0" y="0" width="8" height="8"></rect>
                    <rect x="12" y="0" width="8" height="8"></rect>
                    <rect x="0" y="10" width="8" height="8"></rect>
                    <rect x="12" y="10" width="8" height="8"></rect>
                </g>
            </g>
        </g>
    </GridIcon>
);

export const Grid3Icon: React.FC<IconProps> = ({ className }) => (
    <GridIcon className={className}>
         <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-1450.000000, -204.000000)" fill="currentColor">
                <g transform="translate(1450.000000, 204.000000)">
                    <rect x="0" y="0" width="5" height="5"></rect>
                    <rect x="7" y="0" width="5" height="5"></rect>
                    <rect x="14" y="0" width="5" height="5"></rect>
                    <rect x="0" y="7" width="5" height="5"></rect>
                    <rect x="7" y="7" width="5" height="5"></rect>
                    <rect x="14" y="7" width="5" height="5"></rect>
                    <rect x="0" y="14" width="5" height="5"></rect>
                    <rect x="7" y="14" width="5" height="5"></rect>
                    <rect x="14" y="14" width="5" height="5"></rect>
                </g>
            </g>
        </g>
    </GridIcon>
);

export const Grid4Icon: React.FC<IconProps> = ({ className }) => (
    <GridIcon className={className}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-1490.000000, -204.000000)" fill="currentColor">
                <g transform="translate(1490.000000, 204.000000)">
                    <rect x="0" y="0" width="4" height="4"></rect>
                    <rect x="6" y="0" width="4" height="4"></rect>
                    <rect x="12" y="0" width="4" height="4"></rect>
                    <rect x="18" y="0" width="4" height="4"></rect>
                    <rect x="0" y="6" width="4" height="4"></rect>
                    <rect x="6" y="6" width="4" height="4"></rect>
                    <rect x="12" y="6" width="4" height="4"></rect>
                    <rect x="18" y="6" width="4" height="4"></rect>
                    <rect x="0" y="12" width="4" height="4"></rect>
                    <rect x="6" y="12" width="4" height="4"></rect>
                    <rect x="12" y="12" width="4" height="4"></rect>
                    <rect x="18" y="12" width="4" height="4"></rect>
                </g>
            </g>
        </g>
    </GridIcon>
);


export const ChevronUpIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
);


// Social Icons
export const FacebookIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export const TwitterIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const YoutubeIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 11.75a29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export const PinterestIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.23 4.14a8.5 8.5 0 0 0-11.31 0c-1.33 1.33-2.06 3.09-2.06 4.95 0 1.86.73 3.62 2.06 4.95L12 21.23l2.12-2.12"></path>
    <path d="M12 10.5c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z"></path>
  </svg>
);

export const GiftIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);

// Payment Icons
const PaymentIcon: React.FC<IconProps & { children: React.ReactNode }> = ({ className, children }) => (
    <svg className={className} role="img" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" height="24" width="38">
        {children}
    </svg>
);

export const VisaIcon: React.FC<IconProps> = ({ className }) => (
    <PaymentIcon className={className}>
        <path fill="#1A1F71" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/>
        <path fill="#fff" d="M12.4 16.1L9.1 8h2.3l1.8 5.7.8 2.3 1.9-5.7h2.2L15 16.1h-2.3l-.7-2.4-.2-1-.7 2.4-1.7.9zm10.2-.2h-2L20.3 8h2.3l1 6.3.3 2.1zm-8.8-5.9l.6-2.9-2.9-.6.2 1.1h1.5l-.2 1.1-1.6.3.6 2.9 2.9.6-.2-1.1H12l.2-1.2zm6.2-1.1l-1.3-4.1-2.9-.6.6 2.9 1.1.2-1.2 4.1 2.9.6-.8-2.9-1-.2z"/>
    </PaymentIcon>
);

export const MastercardIcon: React.FC<IconProps> = ({ className }) => (
    <PaymentIcon className={className}>
        <path fill="#1A1F71" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/>
        <circle cx="15" cy="12" r="7" fill="#EB001B"/>
        <circle cx="23" cy="12" r="7" fill="#F79E1B"/>
        <path d="M22 12c0-3.9-3.1-7-7-7-1.1 0-2.2.3-3.1.7 2.3 1.1 4 3.4 4 6.3s-1.7 5.2-4 6.3c.9.5 2 .7 3.1.7 3.9 0 7-3.1 7-7z" fill="#FF5F00"/>
    </PaymentIcon>
);

export const PaypalIcon: React.FC<IconProps> = ({ className }) => (
    <PaymentIcon className={className}>
        <path fill="#1A1F71" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/>
        <path fill="#fff" d="M21.1 8.4c-.1-.2-.3-.3-.5-.3h-4.3c-1.3 0-2.2.8-2.5 2.1-.2.8.2 1.6.8 2.1.6.5 1.4.7 2.2.7h.3c.2 0 .4 0 .5-.1.4-.1.7-.3.8-.7l.2-1.1c.1-.4 0-.8-.1-1.1z"/>
        <path fill="#fff" d="M22.2 9.7c-.1-.4-.4-.7-.8-.8-.2 0-.4-.1-.6-.1h-2.5c-.8 0-1.5.3-1.9 1-.5.7-.7 1.4-.6 2.2.1.8.5 1.5 1.2 1.9.7.4 1.5.6 2.4.6h.4c.3 0 .7 0 1-.1.7-.1 1.3-.5 1.6-1.1.3-.6.4-1.3.2-1.9l-.5-2.2z"/>
        <path fill="#fff" d="M25.2 7.6h-3.3c-.3 0-.5.2-.6.4L18 16.4c-.1.3 0 .6.3.7h2.2c.2 0 .4-.1.4-.3l.7-3.3c.1-.3.3-.4.6-.4h.5c.3 0 .5.2.4.5l-1.4 6.5c-.1.3.1.6.4.6H24c.2 0 .4-.2.5-.4l3.1-12c.1-.3 0-.5-.3-.6z"/>
    </PaymentIcon>
);

export const AmexIcon: React.FC<IconProps> = ({ className }) => (
    <PaymentIcon className={className}>
        <path fill="#1A1F71" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/>
        <path fill="#fff" d="M12.9 8.6H9.7c-.2 0-.3.1-.3.3l-1.3 6.8c0 .1.1.3.3.3h3.2c.2 0 .3-.1.3-.3l1.3-6.8c0-.1-.1-.3-.3-.3zm-2.2 5.5h-1l.1-.6h1.2l-.3 1.9zm1.7-2.2H11l.2-1h1.4l-.2 1zm.6-1.7h-1l.2-1h.6l.2 1zM20.2 16h-3.4c-.2 0-.3-.1-.3-.3l1.1-5.7c0-.1.2-.2.3-.2h3.4c.2 0 .3.1.3.3l-1.1 5.7c0 .1-.2.2-.3.2zm.2-4.4h-1.6l-.3 1.7h1.6l.3-1.7zM28.3 8.6h-4.6c-.2 0-.3.1-.3.3v.1l1.8 7.2c.1.2.2.3.4.3h1.3c.2 0 .3-.1.3-.3l1.4-5.6h.1l1.3 5.6c.1.2.2.3.4.3h1.3c.2 0 .3-.1.3-.3l1.8-7.2v-.1c0-.2-.1-.3-.3-.3h-4.6z"/>
    </PaymentIcon>
);

export const EmptyCartIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        <line x1="12" y1="10" x2="16" y2="14"></line>
        <line x1="16" y1="10" x2="12" y2="14"></line>
    </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

export const MinusIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

export const ClipboardIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export const TagIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
    <line x1="7" y1="7" x2="7.01" y2="7"></line>
  </svg>
);

export const ExpandIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
  </svg>
);