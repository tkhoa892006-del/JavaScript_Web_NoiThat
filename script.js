document.addEventListener('DOMContentLoaded', function() {
    
    // i. dữ liệu giả lập
    
    // danh mục dropdown
    const furnitureCategories = [
        { name: 'Chairs & Seating', link: '#chairs' },
        { name: 'Tables & Desks', link: '#tables' },
        { name: 'Sofas & Couches', link: '#sofas' },
        { name: 'Storage & Shelves', link: '#storage' },
        { name: 'Decor & Lighting', link: '#decor' }
    ];

    // sản phẩm (lọc/tìm kiếm)
    const mockProducts = [
        { id: 1, name: "Ergonomic Office Chair", category: "Chairs & Seating", price: 150.00, image: "office_chair.jpg" },
        { id: 2, name: "Modern Dining Table", category: "Tables & Desks", price: 450.50, image: "dining_table.jpg" },
        { id: 3, name: "Velvet Sofa Bed", category: "Sofas & Couches", price: 700.00, image: "sofa_bed.jpg" },
        { id: 4, name: "Minimalist Wooden Chair", category: "Chairs & Seating", price: 85.99, image: "wooden_chair.jpg" },
        { id: 5, name: "Glass Coffee Table", category: "Tables & Desks", price: 220.75, image: "coffee_table.jpg" },
        { id: 6, name: "Sectional Couch", category: "Sofas & Couches", price: 1200.00, image: "sectional_couch.jpg" },
        { id: 7, name: "Bookshelf Storage Unit", category: "Storage & Shelves", price: 180.00, image: "bookshelf.jpg" },
        { id: 8, name: "Accent Chair", category: "Chairs & Seating", price: 95.00, image: "accent_chair.jpg" },
    ];

    // ii. khởi tạo dropdown
    
    const productsDropdownMenu = document.getElementById('productsDropdownMenu');

    if (productsDropdownMenu) {
        productsDropdownMenu.innerHTML = ''; 
        furnitureCategories.forEach(category => {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.className = 'dropdown-item';
            anchor.href = category.link;
            anchor.textContent = category.name;
            listItem.appendChild(anchor);
            productsDropdownMenu.appendChild(listItem);
        });
    }

    // iii. chức năng tìm kiếm
    const searchInput = document.querySelector('input[type="search"]');
    const resultsArea = document.getElementById('searchResultsArea');

    // hàm tạo html card
    function createProductCard(product) {
        // ảnh placeholder
        const imageUrl = `https://picsum.photos/400/300?random=${product.id}`; 
        
        return `
            <div class="col-md-3 col-sm-6 mb-4">
                <div class="card h-100 shadow-sm border-0">
                    <img src="${imageUrl}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <small class="text-muted d-block mb-1">${product.category}</small>
                        <h6 class="card-title fw-bold">${product.name}</h6>
                        <p class="card-text fw-bold text-danger fs-5">$${product.price.toFixed(2)}</p>
                        <a href="#" class="btn btn-sm btn-outline-dark w-100">view details</a>
                    </div>
                </div>
            </div>
        `;
    }

    // hàm hiển thị kết quả
    function displayResults(products, query) {
        if (!resultsArea) return;

        resultsArea.innerHTML = '';
        
        if (products.length === 0) {
            resultsArea.innerHTML = `
                <div class="text-center py-5">
                    <p class="fs-5 text-muted">không tìm thấy sản phẩm nào khớp với từ khóa: <strong>"${query}"</strong>.</p>
                </div>
            `;
            return;
        }

        const resultHeader = document.createElement('div');
        resultHeader.className = 'text-center mb-4';
        resultHeader.innerHTML = `<h2 class="fw-bold">kết quả tìm kiếm cho: "${query}"</h2>`;
        resultsArea.appendChild(resultHeader);


        const row = document.createElement('div');
        row.className = 'row justify-content-center';

        products.forEach(product => {
            row.innerHTML += createProductCard(product);
        });

        resultsArea.appendChild(row);
    }
    
    // xử lý tìm kiếm
    if (searchInput) {
        // form tìm kiếm
        const searchForm = searchInput.closest('form'); 

        searchForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            const query = searchInput.value.trim().toLowerCase();

            if (query === '') {
                resultsArea.innerHTML = `<p class="text-center text-muted">vui lòng nhập từ khóa để tìm kiếm (ví dụ: chair, table).</p>`;
                return;
            }

            // lọc sản phẩm
            const filteredProducts = mockProducts.filter(product => 
                product.name.toLowerCase().includes(query) || 
                product.category.toLowerCase().includes(query)
            );

            // hiển thị kết quả
            displayResults(filteredProducts, query);
            
            // searchInput.value = ''; // tùy chọn
        });
    }
    // iv. hiệu ứng cuộn (scroll animation)

    const scrollElements = document.querySelectorAll(".js-scroll");

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        // check 80% khung nhìn
        return (
            elementTop <= 
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        // thêm class 'scrolled'
        element.classList.add("scrolled"); 
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            // kích hoạt animation
            if (elementInView(el, 1.25)) { 
                displayScrollElement(el);
            }
        });
    };

    // 1. chạy animation lúc tải
    handleScrollAnimation(); 

    // 2. lắng nghe sự kiện cuộn
    window.addEventListener("scroll", () => {
        handleScrollAnimation();
    });

    // tương tác hover nút

    // hiệu ứng hover cho nút 'buy online'
    const buyButton = document.querySelector('.navbar .btn');
    if (buyButton) {
        buyButton.addEventListener('mouseenter', () => {
            // chuyển động nhẹ
            buyButton.style.transform = 'translateY(-2px)';
            buyButton.style.boxShadow = '0 4px 10px rgba(255, 140, 0, 0.4)';
        });
        buyButton.addEventListener('mouseleave', () => {
            // về trạng thái ban đầu
            buyButton.style.transform = 'translateY(0)';
            buyButton.style.boxShadow = 'none';
        });
    }
});