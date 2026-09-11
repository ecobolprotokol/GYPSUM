export type BorringanService = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  cover_url: string | null;
  price_min: number;
  price_max: number;
  unit: string;
  includes: string | null;
  notes: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

export type CalculatorPreset = {
  id: string;
  service_id: string | null;
  label: string;
  multiplier: number;
  description: string | null;
  sort_order: number;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  cover_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
};

export type Product = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  short_description: string | null;
  full_description: string | null;
  specification_json: unknown;
  price_mode: 'exact' | 'start';
  price: number | null;
  price_start: number | null;
  unit: string;
  min_order: number | null;
  min_order_note: string | null;
  is_pickup_only: boolean;
  delivery_available: boolean;
  cover_url: string;
  gallery_urls: string[];
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type GalleryProject = {
  id: string;
  title: string;
  slug: string;
  cover_url: string;
  external_link: string | null;
  external_link_label: string;
  location: string | null;
  completed_at: string | null;
  description: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

export type BusinessSettings = {
  id: string;
  business_name: string;
  tagline: string | null;
  description: string | null;
  highlights_json: unknown;
  faq_json: unknown;
  about_json: unknown;
  address: string | null;
  google_maps_embed_url: string | null;
  google_maps_link: string | null;
  whatsapp_number: string;
  instagram_url: string | null;
  facebook_url: string | null;
  tiktok_url: string | null;
  email: string | null;
  operating_hours: string | null;
  logo_url: string | null;
  cover_image_url: string | null;
  updated_at: string;
};

export type SpecificationItem = {
  label: string;
  value: string;
};

export type Highlight = {
  title: string;
  description: string;
  icon?: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type AboutContent = {
  vision: string;
  mission: string;
};

export type ActionResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    field?: string;
  };
};
