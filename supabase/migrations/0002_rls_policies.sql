-- 0002_rls_policies.sql
-- Row Level Security policies for Gypsum Katalog Pro
-- Semua tabel menggunakan RLS

-- Enable RLS on all tables
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.borongan_services enable row level security;
alter table public.calculator_presets enable row level security;
alter table public.gallery_projects enable row level security;
alter table public.business_settings enable row level security;
alter table public.profiles enable row level security;

-- Drop existing policies if any (idempotent)
drop policy if exists "public_read_categories" on public.categories;
drop policy if exists "public_read_products" on public.products;
drop policy if exists "public_read_borongan" on public.borongan_services;
drop policy if exists "public_read_presets" on public.calculator_presets;
drop policy if exists "public_read_gallery" on public.gallery_projects;
drop policy if exists "public_read_settings" on public.business_settings;
drop policy if exists "admin_read_profiles" on public.profiles;
drop policy if exists "admin_own_profile" on public.profiles;

-- Public read policies (hanya data yang aktif)
create policy "public_read_categories" on public.categories for select using (is_active = true);
create policy "public_read_products" on public.products for select using (is_active = true);
create policy "public_read_borongan" on public.borongan_services for select using (is_active = true);
create policy "public_read_presets" on public.calculator_presets for select using (true);
create policy "public_read_gallery" on public.gallery_projects for select using (is_active = true);
create policy "public_read_settings" on public.business_settings for select using (true);

-- Admin full access (via service_role atau auth.uid check)
create policy "admin_full_categories" on public.categories for all using (auth.uid() is not null);
create policy "admin_full_products" on public.products for all using (auth.uid() is not null);
create policy "admin_full_borongan" on public.borongan_services for all using (auth.uid() is not null);
create policy "admin_full_presets" on public.calculator_presets for all using (auth.uid() is not null);
create policy "admin_full_gallery" on public.gallery_projects for all using (auth.uid() is not null);
create policy "admin_full_settings" on public.business_settings for all using (auth.uid() is not null);
create policy "admin_read_profiles" on public.profiles for select using (auth.uid() is not null);
create policy "admin_own_profile" on public.profiles for update using (auth.uid() = id);

-- Indexes for performance
create index if not exists idx_categories_slug on public.categories(slug);
create index if not exists idx_products_slug on public.products(slug);
create index if not exists idx_borongan_slug on public.borongan_services(slug);
create index if not exists idx_gallery_slug on public.gallery_projects(slug);
