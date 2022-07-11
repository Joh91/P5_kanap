//cette fonction va nous permettre d'afficher les produits contenus dans le localstorage dans notre page panier

function cartAppear() {
    let addCart = JSON.parse(localStorage.getItem("productsInCart"));

    let cart__items = document.querySelector("#cart__items");

    cart__items.innerHTML = addCart.map((item) => `<article class="cart__item" data-id="${item._id}" data-color="${item.colors}">
                                                        <div class="cart__item__img">
                                                            <img src="${item.imageUrl}" alt="${item.altTxt}">
                                                        </div>
                                                        <div class="cart__item__content">
                                                        <div class="cart__item__content__description">
                                                            <h2>${item.name}</h2>
                                                            <p>${item.color}</p>
                                                            <p>${item.price} €</p>
                                                        </div>
                                                        <div class="cart__item__content__settings">
                                                            <div class="cart__item__content__settings__quantity">
                                                                <p>Qté : ${item.quantity} </p>
                                                                <input type="number" data-id="${item._id}" data-color="${item.color}" class="itemQuantity" name="itemQuantity" min="1" max="100" value="1">
                                                            </div>
                                                            <div class="cart__item__content__settings__delete">
                                                                <p class="deleteItem" data-id="${item._id}" data-color="${item.color}">Supprimer</p>
                                                            </div>
                                                        </div>
                                                    </article>`)
    totalCart(addCart);
    
}

cartAppear();
addQuantity();
deleteItem();

//Définition du nombre d'articles et du coût total du panier
function totalCart() {
    let CartRegistered = JSON.parse(localStorage.getItem("productsInCart"));
    let totalCartQty = 0;
    let totalCartPrice = 0;

    //la boucle récupère les quantités et les prix de tous les articles enregistrés dans le localstorage
    for (let i = 0; i < CartRegistered.length; i++) {

        totalCartQty += CartRegistered[i].quantity;
        console.log("TCQ", totalCartQty);
        localStorage.setItem("totalQuantity", JSON.stringify(totalCartQty));

        totalCartPrice += (CartRegistered[i].quantity * CartRegistered[i].price);
        console.log("TCP", totalCartPrice);
        localStorage.setItem("totalPrice", JSON.stringify(totalCartPrice));

    }
    totalCartAppear();
}


function totalCartAppear() {
    let totalCart = JSON.parse(localStorage.getItem("totalQuantity"));
    let totalCost = JSON.parse(localStorage.getItem("totalPrice"));
    let totalQtyCart = document.querySelector(".cart__price");

    if (totalCart && totalCost && totalQtyCart) {
        totalQtyCart.innerHTML = `<p>Total (<span id="totalQuantity">${totalCart}</span> articles) : <span id="totalPrice">${totalCost}</span> €</p>`;
    }
}

function addQuantity() {
    let cartRegistered = JSON.parse(localStorage.getItem("productsInCart"));
    const qtyButton = document.querySelectorAll('.itemQuantity');
    qtyButton.forEach((quantity) => {
        quantity.addEventListener("change", (e) => {

            for (item of cartRegistered) {
                console.log(qtyButton);
                if (item._id == quantity.dataset.id && item.color == quantity.dataset.color) {
                    item.quantity = parseInt(e.target.value);
                    localStorage.setItem("productsInCart", JSON.stringify(cartRegistered));
                    totalCart();
                }
            }
        })
    })
}

//Suppression d'un element à l'aide du bouton supprimer dans le panier 
function deleteItem(){
    //récupération du bouton supprimer
    const deletedButton = document.querySelectorAll(".deleteItem");
    //ForEach répète la création de l'évènement sur le bouton par le nombre d'élément dans notre panier
    deletedButton.forEach((items) => {
        items.addEventListener("click", () => {
            let cartRegistered = JSON.parse(localStorage.getItem("productsInCart"));
            let itemDeleted = cartRegistered.length;
            let newCart = [];
            
            //si le localstorage ne detient que un seul item on supprime celui-ci avec removeItem 
            if (itemDeleted == 1) {
                return (
                    localStorage.removeItem("productsInCart"), 
                    console.log("hello"),
                    //permet de forcer l'actualisation de la page
                    window.location.href = "cart.html"
                );
            } else  {
                /*-Utilisation de filter pour la suppression du/des item(s)

                *filter récupère les élements selectionner pour les enregistrer dans un nouvel array et par élimination supprimer celles non conservées

                **on récupère les produits du localstorage; filter récupère les éléments dans l'array et les déclare dans element 

                ***le produit selectionné est donc celui non retenu dans notre nouvel array -*/
                newCart = cartRegistered.filter ((element => {
                 if (element._id != items.dataset.id || element.color != items.dataset.color){
                    return true; 
                    }
                }));
                console.log("bonsoir");
                console.log(cartRegistered);
                //le nouveau array est sauvegardé dans le localstorage, la page actualisée
                localStorage.setItem("productsInCart", JSON.stringify(newCart));
                window.location.href = "cart.html";
            };
        });
    });
}

/*------------------------Gestion du formulaire --------------------*/ 
//on déclare des variables pour chaque input afin de les récupérer 
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.querySelector("#email");

let valueFirstName, valueLastName, valueAddress, valueCity, valueEmail; 

/* --- verification du prénom ---*/

firstName.addEventListener("change", (firstName) => {
   //si la valeur saisie répond aux critères
   //Regex: minuscules et majuscules autorisées, 3 à 25 caractères requis
   if (firstName.target.value.match(/^[a-z A-Z \s'-]{3,25}$/)){
    document.querySelector("#firstNameErrorMsg")
    .innerHTML = "";
    document.querySelector("#firstName")
    .style.border = ""

    valueFirstName = firstName.target.value;
    console.log(valueFirstName);
   } 
   //sinon envoi d'un message d'erreur
   else {
    //personnalisation du message d'erreur
    document.querySelector("#firstNameErrorMsg")
    .innerHTML = "Le champ doit contenir entre 3 à 25 caractères, et ne doit pas contenir de chiffres et de caractères spéciaux";
    document.querySelector("#firstNameErrorMsg")
    .style.color = "#fff";
    document.querySelector("#firstName")
    .style.border = "solid 2px red"

    valueFirstName = null;
    console.log(valueFirstName);
   }
});

/* --- verification du nom ---*/

lastName.addEventListener("change", (lastName) => {
    //si la valeur saisie répond aux critères
    //Regex: minuscules et majuscules autorisées, 3 à 25 caractères requis
    if (lastName.target.value.match(/^[a-z A-Z \s'-]{3,25}$/)){
     document.querySelector("#lastNameErrorMsg")
     .innerHTML = "";
     document.querySelector("#lastName")
     .style.border = "";
 
     valueLastName = lastName.target.value;
     console.log(valueLastName);
    } 
    //sinon envoi d'un message d'erreur
    else {
     //personnalisation du message d'erreur
     document.querySelector("#lastNameErrorMsg")
     .innerHTML = "Le champ doit contenir entre 3 à 25 caractères, et ne doit pas contenir de chiffres et de caractères spéciaux";
     document.querySelector("#lastNameErrorMsg")
     .style.color = "#fff";
     document.querySelector("#lastName")
     .style.border = "solid 2px red"
 
     valueLastName = null;
     console.log(valueLastName);
    }
 });


 /* --- verification de l'adresse  ---*/

address.addEventListener("change", (address) => {
    //si la valeur saisie répond aux critères
    //Regex: minuscules et majuscules autorisées, 3 à 35 caractères requis
    if (address.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,35}$/)){
     document.querySelector("#addressErrorMsg")
     .innerHTML = "";
     document.querySelector("#address")
     .style.border = ""
 
     valueAddress = address.target.value;
     console.log(valueAddress);
    } 
    //sinon envoi d'un message d'erreur
    else {
     //personnalisation du message d'erreur
     document.querySelector("#addressErrorMsg")
     .innerHTML = "L'adresse comporte au moins un numéro suivi du nom de voie ";
     document.querySelector("#addressErrorMsg")
     .style.color = "#fff";
     document.querySelector("#address")
     .style.border = "solid 2px red"
 
     valueAddress = null;
     console.log(valueAddress);
    }
 });

/* --- verification de la ville  ---*/

city.addEventListener("change", (city) => {
    //si la valeur saisie répond aux critères
    //Regex: minuscules et majuscules autorisées, 3 à 35 caractères requis
    if (city.target.value.match(/^[a-z A-Z \s'-]{3,25}$/)){
     document.querySelector("#cityErrorMsg")
     .innerHTML = "";
     document.querySelector("#city")
     .style.border = ""
 
     valueCity = city.target.value;
     console.log(valueCity);
    } 
    //sinon envoi d'un message d'erreur
    else {
     //personnalisation du message d'erreur
     document.querySelector("#cityErrorMsg")
     .innerHTML = "Le nom de la commune doit contenir 3 lettres minimum et ne pas contenir de chiffre";
     document.querySelector("#cityErrorMsg")
     .style.color = "#fff";
     document.querySelector("#city")
     .style.border = "solid 2px red"
 
     valueCity = null;
     console.log(valueCity);
    }
 });

 /* --- verification de l'Email  ---*/

email.addEventListener("change", (email) => {
    //si la valeur saisie répond aux critères
    //Regex: minuscules et majuscules autorisées, 3 à 35 caractères requis
    if (email.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
     document.querySelector("#emailErrorMsg")
     .innerHTML = "";
     document.querySelector("#email")
     .style.border = "";
 
     valueEmail = email.target.value;
     console.log(valueEmail);
    } 
    //sinon envoi d'un message d'erreur
    else {
     //personnalisation du message d'erreur
     document.querySelector("#emailErrorMsg")
     .innerHTML = "Email non valide, ex: Kanap@contact.fr";
     document.querySelector("#emailErrorMsg")
     .style.color = "#fff";
     document.querySelector("#email")
     .style.border = "solid 2px red"
 
     valueEmail = null;
     console.log(valueEmail);
    }
 });
