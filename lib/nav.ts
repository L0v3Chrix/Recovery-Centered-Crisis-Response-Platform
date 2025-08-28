export type NavItem = { 
  href: string; 
  label: string;
  showInHeader?: boolean; // Optional flag to control header visibility
};

export const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/food', label: 'Food' },
  { href: '/shelter', label: 'Shelter' },
  { href: '/recovery', label: 'Recovery' },
  { href: '/healthcare', label: 'Healthcare' },
  { href: '/legal', label: 'Legal' },
  { href: '/crisis', label: 'Crisis' },
  { href: '/quiz', label: 'Get Matched' },
  { href: '/printable', label: 'Printable' },
  { href: '/partners', label: 'Partners' },
  { href: '/support', label: 'Support' },
];

// For header navigation (excludes home)
export const HEADER_NAV_ITEMS = NAV_ITEMS.filter(item => 
  item.href !== '/' && item.showInHeader !== false
);