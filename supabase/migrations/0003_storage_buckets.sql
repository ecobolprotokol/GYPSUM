-- 0003_storage_buckets.sql
-- Storage buckets untuk gambar aplikasi

insert into storage.buckets (id, name, public, file_size_limit)
values
  ('product-images', 'product-images', true, 5242880),
  ('gallery-images', 'gallery-images', true, 5242880),
  ('business-assets', 'business-assets', true, 2097152)
on conflict (id) do nothing;

-- Storage policies: public can read, admin can upload
create policy "public_read_product_images" on storage.objects for select using (bucket_id = 'product-images');
create policy "public_read_gallery_images" on storage.objects for select using (bucket_id = 'gallery-images');
create policy "public_read_business_assets" on storage.objects for select using (bucket_id = 'business-assets');

create policy "admin_upload_product_images" on storage.objects for insert with check (bucket_id = 'product-images' and auth.uid() is not null);
create policy "admin_upload_gallery_images" on storage.objects for insert with check (bucket_id = 'gallery-images' and auth.uid() is not null);
create policy "admin_upload_business_assets" on storage.objects for insert with check (bucket_id = 'business-assets' and auth.uid() is not null);

create policy "admin_delete_product_images" on storage.objects for delete using (bucket_id = 'product-images' and auth.uid() is not null);
create policy "admin_delete_gallery_images" on storage.objects for delete using (bucket_id = 'gallery-images' and auth.uid() is not null);
create policy "admin_delete_business_assets" on storage.objects for delete using (bucket_id = 'business-assets' and auth.uid() is not null);
