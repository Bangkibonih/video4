document.addEventListener('DOMContentLoaded', function() {
    
    // Ambil elemen kolom pencarian
    const searchInput = document.querySelector('.search-input');
    
    // Ambil SEMUA item produk
    const productItems = document.querySelectorAll('.product-item');

    // Dengarkan event 'input' (ketika teks di kolom pencarian berubah)
    searchInput.addEventListener('input', function(e) {
        // Ambil nilai input dan ubah ke huruf kecil
        const searchTerm = e.target.value.toLowerCase();

        // Ulangi semua item produk
        productItems.forEach(item => {
            // Ambil nama produk dan kode produk (diubah ke huruf kecil)
            const productName = item.querySelector('.product-name').textContent.toLowerCase();
            const productCode = item.querySelector('.product-code').textContent.toLowerCase();

            // Cek apakah ada kecocokan (match) dengan kata kunci
            const isMatch = productName.includes(searchTerm) || productCode.includes(searchTerm);

            // Tampilkan/Sembunyikan Item
            if (isMatch) {
                // Tampilkan item (menggunakan 'block' karena grid akan menyesuaikan)
                item.style.display = 'block'; 
            } else {
                // Sembunyikan item
                item.style.display = 'none';
            }
        });
        
        // Catatan: Anda mungkin perlu menambahkan logika untuk mengatur ulang tata letak grid 
        // setelah elemen disembunyikan. CSS Grid (seperti yang kita gunakan) akan menanganinya secara otomatis.
    });
    
    // --- (Di sini Anda bisa menambahkan kode untuk Tab Navigasi) ---
    // ...
});
