var cartDataDB = JSON.parse(localStorage.getItem("cartDataDB")) || [];

var promoAppliedOrNot = JSON.parse(localStorage.getItem("promoApplied"));

var addressDB = JSON.parse(localStorage.getItem("addressDB")) || [];


showTotal(cartDataDB);

function showTotal(cartDataDB){
    var total = cartDataDB.reduce(function(acc, elem){
        return acc + (elem.price * elem.quantity);
    }, 0);
    
    var discountTotal = total;

    if(promoAppliedOrNot){
        discountTotal = Math.floor(0.7*total);
        document.querySelector("#discountText").innerText = "- Rs. " + Math.floor(0.3*total);
        document.querySelector("#discountText").style.color = "green";
        document.querySelector("#discountText").style.fontWeight = "bold";
    }

    if(discountTotal < 1000){
        document.querySelector("#shippingText").innerText = "Rs. 50";
        discountTotal += 50;
    }
    document.querySelector("#totalText").innerText = "Rs. " + total;
    document.querySelector("#finalTotalText").innerText = "Rs. " + discountTotal;
}


/* PAYMENT CHECK */

var cardData = {
    number: 1234567812345678,
    exp_month: 1,
    exp_year: 2022,
    cvv: 123
}

document.querySelector("#payment-info").addEventListener("submit", validateCard);


function validateCard(event){
    event.preventDefault();
    var form = document.querySelector("#payment-info");
    var userCardNo = form.cardNo.value;
    var userExpMonth = form.expmonth.value;
    var userExpYear = form.expyear.value;
    var userCvv = form.cvv.value;

    if(userCardNo == cardData.number && userExpMonth == cardData.exp_month && userExpYear == cardData.exp_year && userCvv == cardData.cvv){
        alert("Redirecting to OTP entering page....");
        window.location.href = "otp.html";
    }
    else{
        alert("Wrong card details entered. Please try again!");
        form.cardNo.value = "";
        form.expmonth.value = "";
        form.expyear.value = "";
        form.cvv.value = "";
        form.cardName.value = "";
        form.cardNo.style.border = "2px solid red";
        form.expmonth.style.border = "2px solid red";
        form.expyear.style.border = "2px solid red";
        form.cvv.style.border = "2px solid red";
    }
}



/* FUNCTION TO SAVE SHIPPING ADDRESS */


document.querySelector("#shippingAddress").addEventListener("submit", enterAddress);

function enterAddress(event){
    event.preventDefault();

    var errorFlag = false;
    var form = document.querySelector("#shippingAddress");

    var name = form.firstName.value + " " + form.lastName.value;
    var addressLine1 = form.address1.value;
    var addressLine2 = form.address2.value;
    var city = form.city.value;
    var state = form.state.value;
    var country = form.country.value;
    var mobile = form.mobile.value;
    var pincode = form.pin.value;

    // Edge cases check

    if(name.length == 0 || addressLine1.length==0 || city.length == 0 || state.length==0){
        alert("Please Enter Valid details");
        errorFlag = true;
    }
    else{
        errorFlag = false;
    }

    var mobileStr = mobile.toString();

    var firstdigit = mobileStr[0];
    if(firstdigit=="0"){
        alert("Mobile number cannot start with 0");
        form.mobile.value = "";
        mobile = form.mobile.value;
        errorFlag = true;
    }

    if(mobileStr.length!=10){
        alert("Mobile number needs to be 10 digits");
        form.mobile.value = "";
        mobile = form.mobile.value;
        errorFlag = true;
    }
    if(mobileStr.length==10){
        errorFlag = false;
    }

    if(pincode.length!=6){
        alert("Please enter correct PIN Code");
        form.pin.value = "";
        pincode = form.pin.value;
        errorFlag = true;
    }

    if(pincode.length==6){
        errorFlag = false;
    }

    //errorFlag = false;

    

    
    if(!errorFlag){
        var newAddress = {
            name : name.toUpperCase(),
            address : {
                add1 : addressLine1.toUpperCase(),
                add2 : addressLine2.toUpperCase(),
                city : city.toUpperCase(),
                state : state.toUpperCase(),
                country : country.toUpperCase(), 
                pincode : pincode
            },
            mobile : mobile,
        };

        console.log(newAddress);

        addressDB.push(newAddress);
        //console.log(addressDB);
        localStorage.setItem("addressDB", JSON.stringify(addressDB));

        
        window.location.href = "#paymentSection";
    }
    else{
        window.location.href = "#billingAddress";
    }
}
