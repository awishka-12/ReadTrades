

async function loadcategory(){
    try {
        const response = await fetch("api/loadproduct/category");

        if(response.ok){
            const data = await response.json();
            const select = document.getElementById("categoryFilter");

            select.innerHTML = `<option value="0">All Categories</option>`;

            data.category.forEach(cat => {
                const option = document.createElement("option");
                option.value = cat.id;
                option.textContent = cat.name;
                select.appendChild(option);
            });
        }

    } catch(e) {
        console.error(e);
    }
}

let currentPage=1;
const pagesize=8;

async function loadbook(page=1) {

    currentPage=page;

    const container = document.getElementById("booksContainer");

    const search = document.getElementById("searchInput").value.trim();
    const category = document.getElementById("categoryFilter").value;

    try {

        const response = await fetch(
            `api/loadindexproducts/load?search=${encodeURIComponent
            (search || "")}&category=${category || 0}&page=${page}&size=${pagesize}`
        );

        if (!response.ok) {
            throw Error(response.statusText);
        }

        const data = await response.json();


        if (data.status && data.data) {

            container.innerHTML = "";

            if (data.data.length === 0) {
                container.innerHTML = `
                    <div class="col-12 text-center py-5">
                        <h4>📖 No books found</h4>
                    </div>`;
                return;
            }

            data.data.forEach(book => {

                const isWatchlisted = watchlist.has(book.bookId);

                container.innerHTML += `
               <div class="col-md-4 col-lg-3">
                <div class="premium-book-card">
                    <div class="book-cover">
                        <img src="http://localhost:8080/ReadTrades/upload/products/${book.image}" alt="${book.title}">
                        <div class="shine-effect"></div>
                    </div>
                    <div class="card-body">
                        <h5 title="${book.title}">${book.title}</h5>
                        <div class="author">by ${book.author}</div>
                        <div class="price-condition">
                            <span class="price">Rs ${book.price}</span>
                            <span class="condition"><i class="fas fa-star me-1"></i>${book.condition}</span>
                        </div>
                        <div class="card-actions">
                            <button class="btn-buy-now" onclick="buyNow(${book.bookId})">
                                <i class="fas fa-bolt me-1"></i> Buy Now
                            </button>
                            <button class="btn-add-cart" onclick="addToCart('${book.title.replace(/'/g, "\\'")}', ${book.price},${book.bookId})">
                                <i class="fas fa-shopping-cart me-1"></i> Add to Cart
                            </button>
                        </div>
                        <button class="btn-watchlist-heart ${isWatchlisted ? 'active' : ''}" onclick="toggleWatchlist(${book.id}, '${book.title.replace(/'/g, "\\'")}', this)">
                            <i class="${isWatchlisted ? 'fas fa-heart' : 'far fa-heart'} me-1"></i> ${isWatchlisted ? 'Watchlisted' : 'Watchlist'}
                        </button>
                    </div>
                </div>
            </div>

           `

            });

            renderPageination(data.total);
        } else {
            container.innerHTML = `<p>No books found</p>`;
        }

    } catch (e) {
        console.error("ERROR:", e);
    }
}

function renderPageination(total){
    const container = document.getElementById("pagination");

    const totalPages = Math.ceil(total/pagesize);
    container.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        container.innerHTML += `
     <button onclick="loadbook(${i})"
     class="btn ${i===currentPage ? 'btn-primary' : 'btn-outline-primary'} m-1">
       ${i}
     </button>
    `;
    }



}



function buyNow(id) {

    window.location.href = `Single-Product-View.html?bookId=${id}`;
}

function toggleWatchlist(id, title, btn) {

    if(watchlist.has(id)){
        watchlist.delete(id);
        btn.classList.remove("active");
        btn.innerHTML = "🤍 Watchlist";
    } else {
        watchlist.add(id);
        btn.classList.add("active");
        btn.innerHTML = "❤️ Watchlisted";
    }
}


let watchlist = new Set();
let cartCount = 0;
let watchlistCo = 0;
let timeout;

window.addEventListener("load", () => {
    loadcategory();
    loadbook();
});

document.getElementById("searchBtn").addEventListener("click", loadbook(1));
document.getElementById("categoryFilter").addEventListener("change",()=> loadbook(1));

document.getElementById("searchInput").addEventListener("input", (e) => {

    clearTimeout(timeout);
    timeout = setTimeout(() => loadbook(1), 500);
});
