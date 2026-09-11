export const WHATSAPP_NUMBER_REGEX = /^62[0-9]{8,13}$/;

export const WEAK_PINS = ['111111', '123456', '654321', '000000'];

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const MAX_FILE_SIZE_BUSINESS = 2 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
];
export const ALLOWED_IMAGE_TYPES_BROWSER = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/*',
];

export const STORAGE_BUCKETS = {
  PRODUCT_IMAGES: 'product-images',
  GALLERY_IMAGES: 'gallery-images',
  BUSINESS_ASSETS: 'business-assets',
} as const;

export const PRICE_MODES = ['exact', 'start'] as const;

export const REVALIDATE_TIME = 3600;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;
