var regdUsers=JSON.parse(localStorage.getItem("signUpdataBase")) || [];

console.log(regdUsers);

var form= document.querySelector("#form");

document.querySelector("#form").addEventListener("submit", formSubmit);
  
function formSubmit(event) {
    event.preventDefault();

    var user = form.userId.value;
    var pass = form.password.value;
    var check = false;
    
    for (var i = 0; i < regdUsers.length; i++) {
        if ((regdUsers[i].Email== user || regdUsers[i].Mobile==user ) && regdUsers[i].Password== pass) {
            check=true;
            alert("Login Successful. Welcome back " + regdUsers[i].Fname + "!");
            window.location.href = "index.html";
        }
    }

    if(check==false){
        alert("Wrong credentials provided. Please try again");
    }

    form.userId.value = "";
    form.password.value = "";
}
        // else if(user=="" && pass ==""){
        
        //     alert("Please enter valid mobile no/ email ID.")

        // } 
        // else if((regdUsers[i].Email== user || regdUsers[i].Mobile==user) && pass== ""){
        
        //     alert("Enter a Password")
        // }
        // else if((regdUsers[i].Email !== user || regdUsers[i].Mobile !== user) && 
        //         regdUsers[i].Password !== pass){
        //     alert("Wrong Credentials")
        // }
        // else if((regdUsers[i].Email==user || regdUsers[i].Mobile==user) && 
        //         regdUsers[i].Password !== pass){
        //     alert("Wrong Password")
        // }
        // else if((regdUsers[i].Email !== user || regdUsers[i].Mobile !== user) && 
        //         regdUsers[i].Password == pass){
        //     alert("Wrong Username/Mobile.no")
        // }
//     }
//   }