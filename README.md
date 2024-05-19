<p align="center">
<a href="https://laravel.com" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" height="100" alt="Laravel Logo"></a>
<a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" height="100" alt="Laravel Logo"></a>
</p>

<h1 align="center">Sekawan Media Project Demo</h1>

## Getting Started
kunjungi server pribadi saya untuk melihat demo :
- [http://fierceface.cloud:8080](http://fierceface.cloud:8080)

nb: database server akan direfresh setiap satu jam

## Panduan Penggunaan

terdapat 4 akun yaitu:

```json
[
    {
        "nama": "admin1",
        "email": "admin1@example.com",
        "password": "password"
    },
    {
        "nama": "admin2",
        "email": "admin1@example.com",
        "password": "password"
    },
    {
        "nama": "admin3",
        "email": "admin1@example.com",
        "password": "password"
    },
    {
        "nama": "supervisor",
        "email": "supervisor@example.com",
        "password": "password"
    }
]
```
### silahkan login dengan akun admin untuk membuat jadwal pemakaian kendaraan

- login dengan salah satu akun admin
- silahkan jelajahi tampilan dan semua fungsionalitasnya
- jika ingin membuat jadwal pemakaian kendaraan pergi ke tab kendaraan
- pilih salah satu kendaraan dengan status available
- jika sudah masuk kehalaman detail kendaraan silahkan klik pesan kendaraan
- input jadwal dan lokasi penggunaan
- klik pesan dan anda akan di tunjukan halaman pesanan
- pesanan baru anda akan memiliki status pending
- status hanya bisa diubah oleh supervisor

### silahkan login dengan akun supervisor untuk menyetujui jadwal pemakaian kendaraan

- login dengan akun supervisor
- klik halaman pesanan
- terdapat tombol centang dan buang yang hanya bisa dilihat oleh supervisor
- klik centang untuk menyetujui
- klik buang untuk menghapus pesanan

## Panduan Instalasi

berikut panduan untuk instalasi dan setup di environment pribadi

### persyaratan:

- php version 8.3
- nodejs version 18
- mysql version 8
- composer

### Langkah - Langkah:
silahkan clone [repository ini](https://github.com/alfinprasetya/sekawan-test):

```bash
git clone https://github.com/alfinprasetya/sekawan-test
```
cd ke folder /sekawan-test

rename atau copy file .env.example menjadi .env

```bash
cp .env.example .env
```

sesuaikan setting dalam .env dengan environment anda

utamakan APP_URL dan database sudah benar agar semua routing dan migration dapat berjalan baik

contoh :

```dotenv
APP_URL=localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=database
DB_USERNAME=username
DB_PASSWORD=password
```

jalankan beberapa perintah berikut :

```bash
npm install
npm run build
```

perintah tersebut untuk menciptakan build file dari file react jsx

```bash
composer install
```
run composer install untuk mendownload semua dependency

```bash
php artisan migrate
php artisan db:seed
```
perintah diatas untuk menciptakan database table dan mengisinya dengan data dummy

```bash
php artisan key:generate
```
untuk menghasilkan nilai APP_KEY di .env

terakhir untuk menjalankan local server silahkan run :

```bash
php artisan serve
```
