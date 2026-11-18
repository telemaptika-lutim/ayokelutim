# Panduan Kolaborasi GitHub — Portal Ayo Ke Luwu Timur

Organisasi GitHub: `telemaptika-lutim`, repo: `ayokelutim`. Ganti `<username>` dengan username masing-masing.

---

## 0. Persiapan (sekali per anggota)

1. Buat akun di https://github.com/signup (gunakan email dinas bila ada).
2. Aktifkan 2FA: **Settings → Password and authentication → Two-factor authentication**.
3. Install Git: https://git-scm.com/downloads (Windows: pilih default, termasuk *Git Bash*).
4. Konfigurasi identitas:

```bash
git config --global user.name "Nama Lengkap"
git config --global user.email "email@domain.go.id"
git config --global init.defaultBranch main
git config --global pull.rebase false
```

5. Login (pilih salah satu):

**A. GitHub CLI (paling mudah)**
```bash
# Windows: winget install GitHub.cli   | Ubuntu: sudo apt install gh
gh auth login        # pilih GitHub.com → HTTPS → Login with a web browser
```

**B. SSH key**
```bash
ssh-keygen -t ed25519 -C "email@domain.go.id"
cat ~/.ssh/id_ed25519.pub     # salin → GitHub Settings → SSH and GPG keys → New SSH key
ssh -T git@github.com         # uji koneksi
```

---

## 1. Buat Organisasi & Repository (dilakukan Koordinator/Amar)

1. **Organisasi:** https://github.com/account/organizations/new → pilih paket *Free* → nama `telemaptika-lutim`.
2. **Repository:** di halaman organisasi → **New repository**
   - Name: `ayokelutim`
   - Visibility: *Public* (wajib jika pakai GitHub Pages gratis) atau *Private*
   - Jangan centang *Add README* (karena kita upload kerangka yang sudah ada).
3. **Upload kerangka** dari folder `ayokelutim` di komputer:

```bash
cd ayokelutim
git init
git add .
git commit -m "init: kerangka portal ayo ke luwu timur"
git branch -M main
git remote add origin https://github.com/telemaptika-lutim/ayokelutim.git
git push -u origin main
```

---

## 2. Undang Kolaborator

**Lewat web:** Organisasi → **People → Invite member** → masukkan username → role *Member*.
Lalu buat tim: **Teams → New team** → `tim-web` → **Repositories → Add** `ayokelutim` dengan role **Write**.

**Lewat CLI** (koordinator):
```bash
gh api -X PUT orgs/telemaptika-lutim/memberships/<username> -f role=member
gh api -X PUT orgs/telemaptika-lutim/teams/tim-web/repos/telemaptika-lutim/ayokelutim -f permission=push
```

Anggota menerima undangan lewat email atau https://github.com/orgs/telemaptika-lutim/invitation

| Role | Untuk |
|---|---|
| Admin | Koordinator (atur setting, branch protection) |
| Maintain | Reviewer senior |
| Write | Anggota tim (push branch, buat PR) |
| Read | Pimpinan / pemantau |

---

## 3. Lindungi Branch `main` (Koordinator)

Repo → **Settings → Branches → Add branch ruleset** (atau *Add classic branch protection rule*):
- Branch name pattern: `main`
- ✅ Require a pull request before merging
- ✅ Require approvals: **1**
- ✅ Dismiss stale pull request approvals when new commits are pushed
- ✅ Require conversation resolution before merging
- ✅ Block force pushes
- ✅ Restrict deletions

Hasilnya: tidak ada yang bisa push langsung ke `main`, semua lewat PR.

---

## 4. Alur Kerja Harian (setiap anggota)

```bash
# 1) Clone (sekali saja)
git clone https://github.com/telemaptika-lutim/ayokelutim.git
cd ayokelutim

# 2) Selalu mulai dari main terbaru
git checkout main
git pull origin main

# 3) Buat branch kerja
git checkout -b fitur/halaman-event

# 4) Edit file... lalu cek perubahan
git status
git diff

# 5) Simpan perubahan (commit)
git add .
git commit -m "fitur: tambah daftar event 2027"

# 6) Kirim ke GitHub
git push -u origin fitur/halaman-event
```

### Buat Pull Request
**Web:** buka repo → muncul tombol **Compare & pull request** → isi template → **Reviewers**: pilih rekan → **Create pull request**.

**CLI:**
```bash
gh pr create --base main --fill --reviewer <username-reviewer>
```

### Revisi setelah review
Cukup commit & push lagi ke branch yang sama, PR otomatis ter-update:
```bash
git add .
git commit -m "perbaikan: sesuai masukan review"
git push
```

---

## 5. Review & Merge (Reviewer)

**Web:** tab **Pull requests** → pilih PR → **Files changed** → beri komentar per baris → **Review changes** → *Approve* / *Request changes*.

**CLI:**
```bash
gh pr list
gh pr checkout 12            # coba PR #12 di komputer sendiri
gh pr review 12 --approve
gh pr review 12 --request-changes -b "Gambar belum dikompres"
gh pr merge 12 --squash --delete-branch
```

Gunakan **Squash and merge** agar riwayat `main` rapi (1 PR = 1 commit).

Setelah merge, semua anggota:
```bash
git checkout main
git pull origin main
git branch -d fitur/halaman-event     # hapus branch lokal yang sudah selesai
```

---

## 6. Menangani Conflict

Terjadi bila dua orang mengubah baris yang sama. Selesaikan di branch kerja:

```bash
git checkout fitur/halaman-event
git pull origin main          # muncul: CONFLICT (content): Merge conflict in ...
git status                    # lihat file yang conflict
```

Buka file tersebut, cari penanda:
```
<<<<<<< HEAD
versi milik anda
=======
versi dari main
>>>>>>> main
```
Pilih/gabungkan isi yang benar, **hapus ketiga penanda**, lalu:
```bash
git add <file>
git commit -m "perbaikan: selesaikan conflict dengan main"
git push
```

Batalkan proses merge bila bingung:
```bash
git merge --abort
```

**Tips mencegah conflict:** pull `main` setiap mulai kerja, PR kecil-kecil, bagi tugas per halaman/file, koordinasi sebelum mengubah `style.css` dan `data/konten.js`.

---

## 7. Pembagian Tugas dengan Issues & Project

1. Repo → **Issues → New issue** → pakai template *Tugas / Fitur* → **Assignees**: anggota.
2. Hubungkan PR ke issue dengan menulis `Closes #5` di deskripsi PR (issue tertutup otomatis saat merge).
3. Papan kanban: Organisasi → **Projects → New project → Board** (kolom: *Todo, Dikerjakan, Review, Selesai*).

```bash
gh issue create -t "Halaman Kuliner: tambah 5 data" -a <username> -l tugas
gh issue list
```

Usulan pembagian awal:

| Issue | PIC |
|---|---|
| Desain & warna (`style.css`) | [Nama] |
| Konten Destinasi | [Nama] |
| Konten Event & Kuliner | [Nama] |
| Galeri & kompresi foto | [Nama] |
| Halaman Kontak & peta | [Nama] |

---

## 8. Deploy ke GitHub Pages (opsional, gratis)

Syarat: repo *Public* (atau akun GitHub Team/Enterprise untuk private).

Repo → **Settings → Pages** → *Build and deployment*:
- Source: **Deploy from a branch**
- Branch: **main** / **(root)** → **Save**

Situs tayang di: `https://telemaptika-lutim.github.io/ayokelutim/` (± 1–2 menit; setiap merge ke `main` otomatis ter-update).

**Domain sendiri** (mis. `ayokeluwutimur.luwutimurkab.go.id`):
1. Settings → Pages → **Custom domain** → isi domain → Save (membuat file `CNAME`).
2. Di DNS domain, buat record: `CNAME  ayokeluwutimur  telemaptika-lutim.github.io.`
3. Centang **Enforce HTTPS** setelah sertifikat aktif.

> Untuk subdomain `.go.id`, koordinasikan dengan pengelola DNS Pemkab. Alternatif: deploy ke server Diskominfo sendiri dengan `git pull` di web root.

Deploy ke server sendiri (contoh Nginx/Apache di Linux):
```bash
cd /var/www
sudo git clone https://github.com/telemaptika-lutim/ayokelutim.git
# update setiap ada rilis:
cd /var/www/ayokelutim && sudo git pull origin main
```

---

## 9. Contekan Perintah

| Perintah | Fungsi |
|---|---|
| `git status` | Lihat file yang berubah |
| `git log --oneline --graph -10` | Riwayat singkat |
| `git diff` | Lihat detail perubahan |
| `git checkout -b <branch>` | Buat & pindah branch |
| `git switch <branch>` | Pindah branch |
| `git branch -a` | Daftar branch |
| `git pull origin main` | Ambil update terbaru |
| `git restore <file>` | Batalkan perubahan file (belum di-add) |
| `git restore --staged <file>` | Batalkan `git add` |
| `git commit --amend` | Ubah commit terakhir (sebelum push) |
| `git stash` / `git stash pop` | Simpan sementara / ambil kembali perubahan |
| `git revert <hash>` | Batalkan commit yang sudah di-push (aman) |

**Larangan:** `git push --force` ke `main`, commit file `.env`/password, upload foto >1 MB.
