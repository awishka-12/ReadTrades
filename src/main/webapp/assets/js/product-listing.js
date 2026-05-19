
let currentpage=0;
const size=5;

async function loadProducts(page=0) {


    currentpage=page;
    const tbody = document.getElementById("product-listing-tbody");

    const category=document.getElementById("filterCategory").value;
    const author=document.getElementById("filterAuthor").value;
    const year=document.getElementById("filterYear").value;

    try {
        const response = await fetch(`api/loadproduct/get-products?page=${page}&size=${size}&category=${category}&author=${author}&year=${year}`, {});

        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }

        const data = await response.json();
        console.log(data);
        if (data.status) {

            tbody.innerHTML = "";

            data.data.forEach(product => {

                tbody.innerHTML += `
                <tr>
                    <td><input type="checkbox"></td>
                    <td>
                        <div class="book-info">
                        
                            <div>
                                <strong>${product.title}</strong>
                                <small>Year: ${product.year}</small>
                            </div>
                        </div>
                    </td>

                    <td>${product.author}</td>
                    <td>${product.category}</td>
                    <td>${product.isb_number}</td>
                    <td>$${product.price}</td>

                    <td>
                        <span class="${getStockClass(product.quantity)}">
                            ${product.quantity}
                        </span>
                    </td>

                    <td>${product.language}</td>
                    
                    <td>
                        <div class="action-buttons">
                            <button class="btn-icon" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon" title="View">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-icon btn-danger" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                
                 
                `;
            });

            renderPagination(data.total, data.page, data.size);
        } else {
            alert(data.message);
        }

    } catch (e) {
        console.error("ERROR:", e);
    }
}


function renderPagination(total, page, size) {

    const totalPages = Math.ceil(total / size);

    const pageNumbersDiv = document.querySelector(".page-numbers");
    const pageInfo = document.querySelector(".page-info");

    pageNumbersDiv.innerHTML = "";

    for (let i = 0; i < totalPages; i++) {

        const span = document.createElement("span");
        span.innerText = i + 1;

        if (i === page) {
            span.classList.add("page-active");
        }

        span.onclick = () => loadProducts(i);

        pageNumbersDiv.appendChild(span);
    }

    // Previous button
    const prevBtn = document.querySelector(".btn-pagination:first-child");
    prevBtn.disabled = page === 0;
    prevBtn.onclick = () => {
        if (page > 0) loadProducts(page - 1);
    };

    // Next button
    const nextBtn = document.querySelector(".btn-pagination:last-child");
    nextBtn.disabled = page >= totalPages - 1;
    nextBtn.onclick = () => {
        if (page < totalPages - 1) loadProducts(page + 1);
    };

    const start = page * size + 1;
    const end = Math.min((page + 1) * size, total);

    pageInfo.innerText = `Showing ${start}-${end} of ${total} books`;
}


function getStockClass(qty) {
    if (qty > 20) return "high";
    if (qty > 10) return "medium";
    return "low";
}

window.addEventListener("load", () => {
    loadProducts(0);
    loadyear();
    loadcategory();
    loadAuthor();
})

async function loadyear(){
    try {
        const response=await fetch("api/loadproduct/year");
        if(response.ok){
            const data = await response.json();
            const yearselect=document.getElementById("filterYear");

            yearselect.innerHTML=` <option value="0">All Years</option>`;
            data.year.forEach((year) => {
                const  option=document.createElement("option");
                option.value=year.id;
                option.text=year.year;
                yearselect.appendChild(option);

            });

        }else {
            Notiflix.Notify.failure("year loading fails", {
                position: 'center-top'
            });
        }

    }catch (e) {
        console.log(e);
        Notiflix.Notify.failure(e.message, {
            position: 'center-top'
        });
    }
}





async function loadAuthor(){

    try {

        const response = await fetch("api/loadproduct/author");
        if(response.ok){
            const data = await response.json();
            const authorselect=document.getElementById("filterAuthor");

            authorselect.innerHTML = `<option value="0">All Authors</option>`;
            data.author.forEach((author)=>{
                const option=document.createElement("option");
                option.value=author.id;
                option.textContent=author.name;
                authorselect.appendChild(option);
            });
        }else {
            Notiflix.Notify.failure("author loading fails", {
                position: 'center-top'
            });

        }

    }catch (e) {
        Notiflix.Notify.failure(e.message, {
            position: 'center-top'
        });

    }
}

async function loadcategory(){
    try {
        const response=await fetch("api/loadproduct/category");
        if(response.ok){
            const data = await response.json();
            const categoryselect= document.getElementById("filterCategory");

            categoryselect.innerHTML=`<option value="0">All Categorys</option>`;
            data.category.forEach((category) => {
                const option = document.createElement("option");
                option.value = category.id;
                option.textContent = category.name;
                categoryselect.appendChild(option);
            });
        }else {
            Notiflix.Notify.failure("category loading fails", {
                position: 'center-top'
            });
        }

    }catch(e) {
        console.log(e);
        Notiflix.Notify.failure(e.message, {
            position: 'center-top'
        });
    }
}