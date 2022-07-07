//Récupération de l'Id dans notre URL    
const urlProduct = window.location.search;
const urlParams = new URLSearchParams(urlProduct);
const newId = urlParams.get("id"); 
let dataProducts = []; 

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
    .then((promise) => {
        dataProducts = promise;

        document
        .querySelector(".item__img")
        .innerHTML = `<img src="${dataProducts.imageUrl}" alt="Photographie d'un canapé"></img>`

        document
        .querySelector(".item__content__titlePrice")
        .innerHTML = `<h1 id="title">${dataProducts.name}</h1>
        <p>Prix : <span id="price">${dataProducts.price}</span>€</p>`

        document
        .querySelector(".item__content__description")
        .innerHTML = `<p id="description">${dataProducts.description}</p>`

        //La boucle permet de créer les valeurs à la balise "select"
        for (let colors of dataProducts.colors){
            document
        .querySelector("#colors").innerHTML += `<option value="${colors.toLowerCase()}">${colors}</option>` 
        }
       
       /*--Déclaration de la fonction getButton qui prend pour parametre "data", qui sera nécessaire à 
       l'importation des données dans le localstorage --*/
        getButton(dataProducts); 
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
    function getButton(dataProducts) {
        const button = document.getElementById("addToCart"); 
        button.addEventListener("click", () => {
            cartProducts(dataProducts); 
    })
    };

    //La fonction va récupérer les valeurs enregistrées dans le local storage et les enregistrer sous forme de tableau 
    function cartProducts(dataProducts) {
      // Récupérationdes couleurs et des quantités sélectionnées que l'on va lier avec les données produit dans la variable optionChoice
      const selectColors = document.getElementById("colors"); 
      const selectQty = document.getElementById("quantity"); 
      const optionChoice = Object.assign({}, dataProducts, {
        color : selectColors.value, 
        quantity : parseInt(selectQty.value), 
        });


        let cartArray = JSON.parse(localStorage.getItem("productsInCart"));
        //On vérifie si le localstorage détient déjà un élément
        //Si CartArray est nul alors le localstorage est vide, on ajoute alors notre produit dans le localstorage 
        if (cartArray == null){
           cartArray = [];
           cartArray.push(optionChoice);
            localStorage.setItem("productsInCart", JSON.stringify(cartArray)); 
        } else if (cartArray != null) {
            /*-le localstorage à un produit; pour chaque nouveaux produits si l'id et la couleur 
            sont identique, on incrémente la quantité,-*/
            for (let i = 0; i < cartArray.length; i++){
                if (cartArray[i]._id == dataProducts._id && cartArray[i].color == optionChoice.color){
                    return(cartArray[i].quantity += parseInt(selectQty.value), 
                        localStorage.setItem("productsInCart", JSON.stringify(cartArray))); 
                }
            }

            /*-le localstorage à un produit; pour chaque nouveaux produits si l'id 
            est identique, mais la couleur différente, on le nouveau produit dans le localStorage cartArray-*/
            for (let i = 0; i < cartArray.length; i++){
                if (cartArray[i]._id == dataProducts._id && cartArray[i].color != optionChoice.color){
                    return (console.log("bonjour"),
                    cartArray.push(optionChoice),
                    localStorage.setItem("productsInCart", JSON.stringify(cartArray)));
                }
            }
        }
        
        // return (cartArray = JSON.parse(localStorage.getItem("productsInCart"))); 
        
        
        
        
        
        // else { 
        //         if (cartArray._id == data._id && cartArray.color == optionChoice.color){
                
        //         console.log("hello")
                
                
                
        //             //    let newCartArray = cartArray.concat(cartArrayPlus);
        //         //    console.log(newCartArray);
        //            localStorage.setItem("productsInCart", JSON.stringify(cartArray));
        //         }
        //     }
            
        

      




      //Récupération des données dans le localstorage
    //   let cartArray = JSON.parse(localStorage.getItem("productsInCart"));
    //   console.log(cartArray)
    //   /*- La condition vient vérifier si un produit est déjà présent ou non dans le localstorage,
    //   Si un produit est présent : ----;
    //   Sinon on enregistre directement notre tab dans le localstorage */ 
    //   if (cartArray != null){
    //         // if(cartArray[data.name] == undefined){
    //         //     cartArray = {
    //         //         ...cartArray,
    //         //         [data.name]: optionChoice}
    //         // }
    //         localStorage.setItem("productsInCart", JSON.stringify(cartArray));

    //     } else {
    //     cartArray = {
    //         [data.name]: optionChoice
    //     }
    //     localStorage.setItem("productsInCart", JSON.stringify(cartArray));
    //     }

        totalPrice(optionChoice);
        totalQty(optionChoice);
    };

    function totalPrice (optionChoice){
        let cartCost = localStorage.getItem("totalCost"); 
 
        if(cartCost != null){
            cartCost = parseInt(cartCost);
            localStorage.setItem("totalCost", cartCost + (optionChoice.price * optionChoice.quantity));
        } else {
            localStorage.setItem("totalCost", optionChoice.price * optionChoice.quantity);
        }
    };

    function totalQty(optionChoice){
        let cartQty = localStorage.getItem("totalQuantity");
        cartQty = parseInt(cartQty)
        let selectQty = optionChoice.quantity;
        selectQty = parseInt(selectQty)

        if(cartQty){
            localStorage.setItem("totalQuantity", selectQty + cartQty); 
        } else {
            localStorage.setItem("totalQuantity", selectQty); 
        }
    };


   
        
