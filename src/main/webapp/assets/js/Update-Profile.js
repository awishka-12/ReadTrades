
document.addEventListener("DOMContentLoaded",function(){

    fetch("api/profiles/profiledetails")
    .then(response => response.json())
     .then(data => {


         if(!data.status){
             Notiflix.Notify.failure(data.message);
             return;
         }else {

            document.getElementById("firstName").value = data.firstName;
            document.getElementById("lastName").value = data.lastName;
            document.getElementById("email").value = data.email;


         }


         const created_at=new Date(data.created_at);

         const formatted_date= created_at.toLocaleDateString('si-LK',{
             year: 'numeric',
             month: 'long',
             day: 'numeric',
         });


         document.querySelector("memberSince").innerHTML=
             `  <i class="far fa-calendar-alt"></i>member-since  ${formatted_date}`;

         console.log(formatted_date);

     })
    .catch(error => {
        console.log(error);
    });

addressDeatails();

});

async function addressDeatails(){
    fetch("api/profiles/Addressdetails")
        .then(response => response.json())
        .then(data => {
            if(!data.status){
                Notiflix.Notify.failure(data.message);
                return;
            }else {

                document.getElementById("addressLineOne").value=data.lineone;
                document.getElementById("addressLineTwo").value=data.linetwo;
                document.getElementById("mobile").value=data.mobile;
                document.getElementById("postalCode").value=data.postalCode;
            }
        })
}



async function loadCity(){

    try {

const response = await fetch("api/profiles/city");
if (response.ok) {

const data = await response.json();
const  citySelect=document.getElementById("city");

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


async function updateAddress(){

    const lineone=document.getElementById("addressLineOne");
    const linetwo=document.getElementById("addressLineTwo");
    const mobile=document.getElementById("mobile");
   const city=document.getElementById("city");
   const postalCode=document.getElementById("postalCode");

   const AdressObj={
       lineone:lineone.value,
       linetwo:linetwo.value,
       mobile:mobile.value,
       cityId:city.value,
       postalCode:postalCode.value

   }
    console.log("User OBJECT 👉", AdressObj);
   try {
       const response = await fetch("api/profiles/updateAddress", {
           method: "POST",
           headers: {
           "Content-Type": "application/json"
           },
        body: JSON.stringify(AdressObj),
       })
       if (response.ok) {

           const data = await response.json();
           console.log(data.message)
           if(data.status){
               Notiflix.Notify.success(data.message);
           }else {
               Notiflix.Notify.failure(data.message);
           }
       }else {
           Notiflix.Notify.failure("Address update failed");
       }

   }catch(e){
       Notiflix.Notify.failure(e.message);
   }

}



async function updateProfile(){
    const firstName=document.getElementById("firstName");
    const lastName=document.getElementById("lastName");

const userObj={
    firstName:firstName.value,
    lastName:lastName.value,
}
    try {
     const response = await fetch("api/profiles/Name", {
         method: "PUT",
         headers:{
             "Content-Type": "application/json"
         },
         body: JSON.stringify(userObj)
     });

     if (response.ok) {

         const data = await response.json();
         if(data.status){
             Notiflix.Notify.success(data.message);

         }
     }else {
         Notiflix.Notify.failure("Name update failed");
     }

    }catch(e){
        Notiflix.Notify.failure(e.message, {
            position: 'center-top'
        });
    }

}


async function changePassword(){

    const  currentPswd=document.getElementById("currentPassword");
    const newPswd=document.getElementById("newPassword");
    const confirmPswd=document.getElementById("confirmPassword");

    const passwordObj={
        password:currentPswd.value,
        newPassword:newPswd.value,
        confirmPassword:confirmPswd.value,
    }
    console.log("User Address 👉",passwordObj);

    try {
        const response = await fetch("api/profiles/changePassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(passwordObj)

        });
        if (response.ok) {
            const data = await response.json();
            if(data.status){
                Notiflix.Notify.success(data.message);
            }else {
                Notiflix.Notify.failure(data.message);
            }

        }else {
            Notiflix.Notify.failure("Password update failed");
        }

    }catch (e) {

        Notiflix.Notify.failure(e.message, {
            position: 'center-top'
        });
    }
}