document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Ambil elemen kolom pencarian
    const searchInput = document.querySelector('.search-input');
    
    // 2. Ambil SEMUA item produk
    const productItems = document.querySelectorAll('.product-item');

    // 3. Dengarkan event 'input' (berubah setiap kali ada ketikan)
    searchInput.addEventListener('input', function(e) {
        // Ambil nilai input, hapus spasi di awal/akhir (trim), dan ubah ke huruf kecil
        const searchTerm = e.target.value.trim().toLowerCase();

        // 4. Ulangi semua item produk
        productItems.forEach(item => {
            // 🔥 SOLUSI: Ambil NOMOR PRODUK dari atribut data-product-number
            const productNumber = item.getAttribute('data-product-number');
            
            // Cek apakah nomor produk mengandung kata kunci yang diketik
            // Contoh: Mencari '2' akan menampilkan 2, 12, 20, 25, dll.
            const isMatch = productNumber && productNumber.includes(searchTerm);

            // 5. Tampilkan/Sembunyikan Item
            // Jika kolom pencarian kosong ATAU ada kecocokan, tampilkan item
            if (searchTerm === '' || isMatch) {
                // Tampilkan item
                item.style.display = 'block'; 
            } else {
                // Sembunyikan item
                item.style.display = 'none';
            }
        });
    });
});
