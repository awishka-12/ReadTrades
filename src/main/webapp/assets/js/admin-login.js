async function adminSignIn(){

    const email =
        document.getElementById("email");

    const password =
        document.getElementById("password");

    const adminObj = {

        email: email.value,
        password: password.value
    };

    try{

        const response = await fetch(
            "api/admin/admin-login",
            {
                method:"POST",

                headers:{
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(
                    adminObj
                )
            }
        );

        const data =
            await response.json();

        if(data.status){

            Notiflix.Report.success(
                "ReadTrades",
                data.message,
                "Okay",

                () => {

                    window.location =
                        "admin/dashboard.html";
                }
            );

        }else{

            Notiflix.Notify.failure(
                data.message
            );
        }

    }catch(e){

        console.log(e);
    }
}