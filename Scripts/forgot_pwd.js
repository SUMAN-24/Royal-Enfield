var regdUsers=JSON.parse(localStorage.getItem("signUpdataBase")) || [];
console.log(regdUsers);
var form= document.querySelector("#form");


  document.querySelector("#form").addEventListener("submit", formSubmit);
  
  
  function formSubmit(event) {
    event.preventDefault();

    var user = form.userId.value;
    var country= form.Country.value;
    var found = false;
    console.log(user,country);
    
    for (var i = 0; i < regdUsers.length; i++) {
      if ((regdUsers[i].Email== user || regdUsers[i].Mobile==user) && 
            regdUsers[i].Country == country) {
            alert("Email verification sent to your registered email-id.")
            found = true;
      
      }
      else if(user==""){
       
        alert("Please enter valid mobile no/ email ID.")

      } 
      else if(country==""){
          alert("Select Country")
      }
    }

    if(!found){
        alert("User not found in database. Please check your credentials again.")
    }

    form.userId.value = "";
    form.Country.valu = "AF";
  }