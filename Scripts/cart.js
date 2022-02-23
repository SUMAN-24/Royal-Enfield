var dummy =  {
    name: "KHARDUNGLA V2 JACKET-OLIVE",
    image_url: "https://store.royalenfield.com/media/catalog/product/i/m/img_9115_1.jpg?width=275&height=275&canvas=275:275&quality=80&bg-color=255,255,255",
    price: 12950,
    size: "XXL",
    quantity: 1
},

showData(dummy);

function showData(data){
    data.map(function(elem, index){
        /* CART ITEM MASTER DIV which will append to main Cart container*/
        var cartItemData = document.createElement("div");
        cartItemData.setAttribute("class", "cartItemData");

        /* CART ITEM INFO MASTER DIV - image, price, qty */
        var cartItem = document.createElement
    })
}


/* Add change event to select */