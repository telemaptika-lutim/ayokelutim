# Ayo Ke Luwu Timur

Portal pariwisata resmi Kabupaten Luwu Timur. Dikelola oleh Bidang Aptika, Diskominfo-SP Kabupaten Luwu Timur.

## Teknologi
HTML, CSS, dan JavaScript murni (tanpa framework, tanpa build). Cukup buka `index.html` di browser.

## Struktur
```
.
├── index.html          # Beranda
├── destinasi.html      # Destinasi wisata
├── event.html          # Event & festival
├── kuliner.html        # Kuliner khas
├── galeri.html         # Galeri foto
├── kontak.html         # Kontak
├── data/konten.js      # SEMUA isi konten (edit di sini)
├── assets/css/style.css
├── assets/js/main.js
├── assets/img/         # Foto (maks. ±300 KB/foto, format .jpg/.webp)
└── docs/PANDUAN-GITHUB.md
```

## Menjalankan di komputer
```bash
git clone https://github.com/telemaptika-lutim/ayokelutim.git
cd ayokelutim
# buka index.html langsung, atau jalankan server lokal:
python3 -m http.server 8000   # lalu buka http://localhost:8000
```

## Menambah konten
Edit `data/konten.js`, tambahkan objek baru pada kategori yang sesuai. Simpan foto ke `assets/img/`.

## Kontribusi
Baca [CONTRIBUTING.md](CONTRIBUTING.md) dan [docs/PANDUAN-GITHUB.md](docs/PANDUAN-GITHUB.md).

## Tim
| Nama | Peran |
|---|---|
| Amar | Koordinator / Maintainer |
| [Nama] | [Peran] |
