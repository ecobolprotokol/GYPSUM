-- 0004_seed_admin.sql
-- Seed admin bergabung dengan scripts/seed.ts
-- Migration ini hanya untuk struktur RLS tambahan untuk profiles

-- Trigger untuk update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

create trigger handle_business_settings_updated_at
  before update on public.business_settings
  for each row
  execute function public.handle_updated_at();

create trigger handle_products_updated_at
  before update on public.products
  for each row
  execute function public.handle_updated_at();
