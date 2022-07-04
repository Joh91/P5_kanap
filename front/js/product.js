//Récupération de l'Id dans notre URL    
const urlProduct = window.location.search;
const urlParams = new URLSearchParams(urlProduct);
const newId = urlParams.get("id"); 

//Affichage des produits dans leur page produit
function productAppear() {
//Intégration de l'id par produit dans notre URL afin de les distinguer dans leur page respective
fetch(`http://localhost:3000/api/products/${newId}`)

    //les resultats de la requête sont retournés en JSON 
    .then((res) => {
        if (res.ok){
            return res.json(); 
        } 
    })

    //Affichage dynamique des éléments de la page produit
    .then((data) => {
        document
        .querySelector(".item__img")
        .innerHTML = `<img src="${data.imageUrl}" alt="Photographie d'un canapé"></img>`

        document
        .querySelector(".item__content__titlePrice")
        .innerHTML = `<h1 id="title">${data.name}</h1>
        <p>Prix : <span id="price">${data.price}</span>€</p>`

        document
        .querySelector(".item__content__description")
        .innerHTML = `<p id="description">${data.description}</p>`

        //La boucle permet de créer les valeurs à la balise "select"
        for (let colors of data.colors){
            document
        .querySelector("#colors").innerHTML += `<option value="${colors.toLowerCase()}">${colors}</option>` 
        }
       
       /*--Déclaration de la fonction getButton qui prend pour parametre "data", qui sera nécessaire à 
       l'importation des données dans le localstorage --*/
        getButton(data); 
    })
    
    //Active dans le cas où notre première promesse est "false"
    .catch ((err) => {
        document
        .getElementsByClassName("item")
        .innerText = "Nous ne sommes pas parvenu à afficher les éléments attendus, veuillez-vous excuser"; 

        console.log("erreur")
    });
    
};

//Declaration de la fonction productAppear
productAppear(); 



//----------------------Gestion du panier ----------------
// La fonction récupère l'id du bouton pour créer un évènement 
    function getButton(data) {
        const button = document.getElementById("addToCart"); 
        button.addEventListener("click", () => {
            cartProducts(data); 
            ;
            

    })
    }

    //La fonction va récupérer les valeurs enregistrées dans le local storage et les enregistrer sous forme de tableau 
    function cartProducts(data) {
      // Récupération après "clic" des couleurs et des quantités sélectionnées 
      const selectColors = document.getElementById("colors"); 
      const selectQty = document.getElementById("quantity"); 

      //Attribution de la couleur  et de la quantité choisie à notre object
      const optionChoice = Object.assign({}, data, {
        color : selectColors.value, 
        quantity : selectQty.value, 
        });
        
      //Récupération des données dans le localstorage
      let cartArray = JSON.parse(localStorage.getItem("productsInCart")); 

      /*- La condition vient vérifier si un produit est déjà présent ou non dans le localstorage, */ 
      if (cartArray != null){
            if(cartArray[data.name] == undefined){
                cartArray = {
                    ...cartArray,
                    [data.name]: optionChoice
                }
            }
            localStorage.setItem("productsInCart", JSON.stringify(cartArray));

        } else {
        cartArray = {
            [data.name]: optionChoice
        }
        localStorage.setItem("productsInCart", JSON.stringify(cartArray));
        }
        totalPrice(optionChoice);
        totalQty(optionChoice);
    }

    function totalPrice (optionChoice){
        let cartCost = localStorage.getItem("totalCost"); 
 
        if(cartCost != null){
            cartCost = parseInt(cartCost);
            localStorage.setItem("totalCost", cartCost + (optionChoice.price * optionChoice.quantity));
        } else {
            localStorage.setItem("totalCost", optionChoice.price * optionChoice.quantity);
        }
    }

    function totalQty(optionChoice){
        let cartQty = localStorage.getItem("totalQuantity");
        cartQty = parseInt(cartQty)
        let selectQty = optionChoice.quantity;
        selectQty = parseInt(selectQty)

        if(cartQty){
            localStorage.setItem("totalQuantity", selectQty + cartQty); 
            console.log("bonsoir")
        } else {
            localStorage.setItem("totalQuantity", selectQty); 
            console.log("hello hello")
        }
       
    
    }


   
        
