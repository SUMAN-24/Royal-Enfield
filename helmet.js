var helmetDB = JSON.parse(localStorage.getItem("helmetData")) || [];
console.log(helmetDB)

var cartDataDb = JSON.parse(localStorage.getItem("cartDataDB")) || [];

var cart_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="grey" class="bi bi-cart-fill" viewBox="0 0 16 16"> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/> </svg>';

// var helmetCopy = helmetDB;

showData(helmetDB);

function showData(data){
    document.querySelector("#displayDiv").innerHTML = "";
    if(data.length == 0){
        document.querySelector("#totalResults").innerText = "No items found.";
    }else{
        document.querySelector("#totalResults").innerText = "Showing "+data.length+" results."; 
    }
    console.log(data)
    data.map(function(elem,index){
        /* Main div to append*/
        var proDiv = document.createElement("div");
        proDiv.setAttribute("class", "prodDiv");

         /*Image div*/
        var pImgDiv = document.createElement("div");
        pImgDiv.setAttribute("class", "prodImg");

        var pImg = document.createElement("img");
        pImg.setAttribute("src", elem.image_url);

        pImgDiv.append(pImg);

           /* Product Info, Price, Cart Size Master Div */

        var pInfoMasterDiv = document.createElement("div");
        pInfoMasterDiv.setAttribute("class", "prodInfoCart");

           /* Product Name, price div */

        var pInfoDiv = document.createElement("div");
        pInfoDiv.setAttribute("class", "prodInfo");

        var pNameDiv = document.createElement("div");
        pNameDiv.setAttribute("class", "prodName");
        pNameDiv.innerText = elem.name;

        var pPriceDiv = document.createElement("div");
        pPriceDiv.setAttribute("class", "prodPrice");
        pPriceDiv.innerText = "Rs. "+elem.price;

        pInfoDiv.append(pNameDiv, pPriceDiv);

        /* SIZE & CART DIV */

        var pSizeCartDiv = document.createElement("div");
        pSizeCartDiv.setAttribute("class", "addCartArea");

        var pSizeDiv = document.createElement("div");
        pSizeDiv.setAttribute("class", "sizeSelector");

        var sizes = ["M", "L", "XL", "One Size"];

        for(var i=0; i<sizes.length; i++){
            var sizeDiv = document.createElement("div");
            sizeDiv.setAttribute("class", "size");
            sizeDiv.innerText = sizes[i];
            if(elem.size[sizes[i]]==0){
                sizeDiv.style.pointerEvents = "none";
                sizeDiv.style.color = "red";
                sizeDiv.style.textDecoration = "line-through";
            }
            else{
                sizeDiv.addEventListener("click", selectSize);
            }
            pSizeDiv.append(sizeDiv);
        }

    })
}
