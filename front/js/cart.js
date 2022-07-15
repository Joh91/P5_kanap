/* -- cette fonction va nous permettre d'afficher les produits contenus dans le localstorage dans notre page panier --*/
function cartAppear(){
    //récupération des produits enregistrés dans le localStorage
    let addCart = JSON.parse(localStorage.getItem("productsInCart"));

    for(let i = 0; i < addCart.length; i++){
        fetch(`http://localhost:3000/api/products/${addCart[i]._id}`)
        .then((res) => {
            return res.json();
        })
        
        .then((data) => { 
            let price = data.price;
            let cart__items = document.querySelector("#cart__items");
            cart__items.innerHTML += `<article class="cart__item" data-id="${addCart[i]._id}" data-color="${addCart[i].colors}">
                                                                <div class="cart__item__img">
                                                                    <img src="${data.imageUrl}" alt="${data.txtAlt}">
                                                                </div>
                                                                <div class="cart__item__content">
                                                                <div class="cart__item__content__description">
                                                                    <h2>${addCart[i].name}</h2>
                                                                    <p>${addCart[i].color}</p>
                                                                    <p>${data.price}€</p>
                                                                </div>
                                                                <div class="cart__item__content__settings">
                                                                    <div class="cart__item__content__settings__quantity">
                                                                        <p>Qté : ${addCart[i].quantity} </p>
                                                                        <input type="number" data-id="${addCart[i]._id}" data-color="${addCart[i].color}" class="itemQuantity" name="itemQuantity" min="1" max="100" value="1">
                                                                    </div>
                                                                    <div class="cart__item__content__settings__delete">
                                                                        <p class="deleteItem" data-id="${addCart[i]._id}" data-color="${addCart[i].color}">Supprimer</p>
                                                                    </div>
                                                                </div>
                                                            </article>`;
        })
    
            .catch ((err) => {
            document
            .querySelector(".cart")
            .innerText += "Nous ne sommes pas parvenu à afficher les éléments attendus, veuillez-vous excuser"; 
    
            console.log("erreur")
        });  
    }   
}

//Déclaration des fonctions 
cartAppear();
getPriceItem(); 
addQuantity();
deleteItem();
FormCheck (); 

function getPriceItem(){
    fetch(`http://localhost:3000/api/products`)
    .then((res) => {
        return res.json();
    })
    
    .then((data) => { 
        for (i = 0; i < data.length; i++){
            let price = data[i].price;
            totalCart(price);
        }
    })
}


/* --- Définition du nombre d'articles et du coût total du panier --- */ 
function totalCart(price) {
    let CartRegistered = JSON.parse(localStorage.getItem("productsInCart"));
    let priceItem = price;
    console.log("prix", priceItem); 
    let totalCartQty = 0;
    let totalCartPrice = 0;

    //la boucle récupère les quantités et les prix de tous les articles enregistrés dans le localstorage
    for (let i = 0; i < CartRegistered.length; i++) {
        //Nouvelle clé/valeur du localStorage -- Comptabilise la quantité totale/ articles et leur quantité ajoutés 
        totalCartQty += CartRegistered[i].quantity;
        console.log("TCQ", totalCartQty);
        localStorage.setItem("totalQuantity", JSON.stringify(totalCartQty));

        //Nouvelle clé/valeur du localStorage -- Comptabilise le coût total/ articles et selon leur quantité ajoutés 
        totalCartPrice += (CartRegistered[i].quantity * priceItem);
        console.log("TCP", totalCartPrice);
        localStorage.setItem("totalPrice", JSON.stringify(totalCartPrice));
    }
    //Déclaration de la fonction TotalCartAppear
    totalCartAppear();
}


function totalCartAppear(){
    //récupération des valeurs enregistrées dans le localStorage que l'on intègre dans deux nouvelles variables 
    let totalCart = JSON.parse(localStorage.getItem("totalQuantity"));
    let totalCost = JSON.parse(localStorage.getItem("totalPrice"));
    //récupération de la class et intégration des valeurs dans les éléments HTML 
    let totalQtyCart = document.querySelector(".cart__price")
    totalQtyCart.innerHTML = `<p>Total (<span id="totalQuantity">${totalCart}</span> articles) : <span id="totalPrice">${totalCost}</span> €</p>`;
}

function addQuantityButton(){
    //récupération des produits enregistrés dans le localstorage
    let cartRegistered = JSON.parse(localStorage.getItem("productsInCart"));
    console.log("qté", cartRegistered);
    // récupération des inputs et création d'une boucle afin d'itérer la création d'un event pour chacun d'eux 
    const qtyButton = document.querySelectorAll('.itemQuantity');
    qtyButton.forEach((quantity) => {
        quantity.addEventListener("change", (e) => {
            addQuantityButton(); 
        })
    })
}

function addQuantityOption(){
    for (item of cartRegistered) {
        console.log("test0", item); 
        //si l'id et la couleur du produit est égale à celle du dataset de notre input
        if (item._id == quantity.dataset.id && item.color == quantity.dataset.color) {
            // console.log("test", item.quantity); 
            item.quantity = parseInt(e.target.value);
            localStorage.setItem("productsInCart", JSON.stringify(cartRegistered));
            //déclaration de totalCart afin de recompter le résultat après modification 
            totalCart();
        }
    }
}

//Suppression d'un element à l'aide du bouton supprimer dans le panier 
function deleteItem(){
    //récupération du bouton supprimer
    const deletedButton = document.querySelectorAll(".deleteItem");
    //ForEach répète la création de l'évènement sur le bouton par le nombre d'élément dans notre panier
    deletedButton.forEach((items) => {
        items.addEventListener("click", () => {
            let cartRegistered = JSON.parse(localStorage.getItem("productsInCart"));
            let newCart = [];
            
            //si le localstorage ne detient que un seul item on supprime celui-ci avec removeItem 
            if (cartRegistered.length == 1) {
                return (
                    localStorage.removeItem("productsInCart"), 
                    console.log("hello"),
                    //permet de forcer l'actualisation de la page
                    window.location.href = "cart.html"
                );
            } else  {
                /*-Utilisation de filter pour la suppression des items
                **on récupère les produits du localstorage; filter récupère les éléments dans l'array et les déclare dans element 
                *** dataset.id et dataset.color permettent de distinguer les bouton supprimer et de créer une comparaison 
                 */
                newCart = cartRegistered.filter ((element => {
                    /* - si l'id et la couleur de l'un des produits du panier est contraire à l'id et/ou 
                    la couleur rattachés au bouton supprimer on conserve les éléments dans un nouveau tableau - */ 
                 if (element._id != items.dataset.id || element.color != items.dataset.color){
                    return true; 
                    }
                }));
                //le nouveau array est sauvegardé dans le localstorage, la page actualisée
                localStorage.setItem("productsInCart", JSON.stringify(newCart));
                window.location.href = "cart.html";
            };
        });
    });
}



/*------------------------Gestion du formulaire --------------------*/ 
//on déclare des variables pour chaque input afin de les récupérer 

function FormCheck () {
    let valueForm = []; 
    
    //Déclaration des fonctions
    firstName(valueForm);
    lastName(valueForm);
    address(valueForm);
    city(valueForm);
    email(valueForm);
    //Déclaration de submit dans FormCheck() pour récupérer valueForm 
    submit(valueForm);
    
    /* --- verification du prénom ---*/
    function firstName (valueForm) {
        const firstName = document.querySelector("#firstName");
        firstName.addEventListener("change", (firstName) => {
            //si la valeur saisie répond aux critères
            //Regex: minuscules et majuscules autorisées, 3 à 25 caractères requis
            if (firstName.target.value.match(/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœA-Z\s'-]{3,25}$/)){
                document.querySelector("#firstNameErrorMsg")
                .innerHTML = "";
                document.querySelector("#firstName")
                .style.border = ""
        
                let valueFirstName = firstName.target.value
                valueForm.push(valueFirstName);
                console.log(valueForm);
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
        
                let valueFirstName = null;
                console.log(valueFirstName);
            }
            });
    }
   
    /* --- verification du nom ---*/
    function lastName (valueForm) {
        const lastName = document.querySelector("#lastName");
        lastName.addEventListener("change", (lastName) => {
            //si la valeur saisie répond aux critères
            //Regex: minuscules et majuscules autorisées, 3 à 25 caractères requis
            if (lastName.target.value.match(/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœA-Z\s'-]{3,25}$/)){
            document.querySelector("#lastNameErrorMsg")
            .innerHTML = "";
            document.querySelector("#lastName")
            .style.border = "";
        
            let valueLastName = lastName.target.value;
            valueForm.push(valueLastName);
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
        
            let valueLastName = null;
            console.log(valueLastName);
            }
        });
    }
    
    /* --- verification de l'adresse  ---*/
    function address (valueForm){
        const address = document.querySelector("#address");
        address.addEventListener("change", (address) => {
            //si la valeur saisie répond aux critères
            //Regex: minuscules et majuscules autorisées, 3 à 35 caractères requis
            if (address.target.value.match(/^[0-9]{1,3} [/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœA-Z\s]{3,35}$/)){
            document.querySelector("#addressErrorMsg")
            .innerHTML = "";
            document.querySelector("#address")
            .style.border = ""
        
            let valueAddress = address.target.value;
            valueForm.push(valueAddress);
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
        
            let valueAddress = null;
            console.log(valueAddress);
            }
        });
    }
    
    /* --- verification de la ville  ---*/
    function city (valueForm) {
        const city = document.querySelector("#city");
        city.addEventListener("change", (city) => {
            //si la valeur saisie répond aux critères
            //Regex: minuscules et majuscules autorisées, 3 à 35 caractères requis
            if (city.target.value.match(/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœA-Z\s'-]{3,25}$/)){
            document.querySelector("#cityErrorMsg")
            .innerHTML = "";
            document.querySelector("#city")
            .style.border = ""
        
            let valueCity = city.target.value;
            valueForm.push(valueCity);
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
        
            let valueCity = null;
            console.log(valueCity);
            }
        });
    }
    
    /* --- verification de l'Email  ---*/
    function email (valueForm){
        const email = document.querySelector("#email");
        email.addEventListener("change", (email) => {
            //si la valeur saisie répond aux critères
            //Regex: minuscules et majuscules autorisées, 3 à 35 caractères requis
            if (email.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
            document.querySelector("#emailErrorMsg")
            .innerHTML = "";
            document.querySelector("#email")
            .style.border = "";
        
            let valueEmail = email.target.value;
            valueForm.push(valueEmail);
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
        
            let valueEmail = null;
            console.log(valueEmail);
            }
        });
    } 
}

/* -------------- Confirmation de commande -----------------*/ 
 //recupération du submit et création de l'évènement 
 function submit(valueForm){
    //récupération de l'id du bouton commander
    const formContact = document.querySelector("#order");
    //création d'un évènement
    formContact.addEventListener("click", (e) => {
        // e.preventDefault(); 
        console.log(valueForm); 

        //si les valeurs retournées pour chaque input sont différentes de null et intégrées dans valueForm[]
        if(valueForm){
            /* 1 * ----- récupération des valeurs dans valueForm [], insertion de celles-ci dans des variables -----*/
            let valueFirstName = valueForm[0];
            let valueLastName = valueForm[1];
            let valueAddress = valueForm[2];
            let valueCity = valueForm[3];
            let valueEmail = valueForm[4]; 
            console.log("ValueForm[n]", valueFirstName)

            /* 2 * ---création de l'array ID-produit---*/ 
            let orderItems = JSON.parse(localStorage.getItem("productsInCart"));
            let orderId = []; 
            //on injecte chaque id-produits du localstorage dans l'array orderId 
            orderItems.forEach((items) => {
                orderId.push(items._id);
            });

            /* 3 * ----création de l'object contact + array----*/ 
            const orderFinal = {
                contact: {
                firstName: valueFirstName,
                lastName: valueLastName,
                address: valueAddress,
                city: valueCity,
                email: valueEmail, 
                },
                products: orderId, 
            };
            console.log(orderFinal);

            //Déclaration de la fonction sendOrder()
            sendOrder(orderFinal);

        } else {
            alert("Veuillez compléter le formulaire intégralement");
        }
    });
 }
 
 
function sendOrder (orderFinal){
    //Si orderFinal (object contact + tableau id-produit) est true 
    if (orderFinal) {
        //Envoi des informations et demande à l'API de retourner l'order-id 
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers : {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(orderFinal)
        })
        .then((res) => {
            if (res.ok){
                return res.json();
            }
        })
        .then((data) => {
            //l'order-ID se trouve désormais dans data
            console.log(data);
            //modification de l'url afin d'envoyer la réponse à notre page confirmation
            window.location.href = `./confirmation.html?orderId=${data.orderId}`;
            console.log(window.location.href)
        })
        .catch((err) => {
            console.log("erreur");
            alert("Une erreur est survenue, veuillez réessayer")
        })
    }
}







