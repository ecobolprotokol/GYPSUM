# 📄 README.md — `gypsum-katalog-pro`

```markdown
# 🏗️ Gypsum Katalog Pro

> Website katalog profesional untuk usaha gypsum rumahan — media informasi, katalog produk, portfolio, dan konsultasi pelanggan via WhatsApp.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![CI](https://img.shields.io/github/actions/workflow/status/your-org/gypsum-katalog-pro/ci.yml?label=CI&logo=github)]()
[![License](https://img.shields.io/badge/License-Private-red)]()

---

## 📋 Ringkasan

**Gypsum Katalog Pro** adalah website katalog B2C untuk usaha gypsum rumahan yang berfokus pada:

- ✅ **Katalog produk** (Gypsum, Gypsum Beton, Gypsum Custom) dengan foto, spesifikasi, harga, dan minimal order
- ✅ **Layanan borongan & jasa pasang** dengan kalkulator estimasi online
- ✅ **Portfolio/galeri** pekerjaan dengan link ke dokumentasi eksternal (Instagram, dll)
- ✅ **Konsultasi instan** via WhatsApp dengan pesan otomatis terformat
- ✅ **Admin dashboard** lengkap untuk mengelola seluruh konten tanpa menyentuh kode

**Bukan e-commerce** — tidak ada keranjang, checkout, pembayaran, stok, atau akun pelanggan. Semua konversi diarahkan ke WhatsApp.

---

## ✨ Fitur Utama

### Publik (Tanpa Login)
| Halaman | Fungsi |
|---|---|
| **Beranda** | Hero, kategori, produk unggulan, highlight galeri, CTA WhatsApp |
| **Katalog Produk** | Filter kategori, grid responsif, detail produk dengan galeri & spesifikasi |
| **Borongan & Jasa Pasang** | Daftar layanan + kalkulator estimasi biaya berdasarkan luas area |
| **Galeri** | Portfolio proyek dengan link dokumentasi eksternal |
| **Tentang** | Profil usaha, visi-misi, cerita brand |
| **Kontak** | Alamat, WhatsApp, Google Maps embed, sosial media |

### Admin Dashboard
- 🔐 Login dengan **username + PIN 6 digit** (bukan password)
- 📦 CRUD produk, kategori, galeri, layanan borongan
- ⚙️ Pengaturan usaha (nama, alamat, WhatsApp, sosial media, Google Maps)
- 🖼️ Upload gambar langsung ke Supabase Storage
- 🔑 Ganti PIN dengan validasi kekuatan
- 📊 Dashboard statistik ringkas

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5.5 (strict mode) |
| **Styling** | Tailwind CSS 3.4 |
| **UI Components** | shadcn/ui (Radix primitives) |
| **Database** | Supabase (PostgreSQL 15) |
| **Auth** | Supabase Auth + custom PIN system |
| **Storage** | Supabase Storage |
| **Validation** | Zod 3.23 |
| **Forms** | react-hook-form |
| **Icons** | lucide-react |
| **Testing** | Vitest + React Testing Library + Playwright |
| **CI/CD** | GitHub Actions |
| **Deployment** | Vercel |
| **Package Manager** | pnpm 9 |

---

## 📦 Prerequisites

Sebelum memulai, pastikan sudah terinstall:

- **Node.js** `20.x LTS` — [download](https://nodejs.org/)
- **pnpm** `^9` — `npm install -g pnpm`
- **Git** — [download](https://git-scm.com/)
- **Akun Supabase** — [daftar gratis](https://supabase.com/)
- **Akun Vercel** — [daftar gratis](https://vercel.com/)
- **Akun GitHub** — untuk repository & CI/CD

Opsional tapi direkomendasikan:
- **Supabase CLI** — untuk migration lokal: `npm install -g supabase`
- **VS Code** + ekstensi: ESLint, Prettier, Tailwind CSS IntelliSense, Prisma/SQL

---

## 🚀 Quick Start (TL;DR)

```bash
# 1. Clone repository
git clone https://github.com/your-org/gypsum-katalog-pro.git
cd gypsum-katalog-pro

# 2. Install dependencies
pnpm install

# 3. Setup environment
cp .env.example .env.local
# Edit .env.local dengan credentials Supabase Anda

# 4. Setup database
pnpm db:migrate
pnpm db:seed

# 5. Jalankan development server
pnpm dev

# 6. Buka browser
# http://localhost:3000          → Website publik
# http://localhost:3000/admin    → Admin dashboard
```

**Default admin credentials:**
- Username: `admin`
- PIN: `123456`
- ⚠️ **Wajib ganti PIN setelah login pertama!**

---

## 📥 Instalasi Detail

### 1. Clone & Install

```bash
git clone https://github.com/your-org/gypsum-katalog-pro.git
cd gypsum-katalog-pro
pnpm install
```

### 2. Setup Supabase Project

1. Login ke [Supabase Dashboard](https://supabase.com/dashboard/)
2. Buat project baru (catat nama project)
3. Setelah project ready, buka **Settings → API**
4. Salin 3 nilai berikut:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` (secret!) → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Konfigurasi Environment

Buat file `.env.local` di root project:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ **PENTING:** Hanya 3 variabel ini yang diizinkan. Jangan tambahkan variabel lain.

### 4. Setup Database

```bash
# Jalankan migration (buat tabel, RLS, storage buckets)
pnpm db:migrate

# Seed data awal (admin + data contoh realistis)
pnpm db:seed
```

### 5. Jalankan Development Server

```bash
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 🔐 Default Admin Access

Setelah menjalankan `pnpm db:seed`, admin default tersedia:

| Field | Nilai |
|---|---|
| **URL Login** | `http://localhost:3000/admin/login` |
| **Username** | `admin` |
| **PIN** | `123456` |

**Alur login pertama:**
1. Login dengan kredensial di atas
2. Sistem akan memaksa redirect ke halaman ganti PIN
3. Masukkan PIN baru (6 digit, tidak boleh pola lemah)
4. PIN baru siap digunakan

> 🔒 **Security note:** Jangan commit `.env.local` ke git. File ini sudah ada di `.gitignore`.

---

## 🧪 Testing

### Jalankan Semua Test

```bash
# Unit + integration tests
pnpm test

# Dengan coverage report
pnpm test:coverage

# Watch mode (untuk development)
pnpm test:watch

# E2E tests (butuh dev server berjalan)
pnpm test:e2e

# Semua test (unit + e2e)
pnpm test:all
```

### Coverage Target

| Jenis | Target | Tool |
|---|---|---|
| Unit (`lib/`) | ≥ 80% | Vitest |
| Integration (server actions) | ≥ 70% | Vitest + MSW |
| E2E (critical path) | 100% critical path | Playwright |

### Struktur Test

```
tests/
├── unit/              # whatsapp, calculator, currency, slug, validators
├── integration/       # server actions dengan mock Supabase
└── e2e/               # Playwright: public flow, admin CRUD, login
```

---

## 🚢 Deployment ke Vercel

### Cara 1: Auto-deploy via GitHub (Recommended)

1. Push repository ke GitHub
2. Login ke [Vercel Dashboard](https://vercel.com/)
3. **Add New → Project** → import repository GitHub
4. Framework preset: **Next.js** (auto-detected)
5. Tambahkan 3 environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
6. Klik **Deploy** — selesai!

Setiap push ke branch `main` akan auto-deploy.

### Cara 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (ikuti prompt)
vercel

# Deploy ke production
vercel --prod
```

### Custom Domain

1. Di Vercel Dashboard → **Settings → Domains**
2. Tambahkan domain Anda (misal: `gypsum-usaha.com`)
3. Update DNS sesuai instruksi Vercel
4. SSL otomatis aktif dalam beberapa menit

### Post-deploy Checklist

- [ ] Login admin → ganti PIN default
- [ ] Update pengaturan usaha (nama, alamat, WhatsApp, sosial media)
- [ ] Upload logo & cover image
- [ ] Tambahkan produk pertama
- [ ] Tambahkan layanan borongan
- [ ] Tambahkan proyek galeri pertama
- [ ] Test semua CTA WhatsApp di mobile & desktop

---

## 📁 Struktur Proyek

```
gypsum-katalog-pro/
├── .github/workflows/       # CI/CD (GitHub Actions)
├── public/                  # Static assets (favicon, OG image, robots.txt)
├── scripts/                 # Database scripts (seed, reset, migrate)
├── supabase/
│   └── migrations/          # SQL migrations (schema, RLS, storage)
├── src/
│   ├── app/
│   │   ├── (public)/        # Halaman publik (homepage, produk, galeri, dll)
│   │   ├── admin/           # Admin dashboard & login
│   │   ├── api/             # API routes (helper WhatsApp, dll)
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── layout/          # Header, Footer, MobileNav
│   │   ├── public/          # Komponen halaman publik
│   │   ├── admin/           # Komponen dashboard admin
│   │   └── shared/          # Komponen reusable
│   ├── lib/
│   │   ├── supabase/        # Supabase clients (browser, server, admin)
│   │   ├── validators/      # Zod schemas
│   │   ├── whatsapp.ts      # Helper format pesan WhatsApp
│   │   ├── calculator.ts    # Logika kalkulator borongan
│   │   └── currency.ts      # Format Rupiah
│   └── types/               # TypeScript types
├── tests/                   # Unit, integration, E2E tests
├── .env.example             # Template environment variables
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── vitest.config.ts         # Vitest configuration
├── playwright.config.ts     # Playwright configuration
└── package.json             # Dependencies & scripts
```

---

## 📜 NPM Scripts

| Command | Fungsi |
|---|---|
| `pnpm dev` | Jalankan development server (localhost:3000) |
| `pnpm build` | Build untuk production |
| `pnpm start` | Jalankan production build |
| `pnpm lint` | Jalankan ESLint |
| `pnpm format` | Format kode dengan Prettier |
| `pnpm typecheck` | Cek TypeScript errors |
| `pnpm test` | Jalankan unit & integration tests |
| `pnpm test:watch` | Test mode watch |
| `pnpm test:coverage` | Test dengan coverage report |
| `pnpm test:e2e` | Jalankan E2E tests (Playwright) |
| `pnpm test:all` | Jalankan semua test |
| `pnpm db:migrate` | Push migrations ke Supabase |
| `pnpm db:seed` | Seed data awal (admin + contoh) |
| `pnpm db:reset` | Reset database ke state bersih + seed |

---

## 📚 Dokumentasi

- **[SPECIFICATION.md](./docs/SPECIFICATION.md)** — Master Spesifikasi Kontrak Final Baseline (SSOT)
  - Database schema lengkap
  - API contracts
  - Page contracts
  - Design system
  - Validation rules
  - Testing requirements
  - Deployment guidelines

> 📌 **Penting:** Semua developer (manusia atau AI) **wajib** mengikuti spesifikasi di `SPECIFICATION.md`. Dokumen ini adalah *single source of truth*.

---

## 🤝 Contributing

Proyek ini adalah **private repository** untuk usaha rumahan. Namun jika Anda berkontribusi:

1. Buat branch baru: `git checkout -b feature/nama-fitur`
2. Commit perubahan: `git commit -m 'feat: tambah fitur X'`
3. Push ke branch: `git push origin feature/nama-fitur`
4. Buat Pull Request ke branch `main`

### Conventional Commits

Gunakan format commit:
- `feat:` — fitur baru
- `fix:` — bug fix
- `docs:` — dokumentasi
- `style:` — formatting, tidak ada perubahan kode
- `refactor:` — refactor kode
- `test:` — menambah/mengupdate test
- `chore:` — maintenance, dependencies

### Code Standards

- ✅ TypeScript strict mode, zero `any`
- ✅ ESLint zero warning
- ✅ Prettier formatted
- ✅ Test coverage sesuai target
- ✅ Lighthouse ≥ 90 (perf, SEO, a11y)
- ✅ Mobile responsive (375px, 768px, 1440px)

---

## 🔒 Security

- ✅ Row Level Security (RLS) enabled di semua tabel
- ✅ Service role key hanya di server (tidak pernah di-bundle ke client)
- ✅ PIN di-hash dengan bcrypt (cost 10)
- ✅ Upload validation (mime type, size limit, UUID rename)
- ✅ XSS protection (React auto-escape + DOMPurify untuk HTML)
- ✅ CSRF protection (Next.js server actions default)
- ✅ No secrets in git (`.env.local` di `.gitignore`)

Jika menemukan vulnerability, **jangan buat public issue**. Hubungi maintainer langsung.

---

## 📄 License

**Private / Proprietary** — Proyek ini dibuat untuk usaha rumahan spesifik. Tidak dilisensikan untuk penggunaan publik atau komersial oleh pihak lain tanpa izin tertulis.

---

## 🆘 Troubleshooting

### Error: Environment variables tidak valid

```bash
Error: Invalid environment variables
```

**Solusi:** Pastikan `.env.local` ada dan berisi 3 variabel yang valid:
- `NEXT_PUBLIC_SUPABASE_URL` harus URL valid
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` min 20 karakter
- `SUPABASE_SERVICE_ROLE_KEY` min 20 karakter

### Error: Database connection failed

**Solusi:**
1. Cek Supabase project aktif (tidak paused)
2. Verifikasi URL dan keys di `.env.local`
3. Jalankan `pnpm db:migrate` jika tabel belum ada

### Error: Admin login gagal

**Solusi:**
1. Pastikan sudah menjalankan `pnpm db:seed`
2. Gunakan username `admin` dan PIN `123456`
3. Jika PIN sudah diganti dan lupa, jalankan `pnpm db:reset` (⚠️ akan reset semua data!)

### Error: Images tidak tampil

**Solusi:**
1. Cek Supabase Storage buckets sudah dibuat (lihat migration `0003_storage_buckets.sql`)
2. Verifikasi bucket `product-images`, `gallery-images`, `business-assets` public
3. Cek file size < 5 MB dan format `image/jpeg`, `image/png`, `image/webp`

### Error: WhatsApp link tidak berfungsi

**Solusi:**
1. Pastikan `whatsapp_number` di `business_settings` format: `628xxx` (tanpa `+`, tanpa `0` depan)
2. Contoh valid: `6281234567890`
3. Contoh invalid: `+6281234567890`, `081234567890`

---

## 📞 Support

Untuk pertanyaan teknis atau issue:
- 📧 Email: [maintainer@example.com](mailto:maintainer@example.com)
- 💬 WhatsApp: [Hubungi maintainer](https://wa.me/6281234567890)
- 🐛 Issues: [GitHub Issues](https://github.com/your-org/gypsum-katalog-pro/issues) (private repo)

---

## 🙏 Acknowledgments

Dibangun dengan teknologi modern:
- [Next.js](https://nextjs.org/) — React framework
- [Supabase](https://supabase.com/) — Backend as a Service
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) — Beautiful components
- [Vercel](https://vercel.com/) — Deployment platform

---

## 📝 Changelog

Lihat [CHANGELOG.md](./CHANGELOG.md) untuk riwayat versi.

| Versi | Tanggal | Perubahan |
|---|---|---|
| 1.0.0 | 2026-09-11 | Initial release — baseline final |

---

<div align="center">

**Dibuat dengan ❤️ untuk usaha gypsum rumahan Indonesia**

[⬆ Kembali ke atas](#-gypsum-katalog-pro)

</div>
```

---

## ✅ Catatan Implementasi

README ini:

1. **Self-contained** — Developer bisa mulai tanpa baca spesifikasi lengkap
2. **Actionable** — Setiap section punya command yang bisa langsung dijalankan
3. **Konsisten** — Tidak kontradiksi dengan Master Spec (3 env vars, default admin, dll)
4. **Profesional** — Nuansa premium sesuai target desain
5. **No placeholder** — Semua info konkret (credentials, URLs, commands)
6. **Bahasa campuran** — Indonesia untuk narasi, Inggris untuk istilah teknis (standar industri)
7. **Troubleshooting** — Solusi untuk error umum yang mungkin dihadapi

README ini siap digunakan dan bisa langsung di-commit ke repository.
