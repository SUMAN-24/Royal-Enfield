
    var jacketsDB = JSON.parse(localStorage.getItem("jacketsDB")) || [];

    var cartDataDB = JSON.parse(localStorage.getItem("cartDataDB")) || [];

    var cart_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="grey" class="bi bi-cart-fill" viewBox="0 0 16 16"> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/> </svg>';

    var jacketsCopyDB = jacketsDB;
   
    showData(jacketsDB);

    showCartsTotalItems(cartDataDB);

    function showCartsTotalItems(item){
        var count = item.length;
        // console.log(count);
        if(count==0){
            document.querySelector("#totalCartItems").style.display = "none";
        }
        else{
            document.querySelector("#totalCartItems").style.display = "block";
            document.querySelector("#totalCartItems").innerText = count;
        }
    }

    function showData(data){
        document.querySelector("#displayDiv").innerHTML = "";
        if(data.length==0){
            document.querySelector("#totalResults").innerText = "No items found."
        }
        else{
            document.querySelector("#totalResults").innerText = "Showing "+data.length+" results.";         
        }
        // document.querySelector("#totalResults").innerText = "Showing "+data.length+" results.";
        //console.log(data);
        data.map(function(elem, index){
            
            /* Main div to append*/
            var productDiv = document.createElement("div");
            productDiv.setAttribute("class", "prodDiv");

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

            var sizes = ["S", "M", "L", "XL", "XXL"];

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



            /*CART ICON*/

            var pCartDiv = document.createElement("div");
            pCartDiv.setAttribute("class", "cartIcon");
            pCartDiv.innerHTML = cart_icon;
            pCartDiv.addEventListener("click", function(){
                addToCart(elem);
            });

            pSizeCartDiv.append(pSizeDiv, pCartDiv);


            /* APPENDING TO MASTER DIV */
            pInfoMasterDiv.append(pInfoDiv, pSizeCartDiv);


            /* APPENDING TO MAIN PRODUCT DIV */
            productDiv.append(pImgDiv, pInfoMasterDiv)

            // Appending product div to display area
            document.querySelector("#displayDiv").append(productDiv);
        })
    }




    /* FUNCTION TO CHANGE DIV PROPERTY WHEN SIZE SELECTED */

    var nowSelected = "";
    var alreadySelected = false;
    var selectedSizeText = "S";

    function selectSize(event){
        selectedSize = event.target;
        selectedSizeText = event.target.innerText;
        console.log(selectedSize);
        console.log(nowSelected);
        if(alreadySelected){
            nowSelected.style.color = "black";
            nowSelected.style.backgroundColor = "#ffffff";
            nowSelected.style.filter = "none";
            selectedSize.style.filter = "invert(1)";
        }
        else{
            selectedSize.style.filter = "invert(1)";
            alreadySelected = true;
        }
        nowSelected = selectedSize;
    }


    /* FUNCTION TO ADD PRODUCT TO CART */

    function addToCart(item){
        
        var newCartData = {
            name: item.name,
            image_url: item.image_url,
            price: Number(item.price),
            size: selectedSizeText,
            quantity: 1,
        }

        // Checking if product already in cart
        var flag = 0;
        var curr_index = -1;
        for(var i in cartDataDB){
            if(cartDataDB[i].name == newCartData.name && cartDataDB[i].size == newCartData.size){
                flag = 1;
                curr_index = i;
                break;
            }
        }

        if(flag){
            cartDataDB[curr_index].quantity += 1;
        }
        else{
            cartDataDB.push(newCartData);
        }

        console.log(newCartData);

        

        showCartsTotalItems(cartDataDB);

        localStorage.setItem("cartDataDB", JSON.stringify(cartDataDB));
    }





/* SORTING & FILTERING AREA */


/* FUNCTION TO RESET ALL FILTER */

// Resetting Filters

document.querySelector("#resetFilters").addEventListener("click", resetFilters);

function resetFilters(event){
    document.querySelector("#sorter").value = "--";
    document.querySelector("#filterSize").value = "--";
    document.querySelector("#filterPrice").value = "--";

    jacketsDB = JSON.parse(localStorage.getItem("jacketsDB")) || [];

    showData(jacketsDB);
}

/* FUNCTION TO APPLY FILTERS */

// var filteredCartData = cartDataDB;

document.querySelector("#sorter").addEventListener("change", applyFilters);
document.querySelector("#filterSize").addEventListener("change", applyFilters);
document.querySelector("#filterPrice").addEventListener("change", applyFilters);

function applyFilters(event){
    var rangeFilterSelected = document.querySelector("#filterPrice").value;
    var sizeFilterSelected = document.querySelector("#filterSize").value;
    var sortBy = document.querySelector("#sorter").value;

    sortData(sortBy);
    filterByRange(rangeFilterSelected);
    filterBySize(sizeFilterSelected);
};



/* SORTING FUNCTION */

function sortData(data){
    var sortBy = data;
    if(sortBy != "--"){
        if(sortBy == "pLTH"){
            jacketsDB.sort(function(a,b){
                return a.price - b.price;
            })
        }
        else if(sortBy == "pHTL"){
            jacketsDB.sort(function(a,b){
                return b.price - a.price;
            })
        }
        else if(sortBy == "nAZ"){
            jacketsDB.sort(function(a,b){
                var nameA = a.name.trim().toLowerCase(); //removing case-sensitivity
                var nameB = b.name.trim().toLowerCase();
    
                if(nameA < nameB){
                    return -1; // <0 a placed before b ===> sorting in ascending order
                }
                if(nameA > nameB){
                    return 1; // >0 place b before a
                }
    
                // names must be equal
                return 0;
            })
        }
        else if(sortBy == "nZA"){
            jacketsDB.sort(function(a,b){
                var nameA = a.name.trim().toLowerCase(); //removing case-sensitivity
                var nameB = b.name.trim().toLowerCase();
    
                if(nameA < nameB){
                    return 1;
                }
                if(nameA > nameB){
                    return -1; 
                }
    
                // names must be equal
                return 0;
            })
        }
        jacketsCopyDB = jacketsDB;
        showData(jacketsDB);
    }

    // filteredJacketsData = jacketsDB;
    //console.log(filteredJacketsData);
    
}



/* FILTER FUNCTION TO DISPLAY DATA BY RANGE */


function filterByRange(data){
    var rangeSelected = data;
    var upperLimit = 0;
    var lowerLimit = 0;
    var maxPriceValue = 0;
    //var filteredPriceData = jacketsCopyDB;
    //console.log(filteredJacketsData);
    // //Finding max price Value
    jacketsDB.forEach(function(elem, index){
        if(elem.price > maxPriceValue){
            maxPriceValue = elem.price;
        }
    });

    // Conditions For Range
    if(rangeSelected != "--"){
        if(rangeSelected=="1000"){
            upperLimit = 1000;
            lowerLimit = 0;
        }
        else if(rangeSelected=="2000"){
            upperLimit = 2000;
            lowerLimit = 1001;
        }
        else if(rangeSelected=="5000"){
            upperLimit = 5000;
            lowerLimit = 2001;
        }
        else if(rangeSelected=="10000"){
            upperLimit = 10000;
            lowerLimit = 5001;
        }
        else if(rangeSelected=="11000"){
            upperLimit = maxPriceValue;
            lowerLimit = 10001;
        }
        
    
        var filteredPriceData = jacketsCopyDB.filter(function(elem, index){
            if(elem.price >= lowerLimit && elem.price<=upperLimit){
                return elem;
            }
        })

        console.log(filteredPriceData);
        showData(filteredPriceData);
        //jacketsCopyDB = filteredPriceData;
        // console.log("After Range Function");
        // console.log(filteredJacketsData);

        // console.log(filteredPriceData);
        // filteredJacketsData = filteredPriceData;

        // showData(filteredJacketsData);
    }
    
    
};


function filterBySize(data){
    var sizeFilter = data;
    // var copyData = filteredJacketsData;
    // console.log("sizeFilter is " + sizeFilter);
    // console.log(filteredJacketsData);
    

    if(sizeFilter!="--"){
        var sizeFilteredData = jacketsCopyDB.filter(function(elem, index){
            if(elem.size[sizeFilter]>1){
                return elem;
            }
        });

        jacketsCopyDB = sizeFilteredData;

        showData(jacketsCopyDB);
    }

    
    // console.log("After filtering size");
    // console.log(sizeFilteredData);

    // filteredJacketsData = sizeFilteredData;

    // showData(filteredJacketsData);

}

