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

//Ajout d'un évènement à notre bouton ajout au panier
    function getButton(productData) {
        const button = document.getElementById("addToCart"); 

        button.addEventListener("click", () => {
            console.log("ajout au panier"); 
        //Récupération après "clic" des couleurs et des quantités sélectionnées 
        const selectColors = document.getElementById("colors"); 
        const selectQty = document.getElementById("quantity"); 

        //Attribution de la couleur  et de la quantité choisie à notre object
        const optionChoice = Object.assign({}, productData, {
            color : selectColors.value, 
            quantity : selectQty.value, 
        }); 

        console.log("--- optionChoice --->", optionChoice);

        //Insertion des données dans un tableau à destination du localstorage 
        let productArray = [];
        productArray.push(optionChoice);
        console.log("--- productArray --->", productArray);
        //--------simplification: mettre optionChoice en parametre et supprimer productArray
        localStorage.setItem("produit", JSON.stringify(productArray));
    


            //-----Seconde méthode------

        // let productArray = JSON.parse(localStorage.getItem("product")); 
        // if (productArray == null){
        //     productArray = []
        //     productArray.push(productData)
        //     console.log(productArray)
        // }
        

        
        })
    }



 















































