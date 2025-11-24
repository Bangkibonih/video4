document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('product-form');
    const listPreview = document.getElementById('product-list-preview');
    const message = document.getElementById('message');

    // Fungsi untuk memuat data dari localStorage
    const loadProducts = () => {
        // Mengambil data, jika kosong, kembalikan array kosong
        const products = JSON.parse(localStorage.getItem('productData')) || [];
        // Mengurutkan produk berdasarkan nomor untuk tampilan admin
        return products.sort((a, b) => a.no - b.no); 
    };

    // Fungsi untuk menyimpan data ke localStorage dan memperbarui tampilan
    const saveProducts = (products) => {
        localStorage.setItem('productData', JSON.stringify(products));
        renderList(products);
    };

    // Fungsi untuk menampilkan daftar produk di Admin Panel
    const renderList = (products) => {
        listPreview.innerHTML = '';
        if (products.length === 0) {
            listPreview.innerHTML = '<p>Belum ada produk ditambahkan.</p>';
            return;
        }

        products.forEach((product) => {
            const div = document.createElement('div');
            div.className = 'product-preview-item';
            div.innerHTML = `
                <div>
                    <strong>No. ${product.no}</strong>: ${product.link.substring(0, 40)}...
                    <br><small>Gambar: ${product.image}</small>
                </div>
                <button data-no="${product.no}">Hapus</button>
            `;
            listPreview.appendChild(div);
        });
    };

    // Handler Submit Form: TAMBAH PRODUK
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Ambil nilai dari input form
        const no = parseInt(document.getElementById('productNo').value);
        const link = document.getElementById('productLink').value;
        const image = document.getElementById('productImage').value;

        let products = loadProducts();

        // Cek jika nomor produk sudah ada (validasi)
        const exists = products.find(p => p.no === no);
        if (exists) {
            message.textContent = 'Gagal: Nomor produk sudah digunakan. Harap gunakan nomor unik.';
            message.style.backgroundColor = '#f8d7da';
            return;
        }

        // Tambahkan produk baru ke array
        products.push({ no, link, image });
        saveProducts(products); // Simpan dan render ulang

        message.textContent = `Berhasil! Produk No. ${no} telah ditambahkan.`;
        message.style.backgroundColor = '#d4edda';
        form.reset(); // Kosongkan formulir
    });

    // Handler Hapus Produk
    listPreview.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const noToDelete = parseInt(e.target.dataset.no);
            let products = loadProducts();
            
            // Filter: simpan semua produk kecuali yang ingin dihapus
            products = products.filter(p => p.no !== noToDelete);
            saveProducts(products); // Simpan dan render ulang

            message.textContent = `Produk No. ${noToDelete} telah dihapus.`;
            message.style.backgroundColor = '#fff3cd';
        }
    });

    // Inisialisasi daftar saat halaman admin dimuat
    renderList(loadProducts());
});
