var cartDataDB = JSON.parse(localStorage.getItem("cartDataDB")) || [];

var promoAppliedOrNot = JSON.parse(localStorage.getItem("promoApplied"));




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
