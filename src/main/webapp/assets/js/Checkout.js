window.addEventListener("load", async () => {
loadCity();
loadCheckoutData();

});



async function loadCheckoutData() {
try {

    const response = await fetch("api/checkout/checkout-data");
    if (response.ok) {
const data = await response.json();
console.log(data);
if(data.status){
 filluserAdrress(data.userPrimaryAddress);
 summeryCheckout(data.userCart ,data.userDeliveryType);

}
    }
}catch (e) {
    Notiflix.Notify.failure(e.message, {
        position: 'center-top'
    });
}
}

async function summeryCheckout(cartlist,deliveryType) {

    let subtotal=0;

    cartlist.forEach((item) => {
        let totalitem=item.price * item.quantity;
        subtotal+=totalitem;
    });

    document.getElementById("st-product-total-amount").textContent
        = subtotal.toFixed(2);

    const cityselect=document.getElementById("city-select");
    cityselect.addEventListener("change", () => {

        if(cityselect=== -1)return;

       const option=cityselect.options[cityselect.selectedIndex];
       if(!option)return;

       let selectCity=option.text;

        let shipping=0;
        if(!deliveryType || deliveryType.length===0)return;

        let Colombo=deliveryType.find(d=>d.type==="WITHIN_CITY");
        let other=deliveryType.find(d=>d.type==="OUTSTATION");

        if (selectCity === "Colombo"){
           shipping=Colombo ?.price ||0;
        }else {
            shipping=other ?.price || 0;
        }

        document.getElementById("st-product-shipping-charges").textContent
            =shipping.toFixed(2);

        let total=subtotal+shipping;

        document.getElementById("st-order-total-amount").textContent
            =total.toFixed(2);
    })
}

function filluserAdrress(address) {

    let sameAddress=document.getElementById("sameAddressCheckbox");
    sameAddress.addEventListener("change", function() {
        let firstname=document.getElementById("first-name");
        let lastname=document.getElementById("last-name");
        let city=document.getElementById("city-select");
        let lineone=document.getElementById("line-one");
        let linetwo=document.getElementById("line-two");
        let postcode=document.getElementById("postal-code");
        let mobile=document.getElementById("mobile");
        if (sameAddress.checked){

            document.getElementById("first-name").value = address.firstname;
            document.getElementById("last-name").value = address.lastname;
            document.getElementById("city-select").value = address.city;
            document.getElementById("line-one").value = address.line_one;
            document.getElementById("line-two").value = address.line_two;
            document.getElementById("postal-code").value = address.postcode;
            document.getElementById("mobile").value = address.mobile;
            city.dispatchEvent(new Event("change"));

        }else {
            document.getElementById("first-name").value = "";
            document.getElementById("last-name").value = "";
            document.getElementById("city-select").value = "0";
            document.getElementById("line-one").value = "";
            document.getElementById("line-two").value = "";
            document.getElementById("postal-code").value = "";
            document.getElementById("mobile").value = "";

            city.dispatchEvent(new Event('change'));

        }
    })
}


async function checkout() {

let firstname=document.getElementById("first-name");
let lastname=document.getElementById("last-name");
let city=document.getElementById("city-select");
let lineone=document.getElementById("line-one");
let linetwo=document.getElementById("line-two");
let postcode=document.getElementById("postal-code");
let mobile=document.getElementById("mobile");
let sameAddress=document.getElementById("sameAddressCheckbox");

const checkoutData={
    firstName:firstname.value,
    lastName:lastname.value,
    cityId:city.value,
    lineOne: lineone.value,
    lineTwo:linetwo.value,
    postalCode:postcode.value,
    mobile:mobile.value,
    isCurrentAddress:sameAddress.checked,
}
const checkoutDataJson=JSON.stringify(checkoutData);
try {
    const response=await fetch("api/checkout/user-checkout",{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: checkoutDataJson,

    })
    if (response.ok){
const data=await response.json();
if(data.status){
payhere.startPayment(data.paymetDeatils);

    delete data.paymetDeatils.iframe;
    console.log(data.paymetDeatils);
    console.log(data.paymetDeatils.hash);
    console.log(data.paymetDeatils.order_id);
    console.log(data.paymetDeatils.sandbox);
    console.log(JSON.stringify(data.paymetDeatils,null,2));
}else {
    Notiflix.Notify.failure(data.message, {
        position: 'center-top'
    });
}
    }else {
        Notiflix.Notify.failure("Checkout process failed!", {
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

// Payment completed. It can be a successful failure.
payhere.onCompleted = async function onCompleted(orderId) {
    console.log("Payment completed. OrderID:" + orderId);
    // Note: validate the payment and show success or failure page to the customer
    await verifyOrder(orderId);
};

// Payment window closed
payhere.onDismissed = function onDismissed() {
    // Note: Prompt user to pay again or show an error page
    console.log("Payment dismissed");
};

// Error occurred
payhere.onError = function onError(error) {
    // Note: show an error page
    console.log("Error:" + error);
};

async function verifyOrder(orderId) {
try {
    const response = await fetch(`/api/orders/verify?orderId=${orderId}`)
    
}catch (e) {
    
}
}

async function loadCity(){

    try {

        const response = await fetch("api/profiles/city");
        if (response.ok) {

            const data = await response.json();
            const  citySelect=document.getElementById("city-select");

            data.city.forEach((city) => {
                const option = document.createElement("option");
                option.value = city.id;
                option.textContent = city.name;
                citySelect.appendChild(option);
            });


        }else {
            Notiflix.Notify.failure("City loading fails", {
                position: 'center-top'
            });
        }

    }catch(e){
        Notiflix.Notify.failure(e.message, {
            position: 'center-top'
        });
    }
}
