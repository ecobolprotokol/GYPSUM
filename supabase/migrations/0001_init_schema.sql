-- 0001_init_schema.sql
-- Skema database untuk Gypsum Katalog Pro
-- Single Source of Truth: MASTER SPESIFIKASI KONTRAK FINAL BASELINE.md §5

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Profiles: extends Supabase Auth
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  pin_hash text not null,
  display_name text not null default 'Administrator',
  force_change_pin boolean not null default false,
  failed_login_attempts integer not null default 0,
  locked_until timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Business settings (singleton)
create table public.business_settings (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  tagline text,
  description text,
  highlights_json jsonb default '[]',
  faq_json jsonb default '[]',
  about_json jsonb default '{}',
  address text,
  google_maps_embed_url text,
  google_maps_link text,
  whatsapp_number text not null,
  instagram_url text,
  facebook_url text,
  tiktok_url text,
  email text,
  operating_hours text,
  logo_url text,
  cover_image_url text,
  updated_at timestamptz default now(),
  constraint singleton check ((select count(*) from business_settings) <= 1)
);

-- Categories
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  slug text unique not null,
  description text,
  cover_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

-- Products
create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id) on delete cascade,
  name text not null,
  slug text unique not null,
  short_description text,
  full_description text,
  specification_json jsonb default '[]',
  price_mode text not null check (price_mode in ('exact','start')),
  price numeric(12,2),
  price_start numeric(12,2),
  unit text not null,
  min_order integer,
  min_order_note text,
  is_pickup_only boolean not null default false,
  delivery_available boolean not null default true,
  cover_url text not null,
  gallery_urls text[] default '{}',
  is_featured boolean not null default false,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_products_category on products(category_id);
create index idx_products_active on products(is_active);
create index idx_products_featured on products(is_featured);

-- Borongan services
create table public.borongan_services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  cover_url text,
  price_min numeric(12,2) not null,
  price_max numeric(12,2) not null,
  unit text not null default 'm²',
  includes text,
  notes text,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- Calculator presets
create table public.calculator_presets (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references borongan_services(id) on delete cascade,
  label text not null,
  multiplier numeric(6,2) not null default 1.0,
  description text,
  sort_order int not null default 0
);

-- Gallery projects
create table public.gallery_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  cover_url text not null,
  external_link text,
  external_link_label text default 'Lihat dokumentasi lengkap',
  location text,
  completed_at date,
  description text,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz default now()
);
