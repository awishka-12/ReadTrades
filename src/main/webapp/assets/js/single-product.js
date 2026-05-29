const parms=new URLSearchParams(window.location.search);
const bookid=parms.get("bookId");

window.addEventListener("load", async () => {
try {



    Notiflix.Loading.pulse("Wait...", {
        clickToClose: false,
        svgColor: '#0284c7'
    });
    await loadsingleBook(bookid);

}finally {
    Notiflix.Loading.remove();
}
});

async function loadsingleBook(bookId){

    try {

const response = await fetch("api/single-products/product?bookId="+bookId);
if (!response.ok) {

throw new Error("server error");
}

const json = await response.json();
if(!json.status){
    alert(json.message);
    return;
}
const book = json.products;
console.log(book);



const containe =document.getElementById("product-data")
        containe.innerHTML="";

containe.innerHTML+=`

<section class="product-main" id="product-data">
    <div class="container">
        <div class="product-grid">
            <!-- Left Column: Book Image -->
            <div class="product-image" >
                <div class="main-image">
                    <img src="http://localhost:8080/ReadTrades/upload/products/${book.images}" alt="The Great Adventure book cover">
                </div>
            </div>

            <!-- Right Column: Book Details -->
            <div class="product-details" >
                <h1 class="book-title">${book.title}</h1>
                <div class="book-meta">
                    <p class="author"><i class="fas fa-user-pen"></i> By <span>${book.name}</span></p>
                    <p class="category"><i class="fas fa-tag"></i> Category: <span>${book.category}</span></p>
                    <p class="language"><i class="fas fa-globe"></i> Language: <span>${book.language}</span></p>
                    <p class="stock in-stock"><i class="fas fa-check-circle"></i> Availability: <span>In Stock</span></p>
                </div>
                <div class="book-price">
                    <span class="price">Rs. ${book.price}</span>
                </div>

              
                <div class="product-actions">
                 
                  
                   <button
               class="btn btn-secondary buy-now"

                   onclick="addToCart(
               '${book.title.replace(/'/g, "\\'")}',
               ${book.price},
                 bookid
              )">

            <i class="fas fa-bolt"></i>
             Buy Now

         </button>

                    <button class="btn btn-small buy-now"><i class="fas fa-bolt"></i> wishlist</button>
                </div>
                <div class="additional-info">
                    <p><i class="fas fa-truck"></i> Free shipping on orders over Rs. 5000</p>
                    <p><i class="fas fa-undo-alt"></i> 7-day easy returns</p>
                </div>
            </div>
        </div>
    </div>
</section>

`
        const  stock=document.querySelector(".stock span")

if(book.quantity > 0){
stock.innerHTML="In Stock";
}else {
    stock.innerHTML="Out Of Stock";
}

const discontaine=document.getElementById("book-description")
        discontaine.innerHTML=""
        discontaine.innerHTML+=`
        
        <section class="book-description" id="book-description">
    <div class="container">
        <h2 class="section-title">Book Description</h2>
        <div class="description-content">
            <p>
               ${book.description}
            </p>
            
            
        </div>
    </div>
</section>
        `
    }catch (e) {
        console.error(e);
        alert("Failed to load product");
    }
}



