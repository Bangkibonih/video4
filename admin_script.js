document.addEventListener('DOMContentLoaded', () => {
    // Cek apakah inisialisasi Firebase berhasil dari index.html
    if (typeof db === 'undefined') {
        console.error("Firebase is not initialized. Check index.html configuration.");
        return;
    }
    
    const form = document.getElementById('product-form');
    const listPreview = document.getElementById('product-list-preview');
    const message = document.getElementById('message');

    // --- FUNGSI UTAMA FIREBASE UNTUK ADMIN ---

    // Mencari ID dokumen di Firestore berdasarkan nomor produk
    const getDocIdByProductNo = async (productNo) => {
        const snapshot = await productsCollection.where('no', '==', productNo).get();
        return snapshot.empty ? null : snapshot.docs[0].id;
    }

    // Menyimpan produk baru ke Firestore
    const saveProduct = async (product) => {
        // Menggunakan .add() untuk membuat ID unik otomatis oleh Firebase
        await productsCollection.add(product);
    };

    // Menghapus produk dari Firestore
    const deleteProduct = async (productNo) => {
        const docId = await getDocIdByProductNo(productNo);
        if (docId) {
            await productsCollection.doc(docId).delete();
        }
    };
    
    // Menampilkan daftar produk di Admin Panel (Preview)
    const renderList = (products) => {
        listPreview.innerHTML = '';
        if (products.length === 0) {
            listPreview.innerHTML = '<p>Belum ada produk ditambahkan.</p>';
            return;
        }

        products.sort((a, b) => a.no - b.no).forEach((product) => {
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
    
    // --- EVENT LISTENERS ---
    
    // Handler saat tombol 'Tambah Produk' diklik
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const no = parseInt(document.getElementById('productNo').value);
        const link = document.getElementById('productLink').value;
        const image = document.getElementById('productImage').value;

        // Cek duplikasi nomor produk
        const existingDocId = await getDocIdByProductNo(no);
        if (existingDocId) {
            message.textContent = 'Gagal: Nomor produk sudah digunakan. Harap gunakan nomor unik.';
            message.style.backgroundColor = '#f8d7da';
            return;
        }

        try {
            await saveProduct({ no, link, image });
            message.textContent = `Berhasil! Produk No. ${no} telah ditambahkan ke Firebase.`;
            message.style.backgroundColor = '#d4edda';
            form.reset(); 
        } catch (error) {
            message.textContent = `Error menyimpan: ${error.message}`;
            message.style.backgroundColor = '#f8d7da';
        }
    });

    // Handler saat tombol 'Hapus' diklik
    listPreview.addEventListener('click', async (e) => {
        if (e.target.tagName === 'BUTTON') {
            const noToDelete = parseInt(e.target.dataset.no);
            try {
                await deleteProduct(noToDelete);
                message.textContent = `Produk No. ${noToDelete} telah dihapus dari Firebase.`;
                message.style.backgroundColor = '#fff3cd';
            } catch (error) {
                message.textContent = `Error menghapus: ${error.message}`;
                message.style.backgroundColor = '#f8d7da';
            }
        }
    });

    // MEMUAT DATA SECARA REALTIME (Untuk Preview Admin)
    // Setiap kali data di Firebase berubah, fungsi ini akan menjalankannya
    productsCollection.onSnapshot(snapshot => {
        const products = snapshot.docs.map(doc => doc.data());
        renderList(products);
    });
});
