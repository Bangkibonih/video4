document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const productGrid = document.getElementById('dynamic-product-grid');

    // -----------------------------------------------------
    // A. FUNGSI MEMUAT & MENAMPILKAN DATA DARI ADMIN PANEL
    // -----------------------------------------------------
    const loadAndRenderProducts = () => {
        // 1. Ambil data dari localStorage (dari Admin Panel)
        const products = JSON.parse(localStorage.getItem('productData')) || [];
        productGrid.innerHTML = ''; // Kosongkan grid

        // 2. Urutkan berdasarkan Nomor dan buat elemen HTML
        products.sort((a, b) => a.no - b.no).forEach(product => {
            const productHtml = `
                <div class="product-item" data-product-number="${product.no}">
                    <a href="${product.link}" target="_blank" class="product-link">
                        <div class="product-number">${product.no}</div>
                        <img src="${product.image}" alt="Foto Produk ${product.no}" class="product-image-placeholder">
                        <div class="click-button">
                            <span class="button-text">KLIK DISINI</span>
                        </div>
                    </a>
                </div>
            `;
            // Menambahkan elemen ke grid
            productGrid.innerHTML += productHtml;
        });
        
        // 3. Kembalikan daftar item untuk digunakan oleh fungsi pencarian
        return document.querySelectorAll('.product-item');
    };

    // Muat dan tampilkan produk saat halaman dimuat
    let productItems = loadAndRenderProducts();


    // -----------------------------------------------------
    // B. FUNGSI PENCARIAN (Filtering) - LOGIKA TETAP SAMA
    // -----------------------------------------------------
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.trim().toLowerCase();
        
        // Ambil ulang daftar item (diperlukan karena item di-render secara dinamis)
        productItems = document.querySelectorAll('.product-item');

        productItems.forEach(item => {
            const productNumber = item.getAttribute('data-product-number');
            const isMatch = productNumber && productNumber.includes(searchTerm);

            if (searchTerm === '' || isMatch) {
                item.style.display = 'block'; 
            } else {
                item.style.display = 'none';
            }
        });
    });
});
