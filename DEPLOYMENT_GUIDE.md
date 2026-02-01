# Panduan Deployment Aplikasi Anti-Gravity

Agar aplikasi dapat diakses melalui internet (GitHub/Sharing Link), Anda perlu meng-upload Backend (Server) dan Frontend (Tampilan) ke layanan Cloud.

Kami merekomendasikan **Render.com** (untuk Backend) dan **Vercel** (untuk Frontend) karena gratis dan mudah digunakan.

---

## Langkah 1: Push Kode Terbaru ke GitHub
(Langkah ini sudah saya lakukan otomatis untuk Anda).
Pastikan repository GitHub Anda `febryanoalandyberta/TrainingMKT_SoftwareEngineer` sudah up-to-date.

---

## Langkah 2: Deploy Backend (Server)
Backend harus online terlebih dahulu agar kita bisa mendapatkan link API-nya.

1.  Buka [Render.com](https://render.com) dan Sign Up menggunakan akun **GitHub** Anda.
2.  Klik tombol **"New +"** -> Pilih **"Web Service"**.
3.  Pilih repository `febryanoalandyberta/TrainingMKT_SoftwareEngineer`.
4.  Isi form konfigurasi sebagai berikut:
    *   **Name**: `anti-gravity-backend` (atau nama lain yang unik)
    *   **Root Directory**: `anti-gravity/backend` (PENTING: Jangan kosongkan ini!)
    *   **Environment**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node src/server.js`
5.  Scroll ke bawah, cari bagian **Environment Variables**, masukkan:
    *   `NODE_ENV` = `production`
    *   `PORT` = `5000`
6.  Klik **"Create Web Service"**.
7.  Tunggu proses selesai. Render akan memberikan URL (contoh: `https://anti-gravity-backend.onrender.com`).
    *   **Simpan URL ini**, kita akan menggunakannya di Langkah 3.

---

## Langkah 3: Deploy Frontend (Tampilan)
Sekarang kita upload frontend agar bisa dibuka dari HP.

1.  Buka [Vercel.com](https://vercel.com) dan Sign Up dengan akun **GitHub** Anda.
2.  Klik **"Add New..."** -> **"Project"**.
3.  Import repository `febryanoalandyberta/TrainingMKT_SoftwareEngineer`.
4.  Pada halaman **Configure Project**:
    *   **Framework Preset**: Pilih `Vite`.
    *   **Root Directory**: Klik **Edit**, lalu pilih folder `anti-gravity/frontend`.
5.  Buka bagian **Environment Variables**, tambahkan:
    *   **Key**: `VITE_API_URL`
    *   **Value**: Masukkan URL Backend dari Langkah 2 + `/api/v1`
        *   Contoh: `https://anti-gravity-backend.onrender.com/api/v1`
6.  Klik **"Deploy"**.

---

## Selesai!
Vercel akan memberikan link domain (contoh: `https://anti-gravity-frontend.vercel.app`).
Link inilah yang bisa Anda kirim ke WhatsApp, buka di HP, atau bagikan ke rekan kerja Anda untuk testing Absensi secara online.
