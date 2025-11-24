document.addEventListener('DOMContentLoaded', function() {
    // 1. Ambil elemen yang diperlukan
    const searchInput = document.querySelector('.search-input');
    const productGrid = document.getElementById('dynamic-product-grid');

    // -----------------------------------------------------
    // A. FUNGSI MEMUAT & MENAMPILKAN DATA DARI ADMIN PANEL
    // -----------------------------------------------------
    const loadAndRenderProducts = () => {
        const products = JSON.parse(localStorage.getItem('productData')) || [];
        productGrid.innerHTML = ''; 

        // Urutkan berdasarkan Nomor dan buat elemen HTML
        products.sort((a, b) => a.no - b.no).forEach(product => {
            // PASTIKAN SEMUA VARIABEL (product.link, product.image) ADA
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
            productGrid.innerHTML += productHtml;
        });
        
        // Kembalikan daftar item untuk digunakan oleh fungsi pencarian
        return document.querySelectorAll('.product-item');
    };

    // Muat dan tampilkan produk saat halaman dimuat
    let productItems = loadAndRenderProducts();


    // -----------------------------------------------------
    // B. FUNGSI PENCARIAN (Filtering)
    // -----------------------------------------------------
    // Pastikan searchInput ada sebelum ditambahkan event listener
    if (searchInput) { 
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.trim().toLowerCase();
            
            // Ambil ulang daftar item
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
    }
});
