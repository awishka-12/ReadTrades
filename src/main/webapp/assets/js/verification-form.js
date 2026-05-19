let params=new URLSearchParams(location.search);
console.log(params.get("email"));
console.log(params.get("code"));
const verificationCode =document.getElementById("code");
verificationCode.value = params.get("code");
const useremail = params.get("email");

async function verifyAccount() {

    Notiflix.Loading.pulse("Wait...", {
        clickToClose: false,
        svgColor: '#0284c7'
    });

        const verifyObj={
        email:useremail,
        verificationCode:verificationCode.value
       }
   try {
     const response = await fetch("api/verificationAccount", {

      method: "POST",
      headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(verifyObj)
    });

    if (response.ok) {
    const data = await response.json();
     if (data.status) {
    Notiflix.Loading.remove();
    Notiflix.Report.success(
        'Smarttrade',
        data.message,
        'Okay');
}else {
    Notiflix.Notify.failure(data.message);
}

}else {
    Notiflix.Notify.failure("Verification process failed!");
}

}catch (e) {
    Notiflix.Notify.failure(e || "server error " );
}finally {
    Notiflix.Loading.remove(1000);
}

}