document.addEventListener('DOMContentLoaded', function() {
    // Cek apakah inisialisasi Firebase berhasil dari index.html
    if (typeof productsCollection === 'undefined') {
        console.error("Firebase is not initialized. Dynamic rendering disabled.");
        return; 
    }

    const searchInput = document.querySelector('.search-input');
    const productGrid = document.getElementById('dynamic-product-grid');
    let productItems = []; // Untuk menyimpan elemen produk untuk pencarian

    // -----------------------------------------------------
    // A. FUNGSI MENAMPILKAN DATA DARI FIREBASE
    // -----------------------------------------------------
    const renderProducts = (products) => {
        productGrid.innerHTML = ''; 
        
        // Urutkan berdasarkan nomor produk
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
            productGrid.innerHTML += productHtml;
        });

        // Update list of product items for search function
        productItems = document.querySelectorAll('.product-item');
    };

    // -----------------------------------------------------
    // B. MENDENGARKAN PERUBAHAN DATA (REALTIME LISTENER)
    // -----------------------------------------------------
    // Ini adalah inti dari Firebase: setiap ada perubahan, data langsung dimuat ulang
    productsCollection.onSnapshot(snapshot => {
        const products = snapshot.docs.map(doc => doc.data());
        renderProducts(products);
    });


    // -----------------------------------------------------
    // C. FUNGSI PENCARIAN (Filtering)
    // -----------------------------------------------------
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.trim().toLowerCase();
            
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
