const inp =  document.querySelector("#email");
const submit = document.querySelector("#btn");
const result = document.querySelector(".result");
const result_head = document.querySelector(".head");
const result_detail = document.querySelector(".details")
let email = '';
const key = `ema_live_MF7lhNgXaCpnnwLWvaRzCDWMueSZv6uNtdEMdBrk`;
async function validate(){
    email = inp.value;
    inp.value = "";
    const url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`;
    console.log("loading...");
    document.querySelector(".loader").classList.toggle("not-vis");

    const response = await fetch(url);
    const data = await response.json();
    console.log("loaded...");
    document.querySelector(".loader").classList.toggle("not-vis");
    //console.log(JSON.stringify(data));
    //result.innerHTML = JSON.stringify(data);
    console.log(data.message);
         const msg = data.message;
      if(msg === 'Validation error'){
        result_head.innerHTML = `<h3>${msg}</h3><p>${data.errors.email}</p>`
    }
    else{
        result_head.innerHTML = `<h3>${data.state.charAt(0).toUpperCase()+data.state.slice(1)}</h3>`;
        result_detail.innerHTML =  `<h4>Email: ${data.email}</h4>
                            <h4>User: ${data.user}</h4>
                            <h4>Domain: ${data.domain}</h4>
                            <h4>Score: ${data.score}</h4>
                            <h4>Reason: ${data.reason}</h4><h4>Smtp Check:${data.smtp_check?"Found":"Not Found"}</h4>`
    }
    result.style.visibility = "visible";
}

submit.addEventListener('click',validate);
inp.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter')
    validate();
});

























