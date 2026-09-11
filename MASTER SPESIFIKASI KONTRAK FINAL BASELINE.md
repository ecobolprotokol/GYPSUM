# 📜 MASTER SPESIFIKASI KONTRAK FINAL BASELINE
## Website Katalog Gypsum Profesional — Single Source of Truth (SSOT)

**Dokumen ini adalah kontrak final.** Tidak ada interpretasi, tidak ada asumsi tersirat, tidak ada placeholder. Setiap developer (manusia atau AI) wajib mengikuti spesifikasi ini secara harfiah. Jika ada konflik antar bagian, urutan prioritas: **1) Database Schema → 2) API Contract → 3) Page Contract → 4) Design System → 5) Implementasi.**

---

## 1. IDENTITAS PROYEK

| Atribut | Nilai |
|---|---|
| Nama Proyek | `gypsum-katalog-pro` |
| Tipe | Katalog profesional + landing bisnis + admin CMS |
| Model Bisnis | B2C lokal (usaha rumahan), **bukan e-commerce** |
| Target User | Pengunjung publik (tanpa login) + 1 Admin (owner usaha) |
| Channel Konversi Utama | WhatsApp (deep link `wa.me`) |
| Bahasa | Indonesia (id-ID), format mata uang `Rp` |
| Zona Waktu | `Asia/Jakarta` (WIB) |
| Repository | Monorepo tunggal, root = aplikasi Next.js |
| Hosting | Vercel (auto dari `main`) |
| Database | Supabase (PostgreSQL + Auth + Storage) |
| Domain | Custom domain (konfigurasi Vercel, out-of-scope kode) |

---

## 2. PRINSIP MUTLAK (NON-NEGOTIABLE)

1. **Tidak ada fitur e-commerce**: tidak ada cart, checkout, payment gateway, stok, inventory, akun pelanggan, wishlist, review, rating.
2. **Tidak ada hardcode konten bisnis**: nama usaha, alamat, WhatsApp, social media, Google Maps, harga, produk, galeri → **semua dari database** via Admin Dashboard.
3. **Tidak ada placeholder/padding text**: semua teks harus nyata atau diambil dari DB. Jika data kosong, tampilkan state kosong yang dirancang (bukan "Lorem ipsum").
4. **Tidak ada environment variable tambahan** selain 3 yang disyaratkan (lihat §13).
5. **Tidak ada library state management global** (Redux, Zustand, Jotai). Gunakan React Server Components + React Query hanya jika benar-benar diperlukan untuk mutasi admin.
6. **Semua CTA publik** → WhatsApp deep link dengan pesan terformat otomatis.
7. **Admin hanya 1 role** (`admin`). Tidak ada multi-role, tidak ada permission granular.
8. **Mobile-first**, breakpoint: `sm:640`, `md:768`, `lg:1024`, `xl:1280`.
9. **Zero config deployment**: `vercel` CLI atau auto-deploy dari GitHub, tanpa build script custom.
10. **Seed admin wajib jalan di `npm run db:seed`** dan menghasilkan 1 user admin yang bisa login instan.

---

## 3. TECH STACK (PINNED VERSIONS)

| Layer | Teknologi | Versi Minimum |
|---|---|---|
| Framework | Next.js (App Router) | `^15.0.0` |
| Runtime | Node.js | `20.x LTS` |
| Language | TypeScript | `^5.5` (strict mode) |
| Styling | Tailwind CSS | `^3.4` |
| UI Components | shadcn/ui | latest (Radix primitives) |
| Database | Supabase (Postgres 15) | — |
| ORM/Client | `@supabase/supabase-js` | `^2.45` |
| Forms (admin) | `react-hook-form` + `zod` | latest |
| Validation | `zod` | `^3.23` |
| Icons | `lucide-react` | latest |
| Image Optimization | Next.js `Image` + Supabase Storage | — |
| Testing Unit/Integration | Vitest + React Testing Library | latest |
| E2E Testing | Playwright | latest |
| Linting | ESLint (`next/core-web-vitals` + `@typescript-eslint/strict`) | — |
| Formatting | Prettier | — |
| CI/CD | GitHub Actions | — |
| Deployment | Vercel | — |
| Package Manager | `pnpm` | `^9` |

**Dilarang**: jQuery, Bootstrap, Material UI, Ant Design, Redux, MobX, GraphQL (gunakan REST via Supabase client), Firebase, MongoDB, Prisma (gunakan Supabase client langsung).

---

## 4. STRUKTUR FILE (WAJIB)

```
gypsum-katalog-pro/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── .env.example                 # hanya berisi KEY names, tanpa value
├── .env.local                   # gitignored, diisi developer lokal
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
├── package.json
├── pnpm-lock.yaml
├── README.md
├── docs/
│   └── SPECIFICATION.md         # symlink/isi = dokumen ini
├── public/
│   ├── favicon.ico
│   ├── og-default.png           # OG image fallback (desain final, bukan placeholder)
│   └── robots.txt
├── scripts/
│   ├── seed.ts                  # seed admin + data demo
│   ├── reset.ts                 # reset DB ke state bersih + seed
│   └── migrate.ts               # wrapper supabase db push
├── supabase/
│   ├── migrations/
│   │   ├── 0001_init_schema.sql
│   │   ├── 0002_rls_policies.sql
│   │   ├── 0003_storage_buckets.sql
│   │   └── 0004_seed_admin.sql
│   └── config.toml
├── src/
│   ├── app/
│   │   ├── layout.tsx           # root layout (font, metadata default)
│   │   ├── page.tsx             # homepage
│   │   ├── globals.css
│   │   ├── (public)/            # route group publik
│   │   │   ├── layout.tsx
│   │   │   ├── produk/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── borongan/
│   │   │   │   └── page.tsx
│   │   │   ├── galeri/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── tentang/
│   │   │   │   └── page.tsx
│   │   │   └── kontak/
│   │   │       └── page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx         # redirect ke /admin/dashboard
│   │   │   ├── login/page.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── produk/page.tsx
│   │   │   ├── produk/[id]/page.tsx
│   │   │   ├── kategori/page.tsx
│   │   │   ├── galeri/page.tsx
│   │   │   ├── borongan/page.tsx
│   │   │   └── pengaturan/page.tsx
│   │   └── api/
│   │       └── wa/[type]/route.ts  # helper generate WA link (opsional)
│   ├── components/
│   │   ├── ui/                  # shadcn generated
│   │   ├── layout/              # Header, Footer, MobileNav
│   │   ├── public/              # komponen halaman publik
│   │   ├── admin/               # komponen dashboard admin
│   │   └── shared/              # Button, WhatsAppCTA, PriceTag, dll
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts        # browser client
│   │   │   ├── server.ts        # server client (cookies)
│   │   │   ├── admin.ts         # service-role client (server only)
│   │   │   └── middleware.ts    # helper auth check
│   │   ├── whatsapp.ts          # format pesan WA
│   │   ├── calculator.ts        # logika kalkulator borongan
│   │   ├── currency.ts          # format Rupiah
│   │   ├── slug.ts              # slugify
│   │   ├── upload.ts            # helper upload Storage
│   │   ├── validators/          # zod schemas
│   │   └── constants.ts         # enum, bukan konten bisnis
│   ├── hooks/
│   ├── types/
│   │   └── database.ts          # auto-generated via supabase gen types
│   └── styles/
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

---

## 5. DATABASE SCHEMA (KONTRAK MUTLAK)

### 5.1 Tabel `profiles` (extends Supabase Auth)

```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  pin_hash text not null,           -- bcrypt hash dari 6-digit PIN
  display_name text not null default 'Administrator',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### 5.2 Tabel `business_settings` (singleton)

```sql
create table public.business_settings (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  tagline text,
  description text,
  address text,
  google_maps_embed_url text,       -- URL iframe embed
  google_maps_link text,            -- URL untuk "Buka di Maps"
  whatsapp_number text not null,    -- format: 628xxx tanpa + atau 0
  instagram_url text,
  facebook_url text,
  tiktok_url text,
  email text,
  operating_hours text,             -- contoh: "Senin–Sabtu, 08.00–17.00"
  logo_url text,
  cover_image_url text,
  updated_at timestamptz default now(),
  constraint singleton check ((select count(*) from business_settings) <= 1)
);
```

### 5.3 Tabel `categories`

```sql
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,        -- contoh: "Gypsum", "Gypsum Beton", "Gypsum Custom"
  slug text unique not null,
  description text,
  cover_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now()
);
```

### 5.4 Tabel `products`

```sql
create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id) on delete cascade,
  name text not null,
  slug text unique not null,
  short_description text,           -- max 160 char, untuk card
  full_description text,            -- rich text (HTML sederhana atau markdown)
  specification_json jsonb,         -- array of {label, value}
  price_mode text not null check (price_mode in ('exact','start')),
  price numeric(12,2),              -- wajib jika price_mode='exact'
  price_start numeric(12,2),        -- wajib jika price_mode='start'
  unit text not null,               -- "lembar", "m²", "unit", "pcs", dll
  min_order integer,                -- null = tidak ada minimum
  min_order_note text,              -- contoh: "Min. 10 lembar untuk pengiriman"
  is_pickup_only boolean not null default false, -- true = hanya ambil di toko
  delivery_available boolean not null default true,
  cover_url text not null,
  gallery_urls text[] default '{}', -- array URL gambar tambahan
  is_featured boolean not null default false,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index idx_products_category on products(category_id);
create index idx_products_active on products(is_active);
```

### 5.5 Tabel `borongan_services`

```sql
create table public.borongan_services (
  id uuid primary key default gen_random_uuid(),
  name text not null,               -- contoh: "Pasang Plafon Gypsum", "Partisi Dinding"
  slug text unique not null,
  description text,
  cover_url text,
  price_min numeric(12,2) not null, -- per m²
  price_max numeric(12,2) not null, -- per m²
  unit text not null default 'm²',
  includes text,                    -- deskripsi apa saja yang termasuk
  notes text,                       -- catatan negosiasi
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz default now()
);
```

### 5.6 Tabel `gallery_projects`

```sql
create table public.gallery_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  cover_url text not null,
  external_link text,               -- link IG / platform lain
  external_link_label text default 'Lihat dokumentasi lengkap',
  location text,
  completed_at date,
  description text,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz default now()
);
```

### 5.7 Tabel `calculator_presets` (konstanta kalkulator)

```sql
create table public.calculator_presets (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references borongan_services(id) on delete cascade,
  label text not null,              -- "Standar", "Premium", "Double Layer"
  multiplier numeric(6,2) not null default 1.0,
  description text,
  sort_order int not null default 0
);
```

### 5.8 Row Level Security (RLS)

```sql
-- Publik: baca saja untuk semua tabel kecuali profiles & business_settings
alter table categories enable row level security;
alter table products enable row level security;
alter table borongan_services enable row level security;
alter table gallery_projects enable row level security;
alter table calculator_presets enable row level security;
alter table business_settings enable row level security;
alter table profiles enable row level security;

-- Policy: publik baca data aktif
create policy "public_read_categories" on categories for select using (is_active = true);
create policy "public_read_products" on products for select using (is_active = true);
create policy "public_read_borongan" on borongan_services for select using (is_active = true);
create policy "public_read_gallery" on gallery_projects for select using (is_active = true);
create policy "public_read_presets" on calculator_presets for select using (true);
create policy "public_read_settings" on business_settings for select using (true);

-- Admin: full access (via service_role di server, atau auth.uid check)
create policy "admin_full_categories" on categories for all using (auth.uid() is not null);
create policy "admin_full_products" on products for all using (auth.uid() is not null);
create policy "admin_full_borongan" on borongan_services for all using (auth.uid() is not null);
create policy "admin_full_gallery" on gallery_projects for all using (auth.uid() is not null);
create policy "admin_full_presets" on calculator_presets for all using (auth.uid() is not null);
create policy "admin_full_settings" on business_settings for all using (auth.uid() is not null);
create policy "admin_read_profiles" on profiles for select using (auth.uid() is not null);
create policy "admin_own_profile" on profiles for update using (auth.uid() = id);
```

### 5.9 Storage Buckets

| Bucket | Public | Max Size | Mime Types |
|---|---|---|---|
| `product-images` | true | 5 MB | `image/jpeg`, `image/png`, `image/webp` |
| `gallery-images` | true | 5 MB | `image/jpeg`, `image/png`, `image/webp` |
| `business-assets` | true | 2 MB | `image/*` |

Folder structure di dalam bucket: `{YYYY}/{MM}/{uuid}.{ext}`.

---

## 6. ENVIRONMENT VARIABLES (KONTRAK FINAL)

**Hanya 3 variabel yang diizinkan.** Tidak ada yang lain.

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

| Variabel | Scope | Penggunaan |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Semua Supabase client |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Browser & edge client |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server only** | Admin server actions, seed, migration, bypass RLS |

**Larangan keras**:
- ❌ `NEXT_PUBLIC_ADMIN_PIN`
- ❌ `WHATSAPP_NUMBER` (harus dari DB)
- ❌ `DATABASE_URL` langsung (gunakan Supabase client)
- ❌ API key pihak ketiga apapun

**Validasi startup** (`src/lib/env.ts`):
```ts
import { z } from 'zod';
const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
});
export const env = envSchema.parse(process.env);
```
Jika validasi gagal → aplikasi **gagal build**.

---

## 7. AUTHENTICATION & ADMIN ACCESS

### 7.1 Mekanisme Login
- **Username**: teks bebas (min 3, max 32, alfanumerik + underscore).
- **PIN**: **6 digit numerik** (bukan password). Disimpan sebagai bcrypt hash (`$2b$10$...`).
- **Session**: Supabase Auth session (JWT, httpOnly cookie).
- **Durasi session**: 7 hari dengan `persistSession: true`.
- **Max failed attempt**: 5x → lock 15 menit (implementasi di server action, bukan Supabase Auth bawaan).

### 7.2 Seed Admin Default
```ts
// scripts/seed.ts
const DEFAULT_ADMIN = {
  username: 'admin',
  pin: '123456',        // wajib diubah setelah login pertama
  display_name: 'Administrator',
};
```
Script seed:
1. Membuat user di `auth.users` via `supabase.auth.admin.createUser`.
2. Membuat record di `profiles` dengan `pin_hash = bcrypt.hash('123456', 10)`.
3. Memaksa flag `force_change_pin = true` di metadata user.

### 7.3 Middleware (`src/middleware.ts`)
```ts
// Semua route /admin/* kecuali /admin/login → redirect ke /admin/login jika tidak ada session
// /admin/login → redirect ke /admin/dashboard jika sudah login
```

### 7.4 Ganti PIN
- Endpoint: `POST /admin/pengaturan/pin`
- Input: `currentPin`, `newPin` (6 digit), `confirmNewPin`
- Validasi: `newPin !== currentPin`, `newPin` tidak boleh pola lemah (`111111`, `123456`, `654321`, `000000`).
- Setelah ganti → invalidate semua session lain.

---

## 8. ROUTE & PAGE CONTRACT

### 8.1 Halaman Publik

#### `/` — Homepage
**Sections (urutan wajib)**:
1. **Hero**: cover image full-bleed, headline (dari `business_settings.tagline`), subheadline, 2 CTA: "Lihat Produk" (→ `/produk`) & "Konsultasi WhatsApp" (→ WA).
2. **Keunggulan**: 3–4 kartu (ikon + judul + deskripsi). Konten hardcoded di komponen tapi **bisa diedit via business_settings** (tambah kolom `highlights_json`).
3. **Kategori Produk**: grid 3 kolom (Gypsum, Gypsum Beton, Gypsum Custom). Tiap kartu = cover + nama + jumlah produk + link ke `/produk?kategori={slug}`.
4. **Produk Unggulan**: horizontal scroll / grid 4 produk `is_featured = true`.
5. **Highlight Galeri**: 6 proyek terbaru.
6. **Layanan Borongan**: preview 3 layanan + CTA ke `/borongan`.
7. **CTA Final**: banner "Siap memulai proyek?" + tombol WA.
8. **Footer**: alamat, WA, social, maps link, copyright.

#### `/produk` — Katalog Produk
- Filter sidebar (desktop) / top filter (mobile): kategori, rentang harga.
- Grid 3 kolom desktop, 2 tablet, 1 mobile.
- Card: cover image (aspect 4:3), nama, harga (format "Rp X" atau "Mulai Rp X"), satuan, badge "Min. order: Y" jika ada.
- Sort: default `sort_order`, opsi "Harga terendah", "Harga tertinggi", "Terbaru".
- Empty state: ilustrasi + "Belum ada produk di kategori ini".

#### `/produk/[slug]` — Detail Produk
- Breadcrumb: Beranda > Produk > {Kategori} > {Nama}
- Gallery: 1 cover besar + thumbnails (jika `gallery_urls` ada).
- Info: nama, harga, satuan, min order, badge "Ambil di toko" / "Bisa diantar".
- Spesifikasi: tabel dari `specification_json`.
- Deskripsi lengkap (render markdown/HTML aman via DOMPurify).
- **CTA Sticky Bottom (mobile)**: tombol "Pesan via WhatsApp" → WA dengan pesan:
  ```
  Halo, saya tertarik dengan produk:
  
  *{nama_produk}*
  Harga: {harga}
  Satuan: {satuan}
  
  Mohon informasi lebih lanjut.
  ```
- **CTA Desktop**: tombol di sidebar kanan.

#### `/borongan` — Jasa Pasang & Borongan
- Hero: "Layanan Borongan & Jasa Pasang"
- List layanan: kartu dengan cover, nama, deskripsi, rentang harga "Rp X – Rp Y / m²".
- **Kalkulator Estimasi** (komponen interaktif client-side):
  - Input: pilih layanan (dropdown), pilih preset (dropdown), luas area (number, m²).
  - Output: estimasi rentang `luas × price_min × multiplier` s/d `luas × price_max × multiplier`.
  - Disclaimer: "*Estimasi awal. Harga final setelah survey.*"
  - CTA: "Konsultasi & Survey Gratis" → WA dengan pesan:
    ```
    Halo, saya ingin konsultasi layanan borongan:
    
    Layanan: {nama_layanan}
    Tipe: {preset}
    Estimasi luas: {luas} m²
    Estimasi biaya: Rp {min} – Rp {max}
    
    Mohon dijadwalkan untuk survey.
    ```
- FAQ (5 item, hardcoded di komponen, boleh ditambah via kolom `faq_json` di `business_settings`).

#### `/galeri` — Portfolio
- Grid masonry 3 kolom desktop, 2 tablet, 1 mobile.
- Card: cover image, judul, lokasi, tahun.
- Klik → `/galeri/[slug]`.

#### `/galeri/[slug]` — Detail Proyek
- Cover besar.
- Judul, lokasi, tahun.
- Deskripsi.
- Tombol "Lihat dokumentasi lengkap" → `external_link` (buka tab baru).
- Tombol "Tertarik dengan proyek serupa?" → WA.

#### `/tentang` — Tentang Usaha
- Cerita usaha (dari `business_settings.description`).
- Visi/misi (hardcoded di komponen, bisa diperkaya via `about_json`).
- Foto usaha (dari `business_settings.cover_image_url`).

#### `/kontak` — Kontak
- Info: alamat, WA, email, jam operasional.
- Google Maps embed (dari `google_maps_embed_url`).
- Tombol "Buka di Google Maps" (dari `google_maps_link`).
- Social media icons.
- CTA WA besar.

### 8.2 Halaman Admin

#### `/admin/login`
- Form: username + PIN (6 digit, input type password, numeric keyboard mobile).
- Tombol "Masuk".
- Error message: "Username atau PIN salah" (generic, jangan bocorkan mana yang salah).
- Setelah login pertama (flag `force_change_pin`): redirect ke `/admin/pengaturan/pin?first=true`.

#### `/admin/dashboard`
- Stats cards: total produk, total kategori, total galeri, total layanan borongan.
- Shortcut actions: "Tambah Produk", "Tambah Galeri", "Edit Pengaturan".

#### `/admin/produk`
- Tabel: cover thumb, nama, kategori, harga, status (aktif/nonaktif), aksi (edit/hapus).
- Tombol "Tambah Produk" → `/admin/produk/new`.
- Filter: kategori, status.
- Search: by name.

#### `/admin/produk/[id]` & `/admin/produk/new`
- Form fields:
  - Kategori (dropdown, wajib)
  - Nama (wajib)
  - Slug (auto-generate dari nama, editable)
  - Deskripsi singkat (max 160)
  - Deskripsi lengkap (textarea / markdown editor sederhana)
  - Spesifikasi (dynamic field: label + value, add/remove row)
  - Mode harga: radio "Harga pasti" / "Harga mulai"
  - Harga / Harga mulai (number, wajib sesuai mode)
  - Satuan (wajib)
  - Min order (number, optional)
  - Catatan min order
  - Checkbox: "Hanya ambil di toko"
  - Checkbox: "Bisa diantar"
  - Cover image (upload, wajib)
  - Gallery images (multi-upload, optional)
  - Checkbox: "Tampilkan di unggulan"
  - Checkbox: "Aktif"
- Validasi zod (lihat §11).
- Submit → upsert + redirect ke list dengan toast sukses.

#### `/admin/kategori`
- CRUD kategori: nama, slug, deskripsi, cover, sort order, aktif.

#### `/admin/galeri`
- CRUD proyek galeri: judul, slug, cover, external link, label link, lokasi, tanggal selesai, deskripsi, aktif.

#### `/admin/borongan`
- CRUD layanan borongan + presets kalkulator (nested form).

#### `/admin/pengaturan`
- Tab: **Profil Usaha**, **Kontak**, **Sosial Media**, **Ganti PIN**.
- Form sesuai kolom `business_settings`.
- Upload logo & cover.
- Ganti PIN: form 3 field (PIN lama, PIN baru, konfirmasi).

---

## 9. WHATSAPP INTEGRATION CONTRACT

### 9.1 Format Nomor
- Disimpan di DB sebagai string numerik **tanpa** `+`, tanpa `0` di depan, tanpa spasi.
- Contoh: `6281234567890`.
- Validasi zod: `/^62[0-9]{8,13}$/`.

### 9.2 Helper `lib/whatsapp.ts`
```ts
export function buildWhatsAppURL(opts: {
  number: string;
  message: string;
}): string {
  const encoded = encodeURIComponent(opts.message.trim());
  return `https://wa.me/${opts.number}?text=${encoded}`;
}
```

### 9.3 Template Pesan (WAJIB diikuti)

**Template 1 — Produk**:
```
Halo, saya tertarik dengan produk:

*{nama}*
Harga: {harga}
Satuan: {satuan}

Mohon informasi lebih lanjut.
```

**Template 2 — Borongan (dari kalkulator)**:
```
Halo, saya ingin konsultasi layanan borongan:

Layanan: {nama_layanan}
Tipe: {preset_label}
Estimasi luas: {luas} m²
Estimasi biaya: Rp {min} – Rp {max}

Mohon dijadwalkan untuk survey.
```

**Template 3 — Kontak umum**:
```
Halo, saya ingin bertanya tentang layanan Anda.
```

**Template 4 — Galeri**:
```
Halo, saya melihat portfolio "{judul_proyek}" dan tertarik dengan hasil serupa.
```

### 9.4 Komponen `<WhatsAppCTA>`
Props: `template: 'product' | 'borongan' | 'contact' | 'gallery'`, `context: object`.
Komponen mengambil `whatsapp_number` dari cache `business_settings` (revalidate 1 jam).

---

## 10. KALKULATOR BORONGAN CONTRACT

### 10.1 Alur
1. User pilih layanan → load `price_min`, `price_max` dari DB.
2. User pilih preset → load `multiplier`.
3. User input `luas` (number, min 1, max 10.000).
4. Hitung:
   - `estimateMin = luas × price_min × multiplier`
   - `estimateMax = luas × price_max × multiplier`
5. Format Rupiah.
6. Render hasil + tombol WA.

### 10.2 Implementasi
- Komponen client (`'use client'`).
- State lokal (tidak perlu global).
- Debounce input 300ms.
- Jika `luas` kosong atau invalid → tampilkan placeholder "Masukkan luas area".

### 10.3 Validasi
```ts
const calculatorSchema = z.object({
  service_id: z.string().uuid(),
  preset_id: z.string().uuid(),
  area: z.number().min(1).max(10000),
});
```

---

## 11. VALIDATION SCHEMAS (ZOD)

Semua schema di `src/lib/validators/`.

### 11.1 Product Schema
```ts
export const productSchema = z.object({
  category_id: z.string().uuid(),
  name: z.string().min(3).max(120),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  short_description: z.string().max(160).optional(),
  full_description: z.string().max(5000).optional(),
  specification_json: z.array(z.object({
    label: z.string().min(1).max(60),
    value: z.string().min(1).max(200),
  })).max(20),
  price_mode: z.enum(['exact', 'start']),
  price: z.number().positive().optional(),
  price_start: z.number().positive().optional(),
  unit: z.string().min(1).max(20),
  min_order: z.number().int().positive().optional(),
  min_order_note: z.string().max(200).optional(),
  is_pickup_only: z.boolean(),
  delivery_available: z.boolean(),
  cover_url: z.string().url(),
  gallery_urls: z.array(z.string().url()).max(10),
  is_featured: z.boolean(),
  is_active: z.boolean(),
}).superRefine((data, ctx) => {
  if (data.price_mode === 'exact' && !data.price) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Harga wajib diisi', path: ['price'] });
  }
  if (data.price_mode === 'start' && !data.price_start) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Harga mulai wajib diisi', path: ['price_start'] });
  }
});
```

### 11.2 Admin Login Schema
```ts
export const loginSchema = z.object({
  username: z.string().min(3).max(32).regex(/^[a-zA-Z0-9_]+$/),
  pin: z.string().regex(/^\d{6}$/),
});
```

### 11.3 Change PIN Schema
```ts
export const changePinSchema = z.object({
  currentPin: z.string().regex(/^\d{6}$/),
  newPin: z.string().regex(/^\d{6}$/),
  confirmNewPin: z.string().regex(/^\d{6}$/),
}).superRefine((d, ctx) => {
  if (d.newPin !== d.confirmNewPin) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'PIN tidak cocok', path: ['confirmNewPin'] });
  }
  if (d.newPin === d.currentPin) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'PIN baru harus berbeda', path: ['newPin'] });
  }
  if (/^(\d)\1{5}$/.test(d.newPin) || d.newPin === '123456' || d.newPin === '654321') {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'PIN terlalu lemah', path: ['newPin'] });
  }
});
```

### 11.4 Business Settings Schema
```ts
export const businessSettingsSchema = z.object({
  business_name: z.string().min(2).max(100),
  tagline: z.string().max(140).optional(),
  description: z.string().max(2000).optional(),
  address: z.string().max(300).optional(),
  google_maps_embed_url: z.string().url().optional().or(z.literal('')),
  google_maps_link: z.string().url().optional().or(z.literal('')),
  whatsapp_number: z.string().regex(/^62[0-9]{8,13}$/),
  instagram_url: z.string().url().optional().or(z.literal('')),
  facebook_url: z.string().url().optional().or(z.literal('')),
  tiktok_url: z.string().url().optional().or(z.literal('')),
  email: z.string().email().optional().or(z.literal('')),
  operating_hours: z.string().max(100).optional(),
  logo_url: z.string().url().optional().or(z.literal('')),
  cover_image_url: z.string().url().optional().or(z.literal('')),
});
```

---

## 12. SERVER ACTIONS CONTRACT

Semua server actions di `src/app/actions/`. Prefix nama: `admin{Entity}{Action}`.

| Action | Input | Output | Auth |
|---|---|---|---|
| `adminLogin` | `{username, pin}` | `{success, redirect?}` | Public |
| `adminLogout` | — | `{success}` | Admin |
| `adminChangePin` | `changePinSchema` | `{success}` | Admin |
| `adminUpsertProduct` | `productSchema` + `id?` | `{id}` | Admin |
| `adminDeleteProduct` | `{id}` | `{success}` | Admin |
| `adminUpsertCategory` | category schema | `{id}` | Admin |
| `adminDeleteCategory` | `{id}` | `{success}` | Admin |
| `adminUpsertGallery` | gallery schema | `{id}` | Admin |
| `adminDeleteGallery` | `{id}` | `{success}` | Admin |
| `adminUpsertBorongan` | borongan schema + presets | `{id}` | Admin |
| `adminDeleteBorongan` | `{id}` | `{success}` | Admin |
| `adminUpdateSettings` | `businessSettingsSchema` | `{success}` | Admin |
| `adminUploadImage` | `FormData` (file + bucket) | `{url}` | Admin |

**Setiap server action**:
1. Validasi input dengan zod.
2. Cek auth (kecuali `adminLogin`).
3. Eksekusi DB via Supabase client (admin client untuk bypass RLS jika perlu).
4. Revalidate path terkait (`revalidatePath('/produk', 'layout')`).
5. Return result atau throw `ActionError`.
6. Log error ke console server (jangan bocorkan detail ke client).

---

## 13. DESIGN SYSTEM CONTRACT

### 13.1 Prinsip Visual
- **Nuansa**: premium, arsitektural, modern minimalis — referensi: website Arup, Foster+Partners, properti高端 (Soho House, Aman Resorts).
- **Dominan**: putih bersih + aksen hitam/arang + aksen warna tanah (terracotta/warm gray) opsional.
- **Foto adalah raja**: gambar besar, crop rapi, aspect ratio konsisten.
- **Typography**: hierarki kuat, size scale jelas.
- **Whitespace**: generous, tidak padat.
- **Motion**: subtle, 150–250ms, `ease-out`.

### 13.2 Typography
```ts
// tailwind.config.ts
fontFamily: {
  sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],   // body
  display: ['var(--font-playfair)', 'serif'],               // headline (kontras elegan)
  mono: ['var(--font-jetbrains)', 'monospace'],             // admin only
}
```

Scale (desktop):
- Display XL: `clamp(2.5rem, 5vw, 4.5rem)` / line-height 1.05 / tracking -0.02em
- H1: `3rem` / 1.1
- H2: `2.25rem` / 1.15
- H3: `1.5rem` / 1.25
- Body: `1rem` / 1.6
- Small: `0.875rem` / 1.5
- Caption: `0.75rem` / 1.4

### 13.3 Color Tokens (CSS variables)
```css
:root {
  --background: 0 0% 100%;
  --foreground: 220 14% 10%;
  --muted: 220 14% 96%;
  --muted-foreground: 220 9% 46%;
  --border: 220 13% 91%;
  --accent: 18 50% 45%;       /* terracotta */
  --accent-foreground: 0 0% 100%;
  --primary: 220 14% 10%;     /* charcoal */
  --primary-foreground: 0 0% 100%;
  --ring: 18 50% 45%;
  --radius: 0.5rem;
}
```

### 13.4 Spacing Scale
Gunakan kelipatan 4: `1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24`.
Section padding: `py-16 md:py-24 lg:py-32`.
Container max-width: `max-w-7xl` (1280px) dengan `px-4 md:px-8`.

### 13.5 Komponen Kunci
- **Button**: variants `default`, `outline`, `ghost`, `link`. Size `sm`, `md`, `lg`.
- **Card**: border tipis, radius `--radius`, shadow halus `shadow-sm hover:shadow-md transition`.
- **Image**: `next/image`, `priority` untuk LCP, aspect ratio via `aspect-[4/3]` atau `aspect-[16/9]`.
- **Badge**: untuk "Min. order", "Ambil di toko", "Unggulan".
- **PriceTag**: format Rupiah, prefix "Mulai " jika `price_mode='start'`.

### 13.6 Navigasi
- Header sticky, backdrop-blur saat scroll.
- Logo kiri, menu tengah (desktop), hamburger kanan (mobile).
- Menu: Beranda, Produk, Borongan, Galeri, Tentang, Kontak.
- Mobile: drawer dari kanan, full-height, animasi slide.
- Footer: 4 kolom (desktop) — Brand, Navigasi, Kontak, Sosial.

---

## 14. PERFORMANCE CONTRACT

| Metrik | Target |
|---|---|
| LCP | < 2.0s |
| INP | < 150ms |
| CLS | < 0.05 |
| Lighthouse Performance | ≥ 90 |
| Lighthouse SEO | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| First Load JS (homepage) | < 150 KB |
| Image format | WebP/AVIF auto via Next.js |

**Wajib**:
- Semua gambar pakai `next/image` dengan `width`/`height` eksplisit.
- Font: `next/font` dengan `display: swap`.
- Route segment: `export const revalidate = 3600` untuk halaman publik (ISR 1 jam).
- Admin: `export const dynamic = 'force-dynamic'`.
- Lazy load komponen di bawah fold (`next/dynamic` + `ssr: false` untuk kalkulator).

---

## 15. SEO & METADATA CONTRACT

Setiap halaman wajib punya:
- `title` (format: `{Judul} | {Nama Usaha}`)
- `description` (max 160 char)
- `openGraph` (title, description, images, type)
- `twitter` card
- `canonical` URL
- `robots` (index, follow untuk publik; noindex untuk admin)

Helper `src/lib/metadata.ts`:
```ts
export function createMetadata(opts: { title: string; description: string; image?: string; path: string }): Metadata
```
Mengambil `business_name` dari cache settings.

---

## 16. ACCESSIBILITY CONTRACT (WCAG 2.1 AA)

- Semua gambar non-dekoratif punya `alt`.
- Focus visible jelas (`ring-2 ring-accent`).
- Kontras warna ≥ 4.5:1 untuk teks.
- Form label eksplisit (`<label htmlFor>`).
- Skip-to-content link di root layout.
- Keyboard navigation lengkap (modal, drawer, dropdown).
- ARIA roles untuk komponen custom.
- Bahasa: `<html lang="id">`.

---

## 17. TESTING CONTRACT

### 17.1 Coverage Target
- Unit: ≥ 80% pada `lib/` (whatsapp, calculator, currency, slug, validators).
- Integration: ≥ 70% pada server actions.
- E2E: critical path (lihat §17.3).

### 17.2 Test Types

**Unit (Vitest)** — `tests/unit/`:
- `whatsapp.test.ts`: semua 4 template pesan, validasi nomor.
- `calculator.test.ts`: semua kombinasi layanan × preset × luas.
- `currency.test.ts`: format Rupiah (1000 → "Rp1.000", 1500000 → "Rp1.500.000").
- `slug.test.ts`: slugify bahasa Indonesia (termasuk "Gypsum Beton" → "gypsum-beton").
- `validators/*.test.ts`: semua zod schema (valid + invalid cases).

**Integration (Vitest + msw)** — `tests/integration/`:
- Server actions dengan mock Supabase.
- Test login flow (success, wrong PIN, lockout).
- Test product CRUD (create, update, delete, validation error).

**E2E (Playwright)** — `tests/e2e/`:
- `public-navigation.spec.ts`: semua route publik load, tidak 404.
- `product-flow.spec.ts`: browse → detail → WA CTA (assert URL contains `wa.me`).
- `calculator.spec.ts`: input → assert output rentang benar → WA CTA.
- `admin-login.spec.ts`: login seed admin → redirect dashboard.
- `admin-product-crud.spec.ts`: create, edit, delete produk.
- `admin-settings.spec.ts`: update business settings → assert tampil di homepage.
- `admin-pin-change.spec.ts`: ganti PIN → login dengan PIN baru.

### 17.3 Scripts
```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage",
  "test:e2e": "playwright test",
  "test:all": "pnpm test && pnpm test:e2e"
}
```

---

## 18. CI/CD CONTRACT

### 18.1 `.github/workflows/ci.yml`
Trigger: `push` ke `main`, `pull_request` ke `main`.

Jobs:
1. **install**: `pnpm install --frozen-lockfile`
2. **lint**: `pnpm lint`
3. **typecheck**: `pnpm exec tsc --noEmit`
4. **format-check**: `pnpm exec prettier --check .`
5. **build**: `pnpm build` (dengan env dummy dari `.env.example` — **tapi karena env wajib, gunakan secret GitHub Actions**)
6. **test-unit**: `pnpm test:coverage`
7. **test-e2e**: `pnpm test:e2e` (butuh Supabase test instance — gunakan env secret)

**Secrets GitHub yang dibutuhkan**:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- (Optional) `SUPABASE_TEST_URL` untuk DB test terpisah

### 18.2 `.github/workflows/deploy.yml`
Trigger: `push` ke `main` **setelah CI pass**.
Job: deploy ke Vercel via `vercel deploy --prod --token ${{ secrets.VERCEL_TOKEN }}`.

### 18.3 Branch Protection
- `main` wajib via PR.
- Require CI pass.
- Require 1 approval (opsional, tergantung tim).

---

## 19. DEPLOYMENT CONTRACT (VERCEL)

### 19.1 `vercel.json` (minimal)
```json
{
  "framework": "nextjs",
  "regions": ["sin1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

### 19.2 Vercel Env
Hanya 3 variabel (§6). Di-set via Vercel Dashboard atau `vercel env add`.

### 19.3 Build Command
Default Next.js: `pnpm build`. Tidak perlu custom.

### 19.4 Post-build
- `pnpm run db:migrate` **TIDAK** dijalankan di Vercel (migrasi dilakukan manual via Supabase CLI atau script lokal sekali saja).
- Seed admin hanya dijalankan **sekali** di awal setup, tidak otomatis di deploy.

### 19.5 Checklist Deploy Pertama
1. Buat project Supabase.
2. Jalankan `pnpm run db:migrate` lokal (push migrations ke Supabase).
3. Jalankan `pnpm run db:seed` → catat username & PIN default.
4. Set 3 env vars di Vercel.
5. Connect repo GitHub → Vercel auto-deploy.
6. Login admin → ganti PIN.
7. Update `business_settings` via dashboard.
8. Upload produk & galeri pertama.

---

## 20. ERROR HANDLING CONTRACT

### 20.1 Global Error Boundary
- `src/app/error.tsx`: UI ramah user, tombol "Coba lagi" & "Kembali ke beranda".
- `src/app/not-found.tsx`: 404 custom dengan CTA ke homepage.
- `src/app/admin/error.tsx`: varian admin (lebih teknis, boleh tampilkan error code).

### 20.2 Server Action Error
```ts
export class ActionError extends Error {
  constructor(public code: string, public message: string, public field?: string) {
    super(message);
  }
}
```
Client menerima `{success: false, error: {code, message, field}}` → tampilkan di form field terkait.

### 20.3 Logging
- Server: `console.error` dengan structured log (JSON).
- Client: kirim ke endpoint `/api/log` opsional (bisa ditambah nanti, bukan mandatory).

---

## 21. SECURITY CONTRACT

1. **RLS enabled** di semua tabel.
2. **Service role key** hanya di server, tidak pernah di-bundle ke client.
3. **PIN hash**: bcrypt cost 10.
4. **CSRF**: Next.js server actions sudah aman secara default (SameSite cookie).
5. **XSS**: semua user content di-render via React (auto-escape). Jika ada HTML rich text, sanitize dengan DOMPurify.
6. **Upload validation**:
   - Cek mime type di server (bukan hanya client).
   - Batas ukuran 5 MB.
   - Rename file ke UUID.
   - Hanya image/* yang diizinkan.
7. **Rate limit**: Supabase Auth bawaan untuk login (5 percobaan / 15 menit).
8. **No secrets di git**: `.env.local` di `.gitignore`, pre-commit hook (opsional via `husky` + `lint-staged`).
9. **CSP** (opsional, recommended): tambahkan di `next.config.ts` jika diperlukan.

---

## 22. DATA SEEDING CONTRACT

### 22.1 `scripts/seed.ts`
Menjalankan urutan:
1. Hapus semua data (kecuali `auth.users` — handle manual).
2. Insert `business_settings` (data contoh realistis, bukan lorem).
3. Insert 3 kategori: Gypsum, Gypsum Beton, Gypsum Custom.
4. Insert 6–9 produk contoh (2–3 per kategori) dengan gambar dari Unsplash URL **sementara** — admin wajib ganti.
5. Insert 3 layanan borongan + 2 preset per layanan.
6. Insert 6 proyek galeri contoh.
7. Insert admin default (lihat §7.2).

**Catatan**: gambar contoh boleh pakai URL Unsplash langsung (bukan placeholder.gray), tapi harus realistis (foto gypsum/konstruksi/interior).

### 22.2 Script Commands
```json
{
  "db:migrate": "supabase db push",
  "db:seed": "tsx scripts/seed.ts",
  "db:reset": "tsx scripts/reset.ts"
}
```

---

## 23. NAMING CONVENTION

| Entitas | Konvensi | Contoh |
|---|---|---|
| File komponen | PascalCase | `ProductCard.tsx` |
| File util/lib | camelCase | `whatsapp.ts` |
| File server action | camelCase | `adminUpsertProduct.ts` |
| Folder route | kebab-case | `produk/`, `borongan-jasa-pasang/` |
| DB table | snake_case plural | `products`, `business_settings` |
| DB column | snake_case | `price_start`, `is_active` |
| Env var | UPPER_SNAKE | `NEXT_PUBLIC_SUPABASE_URL` |
| TS type | PascalCase | `Product`, `BusinessSettings` |
| Zod schema | camelCase + `Schema` | `productSchema` |
| CSS class | Tailwind utility (no custom CSS kecuali globals) | — |

---

## 24. DEFINISI "SIAP PRODUKSI" (DONE CRITERIA)

Sebuah fitur dianggap **selesai** hanya jika:
1. ✅ Kode mengikuti struktur §4.
2. ✅ Validasi zod sesuai §11.
3. ✅ Server action sesuai §12.
4. ✅ Test unit/integrasi pass.
5. ✅ E2E test untuk critical path pass.
6. ✅ Lighthouse ≥ 90 (perf, SEO, a11y).
7. ✅ Mobile responsive (test di 375px, 768px, 1440px).
8. ✅ Tidak ada `console.log` sisa.
9. ✅ Tidak ada `TODO`/`FIXME` di kode production.
10. ✅ TypeScript strict, zero `any`.
11. ✅ ESLint zero warning.
12. ✅ Build sukses di Vercel preview.

---

## 25. LARANGAN EKSPLESIT (BLACKLIST)

- ❌ `console.log` di production code (gunakan logger jika perlu).
- ❌ `any` type (gunakan `unknown` + type guard).
- ❌ `eslint-disable` tanpa komentar alasan.
- ❌ Inline style (gunakan Tailwind).
- ❌ `!important` di CSS.
- ❌ Library moment.js (gunakan `Intl.DateTimeFormat` atau `date-fns`).
- ❌ CSS framework lain selain Tailwind.
- ❌ State management global.
- ❌ Hardcode WhatsApp number, alamat, nama usaha.
- ❌ Placeholder text (lorem ipsum, "Coming soon", "Sample product").
- ❌ Gambar placeholder (placehold.co, via.placeholder.com).
- ❌ Dependency yang tidak disebutkan di §3.
- ❌ Environment variable di luar §6.
- ❌ Multi-role / permission system.
- ❌ Fitur e-commerce terselubung (cart, wishlist, checkout).
- ❌ Client-side routing library (gunakan Next.js Link).
- ❌ `dangerouslySetInnerHTML` tanpa sanitization.

---

## 26. CHECKLIST IMPLEMENTASI (URUTAN WAJIB)

Untuk developer/AI yang mulai dari nol:

1. [ ] `pnpm create next-app@latest gypsum-katalog-pro --ts --tailwind --app --eslint --src-dir --import-alias @/*`
2. [ ] Install dependencies sesuai §3.
3. [ ] Setup shadcn/ui (`npx shadcn@latest init`).
4. [ ] Copy struktur folder §4.
5. [ ] Setup Supabase project + jalankan migrations §5.
6. [ ] Setup `.env.local` dengan 3 vars.
7. [ ] Jalankan `pnpm db:seed`.
8. [ ] Implementasi `lib/env.ts` validation.
9. [ ] Implementasi Supabase clients §5 (client, server, admin).
10. [ ] Implementasi design system §13 (globals.css, tailwind.config).
11. [ ] Implementasi root layout + Header + Footer.
12. [ ] Implementasi homepage.
13. [ ] Implementasi halaman produk (list + detail).
14. [ ] Implementasi halaman borongan + kalkulator.
15. [ ] Implementasi halaman galeri (list + detail).
16. [ ] Implementasi tentang + kontak.
17. [ ] Implementasi middleware auth admin.
18. [ ] Implementasi login admin.
19. [ ] Implementasi dashboard admin.
20. [ ] Implementasi CRUD produk + upload image.
21. [ ] Implementasi CRUD kategori.
22. [ ] Implementasi CRUD galeri.
23. [ ] Implementasi CRUD borongan + presets.
24. [ ] Implementasi pengaturan usaha + ganti PIN.
25. [ ] Tulis semua unit tests §17.
26. [ ] Tulis integration tests.
27. [ ] Tulis E2E tests.
28. [ ] Setup GitHub Actions CI/CD §18.
29. [ ] Deploy ke Vercel §19.
30. [ ] Validasi semua acceptance criteria §24.

---

## 27. ACCEPTANCE CRITERIA GLOBAL

Website dianggap **final baseline** hanya jika:

1. ✅ Semua env vars hanya 3 (§6).
2. ✅ Admin seed login sukses dengan `admin` / `123456`.
3. ✅ Ganti PIN berfungsi dan PIN baru bisa login.
4. ✅ Semua halaman publik load tanpa error.
5. ✅ Semua CTA publik mengarah ke WhatsApp dengan pesan terformat benar.
6. ✅ Kalkulator borongan menghasilkan angka sesuai rumus §10.
7. ✅ Admin bisa CRUD produk, kategori, galeri, borongan, settings.
8. ✅ Upload image berfungsi dan tampil di publik.
9. ✅ Mobile responsive sempurna.
10. ✅ Lighthouse ≥ 90 di semua metrik.
11. ✅ Semua test pass (unit + integration + e2e).
12. ✅ CI/CD berjalan otomatis di GitHub Actions.
13. ✅ Deploy ke Vercel sukses tanpa konfigurasi tambahan.
14. ✅ Tidak ada hardcode konten bisnis.
15. ✅ Tidak ada placeholder/lorem ipsum.
16. ✅ Desain premium sesuai §13 (review visual wajib).

---

## 28. VERSI DOKUMEN

| Versi | Tanggal | Perubahan |
|---|---|---|
| 1.0.0 | 2026-09-11 | Initial baseline release |

**Dokumen ini beku.** Perubahan hanya via revisi formal dengan increment versi. Developer/AI **tidak boleh** menyimpang tanpa persetujuan tertulis.

---

**END OF SPECIFICATION**

Dokumen ini adalah kontrak final. Implementasi yang menyimpang = bug.
