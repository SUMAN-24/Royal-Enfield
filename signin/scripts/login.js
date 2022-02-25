var regdUsers=JSON.parse(localStorage.getItem("signUpdataBase"));

var form= document.querySelector("#form");

  document.querySelector("#form").addEventListener("submit", formSubmit);
  
  function formSubmit(event) {
    event.preventDefault();

    var user = form.userId.value;
    var pass = form.password.value;
    
    for (var i = 0; i < regdUsers.length; i++) {
      if ((regdUsers[i].Email== user || regdUsers[i].Mobile==user ) && regdUsers[i].Password== pass) {

      alert("Login Successful")
      
      }
      else if(user=="" && pass ==""){
       
        alert("Please enter valid mobile no/ email ID.")

      } 
      else if((regdUsers[i].Email== user || regdUsers[i].Mobile==user) && pass== ""){
       
        alert("Enter a Password")
      }
      else if((regdUsers[i].Email !== user || regdUsers[i].Mobile !== user) && 
              regdUsers[i].Password !== pass){
        alert("Wrong Credentials")
      }
      else if((regdUsers[i].Email==user || regdUsers[i].Mobile==user) && 
              regdUsers[i].Password !== pass){
        alert("Wrong Password")
      }
      else if((regdUsers[i].Email !== user || regdUsers[i].Mobile !== user) && 
              regdUsers[i].Password == pass){
        alert("Wrong Username/Mobile.no")
      }
    }
  }