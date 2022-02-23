
    var jacketsDB = JSON.parse(localStorage.getItem("jacketsDB")) || [];

    showData(jacketsDB);

    function showData(data){
        data.map(function(elem, index){
            var pdiv = document.createElement("div");
            var pimg = document.createElement("img");
            pimg.setAttribute("src", elem.image_url);
            pdiv.append(pimg);

            document.querySelector("#topcontainer").append(pdiv);
        })
    }
