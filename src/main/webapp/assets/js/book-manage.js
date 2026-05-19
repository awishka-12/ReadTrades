
window.addEventListener("load",  ()=>{
   loadyear();
   loadcategory();
   loadAuthor();
   loadlanguage();
});




async function loadyear(){
    try {
        const response=await fetch("api/loadproduct/year");
        if(response.ok){
            const data = await response.json();
            const yearselect=document.getElementById("printYear");

            yearselect.innerHTML=`<option value="0">All Categorys</option>`;
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

async function loadlanguage(){
    try {
        const response=await fetch("api/loadproduct/languages");
        if(response.ok){
            const data = await response.json();
            const languagesselect=document.getElementById("language");

            languagesselect.innerHTML=`<option value="0">All languages</option>`;
            data.language.forEach((language)=>{
                const option=document.createElement("option");
                option.value=language.id;
                option.text=language.language;
                languagesselect.appendChild(option);
            });
        }else {
            Notiflix.Notify.failure("language loading fails", {
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

async function loadcategory(){
    try {
        const response=await fetch("api/loadproduct/category");
        if(response.ok){
            const data = await response.json();
            const categoryselect= document.getElementById("category");

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

async function loadAuthor(){

    try {

        const response = await fetch("api/loadproduct/author");
        if(response.ok){
            const data = await response.json();
            const authorselect=document.getElementById("author");

            authorselect.innerHTML=`<option value="0">All Categorys</option>`;
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


async function saveBook(){
    Notiflix.Loading.pulse("Wait...", {
        clickToClose: false,
        svgColor: '#0284c7'
    });

    let title=document.getElementById("title");
    let isbn=document.getElementById("isbn");
    let price=document.getElementById("price");
    let description = document.getElementById("description");
    let author=document.getElementById("author");
    let category=document.getElementById("category");
    let printYear=document.getElementById("printYear");
    let language=document.getElementById("language");
    let stockQuantity=document.getElementById("stockQuantity");

const productObj={
    title:title.value,
    isb_number:isbn.value,
    price:parseFloat(price.value),
    description:description.value,
    authorid:author.value,
    categoryid:category.value,
    printYearid:printYear.value,
    languageid:language.value,
    quantity:parseFloat(stockQuantity.value),
};

const formData = new FormData();
formData.append("product",JSON.stringify(productObj));

try {

    const response = await fetch("api/loadproduct/save-product", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productObj)
    });

if(response.ok){
             const data=await response.json();
       if(data.status){

           await uploadProductimage(data.productid);
        }else {
          Notiflix.Notify.failure(data.message, {
          position: 'center-top'
          });
    }
}else {
    Notiflix.Notify.failure("Product details adding failed!", {
        position: 'center-top'
    });
 }

   }catch (e) {
    Notiflix.Notify.failure(e.message, {
        position: 'center-top'
    });
}finally {
    Notiflix.Loading.remove();
}
}




async function uploadProductimage(productid){

let img=document.getElementById("bookCover");

    if (img.files.length === 0) {
        Notiflix.Notify.failure("Please select a book cover image!", {
            position: 'center-top'
        });
        return;
    }

    const formData = new FormData();
    formData.append("image", img.files[0]);

    try {
       const response=await fetch(`api/loadproduct/${productid}/upload-image`,{
           method: "POST",
         body: formData,
       });

       if(response.ok){
           const data=await response.json();
           console.log(data);
           console.log("Uploading for ID:", productid);

           if(!data.success){

               Notiflix.Report.success(
                   'SmartTrade',
                   data.message,
                   'Okay'
               );
           }else {
               Notiflix.Notify.failure(data.message, {
                   position: 'center-top'
               });
           }
       }else {
           Notiflix.Notify.failure("Image upload failed!", {
               position: 'center-top'
           });
       }
    }catch (e) {
        Notiflix.Notify.failure(e.message, {
            position: 'center-top'
        });
    }finally {
        Notiflix.Loading.remove();
    }


}



function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}


window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}



async function saveNewLanguage() {
    const Language = document.getElementById('newLanguageValue').value;

    const yeatObj={
        language: Language,
    }
    try {
        const response=await fetch("api/book/newLanguage",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(yeatObj),
        });
        if (response.ok) {
            const data = await response.json();
            if (data.status) {
                Notiflix.Report.success(
                    'ReadTrades',
                    data.message,
                    'Okay',
                    function (){
                        location.reload();
                    }
                );
            }else {
                Notiflix.Notify.failure(data.message);
            }
        }else {
            Notiflix.Notify.failure(data.message,{
                position:'center-top'
            });
        }

    }catch(e) {
        Notiflix.Notify.failure(e.message,{
            position:'center-top'
        });
    }finally {
        Notiflix.Loading.remove(1000);
    }

}

async function saveNewCategory() {
    const categoryname = document.getElementById("newCategoryName");


    const categorObj={
        category: categoryname.value,
    }
    try {
        const response=await fetch("api/book/newcategory", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categorObj),
        });

        if (response.ok) {
            const data = await response.json();
            if (data.status) {
                Notiflix.Report.success(
                    'ReadTrades',
                    data.message,
                    'Okay',
                    function (){
                        location.reload();
                    }
                );
            }else {
                Notiflix.Notify.failure(data.message);
            }
        }else {
            Notiflix.Notify.failure(data.message,{
                position:'center-top'
            });
        }
    }catch (e) {
        Notiflix.Notify.failure(e.message,{
            position:'center-top'
        });
    }finally {
        Notiflix.Loading.remove(1000);
    }

}

function previewBook() {
    // Get form values
    const title = document.getElementById('title').value || 'Book Title';
    const isbn = document.getElementById('isbn').value || 'N/A';
    const price = document.getElementById('price').value || '0.00';
    const description = document.getElementById('description').value || 'No description provided.';

    // Get selected options text
    const authorSelect = document.getElementById('author');
    const author = authorSelect.options[authorSelect.selectedIndex]?.text || 'Author';

    const categorySelect = document.getElementById('category');
    const category = categorySelect.options[categorySelect.selectedIndex]?.text || 'Category';

    const languageSelect = document.getElementById('language');
    const language = languageSelect.options[languageSelect.selectedIndex]?.text || 'Language';

    const yearSelect = document.getElementById('printYear');
    const year = yearSelect.options[yearSelect.selectedIndex]?.text || 'Year';

    // Update preview modal
    document.getElementById('previewTitle').textContent = title;
    document.getElementById('previewAuthor').textContent = `by ${author}`;
    document.getElementById('previewCategory').textContent = category;
    document.getElementById('previewLanguage').textContent = language;
    document.getElementById('previewYear').textContent = year;
    document.getElementById('previewISBN').textContent = isbn;
    document.getElementById('previewPrice').textContent = `$${parseFloat(price).toFixed(2)}`;
    document.getElementById('previewDescription').textContent = description;

    // Update tags in preview
    const tagsContainer = document.querySelector('.preview-tags .tags-container');
    tagsContainer.innerHTML = '';

    const tags = Array.from(document.querySelectorAll('.tag')).map(tag =>
        tag.textContent.replace('×', '').trim()
    );

    tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'tag';
        tagSpan.textContent = tag;
        tagsContainer.appendChild(tagSpan);
    });

    // Show preview modal
    openModal('previewModal');
}

async function saveNewAuthor() {



    const name = document.getElementById("newAuthorName");
    const bio = document.getElementById("newAuthorBio");


    const autherObj={
     name: name.value,
        bio: bio.value
    }

    try {
        const response=await fetch("api/book/newauther",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(autherObj),
        });

        if(response.ok){
            const data=await response.json();
            if(data.status){
                Notiflix.Report.success(
                    'ReadTrades',
                    data.message,
                    'Okay',
                    function (){
                        location.reload();
                    }
                );
            }else {
                Notiflix.Notify.failure(data.message);
            }

        }else {
            Notiflix.Notify.failure(data.message,{
                position:'center-top'
            });
        }
    }catch (e) {
        Notiflix.Notify.failure(e.message,{
            position:'center-top'
        });
    }finally {
        Notiflix.Loading.remove(1000);
    }
}

