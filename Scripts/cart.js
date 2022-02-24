// var dummy =  [{
//     name: "KHARDUNGLA V2 JACKET-OLIVE",
//     image_url: "https://store.royalenfield.com/media/catalog/product/i/m/img_9115_1.jpg?width=275&height=275&canvas=275:275&quality=80&bg-color=255,255,255",
//     price: 12950,
//     size: "XXL",
//     quantity: 1
// }]

var cartDataDB = JSON.parse(localStorage.getItem("cartDataDB")) || [];

var minusIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/> <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/> </svg>'

var plusIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/> <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/> </svg>'

var crossIcon = '<i class="fa-solid fa-xmark"></i>';

localStorage.setItem("promoApplied", JSON.stringify("false"));


showTotal(cartDataDB);

showCartsTotalItems(cartDataDB);

function showCartsTotalItems(item){
    var count = item.length;
    // console.log(count);
    if(count==0){
        document.querySelector("#totalCartItems").style.display = "none";
        document.querySelector("#totalArea").style.display = "none";
        document.querySelector("#cartArea").style.display = "none";
        var msg = document.createElement("h1");
        msg.innerText = "Your Cart is Empty!";
        document.querySelector("#bodyContainer").append(msg);
    }
    else{
        document.querySelector("#totalCartItems").style.display = "block";
        document.querySelector("#totalCartItems").innerText = count;
        document.querySelector("#totalArea").style.display = "block";
        document.querySelector("#cartArea").style.display = "block";
    }
}

showData(cartDataDB);

function showData(data){
    document.querySelector("#cartContainer").innerHTML = "";
    data.map(function(elem, index){
        /* CART ITEM MASTER DIV which will append to main Cart container*/
        var cartItemDataDiv = document.createElement("div");
        cartItemDataDiv.setAttribute("class", "cartItemData");

        /* CART ITEM INFO MASTER DIV - image, price, qty */
        var cartItemDiv = document.createElement("div");
        cartItemDiv.setAttribute("class", "cartItem");

        /* ITEM IMG DIV */
        var cartImgDiv = document.createElement("div");
        cartImgDiv.setAttribute("class", "cartImg");

        var cartImg = document.createElement("img");
        cartImg.setAttribute("src", elem.image_url);

        // To be appended to master cart div
        cartImgDiv.append(cartImg);

        /* ITEM NAME & SIZE DIV */
        var cartItemInfoDiv = document.createElement("div");
        cartItemInfoDiv.setAttribute("class", "cartItemInfo");

        var cartItemNameDiv = document.createElement("div");
        cartItemNameDiv.setAttribute("class", "cartItemName");
        cartItemNameDiv.innerText = elem.name;

        var cartItemSizeDiv = document.createElement("div");
        cartItemSizeDiv.setAttribute("class", "cartItemSize");

        var sizeSelector = document.createElement("select");
        sizeSelector.setAttribute("class", "itemSize");

        var size = ["S", "M", "L", "XL", "XXL"];

        for(var i=0; i<size.length; i++){
            var option = document.createElement("option");
            option.setAttribute("value", size[i]);
            option.innerText = size[i];
            if(elem.size[size[i]]==0){
                option.setAttribute("disabled", "true");
            }
            sizeSelector.append(option);
        }
        
        sizeSelector.value = elem.size;
        sizeSelector.addEventListener("change", function(){
            updateSize(index, sizeSelector.value);
        })
        cartItemSizeDiv.append(sizeSelector);
        
        // To be appended to master cart div
        cartItemInfoDiv.append(cartItemNameDiv, cartItemSizeDiv);


        /* ITEM PRICE DIV */
        var cartItemPriceDiv = document.createElement("div");
        cartItemPriceDiv.setAttribute("class", "cartItemPrice");
        cartItemPriceDiv.innerText = "Rs." + elem.price;


        // ITEM PRICE TOTAL DIV

        var cartItemTotalDiv = document.createElement("div");
        cartItemTotalDiv.setAttribute("class", "cartItemTotal");
        cartItemTotalDiv.innerText = "Rs." + (elem.price * elem.quantity);


        /* QUANTITY AREA */
        var cartItemQtyDiv = document.createElement("div");
        cartItemQtyDiv.setAttribute("class", "cartItemQty");

        var qtyAreaDiv = document.createElement("div");
        qtyAreaDiv.setAttribute("class", "qtyArea");
        var itemQtyBox = document.createElement("input");
        itemQtyBox.setAttribute("type", "number");
        itemQtyBox.setAttribute("class", "itemQty");
        itemQtyBox.setAttribute("value", elem.quantity);
        itemQtyBox.setAttribute("min", "0");
        itemQtyBox.setAttribute("max", "10");
        itemQtyBox.setAttribute("disabled", "true");
        qtyAreaDiv.append(itemQtyBox)

        var cartMinusDiv = document.createElement("div");
        cartMinusDiv.setAttribute("class", "minusQty");
        cartMinusDiv.innerHTML = minusIcon;
        cartMinusDiv.addEventListener("click", function(){
            reduceQuantity(index, cartItemTotalDiv, itemQtyBox);
        })

        

        

        var cartPlusDiv = document.createElement("div");
        cartPlusDiv.setAttribute("class", "addQty");
        cartPlusDiv.innerHTML = plusIcon;
        cartPlusDiv.addEventListener("click", function(){
            increaseQuantity(index, cartItemTotalDiv, itemQtyBox);
        })

        // To be appended to cart div
        cartItemQtyDiv.append(cartMinusDiv, qtyAreaDiv, cartPlusDiv)

        // Item Total Div
        // var cartItemTotalDiv = document.createElement("div");
        // cartItemTotalDiv.setAttribute("class", "cartItemTotal");
        // cartItemTotalDiv.innerText = "Rs." + (elem.price * elem.quantity);


        // APPENDING TO MAIN CART DIV
        cartItemDiv.append(cartImgDiv, cartItemInfoDiv, cartItemPriceDiv, cartItemQtyDiv, cartItemTotalDiv);

        // Creating Remove Button Div

        var removeItemDiv = document.createElement("div");
        removeItemDiv.setAttribute("class", "removeItem");

        var removeBtnDiv = document.createElement("div");
        removeBtnDiv.setAttribute("class", "removeBtn");
        removeBtnDiv.innerHTML = "Remove " + crossIcon;
        removeBtnDiv.addEventListener("click", function(){
            removeItemFromCart(index);
        })
        removeItemDiv.append(removeBtnDiv);
         

        // APPENDING TO MASTER DIV
        cartItemDataDiv.append(cartItemDiv, removeItemDiv);

        document.querySelector("#cartContainer").append(cartItemDataDiv);
    })
}


/* Add change event to select */

function updateSize(index, newSize){
    cartDataDB = JSON.parse(localStorage.getItem("cartDataDB")) || [];
    cartDataDB[index].size = newSize;
    console.log(cartDataDB);
    localStorage.setItem("cartDataDB", JSON.stringify(cartDataDB));
}

/* Function to Increase Quantity*/

function increaseQuantity(index, totalDisplayArea, userQty){
    //cartDataDB = JSON.parse(localStorage.getItem("cartDataDB")) || [];
    userQty.style.outline = "3px solid green";
    userQty.style.border = "0px";
    var current_qty = cartDataDB[index].quantity; 
    if(current_qty == 10){
        alert("Maximum limit reached");
    }
    else{
        var newQty = current_qty + 1;
        console.log("new qty", newQty);
        // userQty.value = newQty;
        //cartDataDB[index].quantity += Number(userQty.value);
        if(newQty>10){
            alert("Stock Limit Reached, Reduce quantity");
            userQty.value = "10";
        }
        else{
            cartDataDB[index].quantity = newQty;
            userQty.value++;
            totalDisplayArea.innerText = "Rs. " + cartDataDB[index].price * cartDataDB[index].quantity;
        }
    }
    // console.log("new qty", newQty);
    // console.log(cartDataDB);

    localStorage.setItem("cartDataDB", JSON.stringify(cartDataDB));

    showTotal(cartDataDB)
}



/* FUNCTION TO REDUCE QUANTITY */

function reduceQuantity(index, totalDisplayArea, userQty){
    userQty.style.outline = "3px solid red";
    userQty.style.border = "0px";

    var current_qty = cartDataDB[index].quantity; 
    
    var newQty = current_qty - 1;

    console.log(current_qty, newQty);
    //cartDataDB[index].quantity += Number(userQty.value);
    if(newQty==-1){
        alert("Item quantity 0, Increase quantity to buy item");
        cartDataDB[index].quantity = 0;
        userQty.value = "0";
        totalDisplayArea.innerText = "Rs. " + cartDataDB[index].price * cartDataDB[index].quantity;
        }
    else{
        // userQty.value = newQty;
        cartDataDB[index].quantity = newQty;
        userQty.value--;
        totalDisplayArea.innerText = "Rs. " + cartDataDB[index].price * cartDataDB[index].quantity;
    }

    // console.log("new qty", newQty);
    // console.log(cartDataDB);

    localStorage.setItem("cartDataDB", JSON.stringify(cartDataDB));

    showTotal(cartDataDB)
}


/* FUNCTION TO REMOVE ITEM FROM CART */

function removeItemFromCart(index){
    cartDataDB.splice(index, 1);

    console.log(cartDataDB);
    showData(cartDataDB);

    showCartsTotalItems(cartDataDB);

    localStorage.setItem("cartDataDB", JSON.stringify(cartDataDB));

    showTotal(cartDataDB)
}



/* FUNCTION TO ADD PROMO CODE */

document.querySelector("#promoBtn").addEventListener("click", applyPromo);
var correctPromo = "royalenfield";

function applyPromo(){
    var userPromo = document.querySelector("#promoBox").value;
    var promoMsgArea = document.querySelector("#promoApplyMsg");

    var total = cartDataDB.reduce(function(acc, elem){
        return acc + (elem.price * elem.quantity);
    }, 0);

    var discountedTotal = total;
    if(userPromo === correctPromo){
        promoMsgArea.innerText = "Congratulations! Promo code applied successfully. -30% discount!";
        promoMsgArea.style.fontWeight = "bold";
        promoMsgArea.style.color = "green";
        
        discountedTotal = Math.floor(total * 0.7);
        var discount = Math.floor(total*0.3);

        document.querySelector("#discountText").innerText = "- Rs." + discount;
        document.querySelector("#discountText").style.color = "green";
        document.querySelector("#discountText").style.fontWeight = "bold";


        console.log(total, discountedTotal);
        localStorage.setItem("promoApplied", JSON.stringify("true"));
    }
    else{
        promoMsgArea.innerText = "Sorry! Invalid promo code. Try again.";
        promoMsgArea.style.fontWeight = "bold";
        promoMsgArea.style.color = "red";
        document.querySelector("#discountText").innerText = "- Rs." + 0;
        document.querySelector("#discountText").style.color = "black";
        document.querySelector("#discountText").style.fontWeight = "normal";
        localStorage.setItem("promoApplied", JSON.stringify("false"));
    }

    document.querySelector("#finalTotalText").innerText = "Rs." + discountedTotal;
}


/* FUNCTION TO CALCULATE TOTAL */

function showTotal(cartDataDB){
    var total = cartDataDB.reduce(function(acc, elem){
        return acc + (elem.price * elem.quantity);
    }, 0);

    document.querySelector("#totalText").innerText = "Rs. " + total;
    document.querySelector("#finalTotalText").innerText = "Rs. " + total;
}