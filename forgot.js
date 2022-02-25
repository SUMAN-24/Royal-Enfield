var regdUsers=JSON.parse(localStorage.getItem("signUpdataBase"));
console.log(regdUsers);
var form= document.querySelector("#form");


  document.querySelector("#form").addEventListener("submit", formSubmit);
  
  
  function formSubmit(event) {
    event.preventDefault();

    var user = form.userId.value;
    var country= form.Country.value;
    console.log(user,country);
    
    for (var i = 0; i < regdUsers.length; i++) {
      if ((regdUsers[i].Email== user || regdUsers[i].Mobile==user) && 
            regdUsers[i].Country == country) {

      alert("Email verification sent")
      
      }
      else if(user==""){
       
        alert("Please enter valid mobile no/ email ID.")

      } 
      else if(country==""){
          alert("Select Country")
      }
      else if((regdUsers[i].Email !== user || regdUsers[i].Mobile !== user) && regdUsers[i].Country !==country){
        alert("Match not found!")
      }
    }
  }