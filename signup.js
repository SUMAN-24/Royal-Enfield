var signUpDataArray=JSON.parse(localStorage.getItem("signUpdataBase")) || [];

document.querySelector("#form").addEventListener("submit",function(event)
{
    event.preventDefault(event)
    var obj={};


    var fname=document.querySelector(".firNam")
        obj.Fname=fname.value

        var Lnam=document.querySelector(".lasNam")
        obj.Lastname=Lnam.value


        var GenM=document.querySelector(".genM")
        var GenF=document.querySelector(".genF")

                if(GenM.checked == true)
                    {                                       
                        obj.Gender="Male";
                    }
                else if(GenF.checked==true)
                    {
                        obj.Gender="Female";
                    }

        var doB=document.querySelector(".dob")
        obj.DOB=doB.value

        var email=document.querySelector(".emai")
        obj.Email=email.value

        var password=document.querySelector(".passW")
        obj.Password=password.value

        var country=document.querySelector("select")
        obj.Country=country.value

        var phone=document.querySelector(".phon")
        obj.Mobile=phone.value

         var ownYY=document.querySelector(".ownY")
        var ownNN=document.querySelector(".ownN")
                  if(ownYY.checked==true)
                     {
                         obj.ownOrNot="Yes";
                     }
                     else if(ownNN.checked==true)
                     {
                         obj.ownOrNot="No";
                     }
                     console.log(obj)
        


    if(fname.value=="")
    {
        alert("Enter first name")
    }
    else if(Lnam.value=="")
    {
        alert("Enter last name")
    }

    else if((GenM.checked==false) && (GenF.checked==false))
    {
        alert("Gender not specified")
    }

    else if(doB.value=="")
    {
        alert("Please enter the date of birth")
    }
    else if(email.value=="")
    {
        alert("Enter your email address")
    }
    else if(password.value=="")
    {
        alert("Please enter password")
    }
    else if(country.value=="Select Country")
    {
        alert("Select your country")
    }     
     else if(phone.value=="")
    {
        alert("Enter valid mobile number without using initial digit 0")
    }
    else if((ownYY.checked==false) && (ownNN.checked==false))
    {
        alert("Motorcycle ownership not specified")
    }

    else
    {    var tnc=document.querySelector(".check")
         var captcha=document.querySelector(".recaptch")
        if(tnc.checked)
        {
            if(captcha.checked)
            {
                signUpDataArray.push(obj)
                localStorage.setItem("signUpdataBase",JSON.stringify(signUpDataArray))
            }
            else
            {
                  alert("Please select recaptcha")
            }
        }
        else
        {
            alert("Please accept the terms and conditions as well as privacy policy to proceed")
        }
    }

})
