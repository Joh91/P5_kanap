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
                                                                <p class="deleteItem">Supprimer</p>
                                                            </div>
                                                        </div>
                                                    </article>`) 
    totalCart(addCart);                                            
}
cartAppear(); 
addQuantity();  

//Définition du nombre d'articles et du coût total du panier
function totalCart(){
    let CartRegistered = JSON.parse(localStorage.getItem("productsInCart"));
    let totalCartQty = 0;
    let totalCartPrice = 0; 

    //la boucle récupère les quantités et les prix de tous les articles enregistrés dans le localstorage
    for (let i = 0; i < CartRegistered.length; i++){

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

    if (totalCart && totalCost && totalQtyCart){
        totalQtyCart.innerHTML = `<p>Total (<span id="totalQuantity">${totalCart}</span> articles) : <span id="totalPrice">${totalCost}</span> €</p>`;
    }
}

function addQuantity(){
    let cartRegistered = JSON.parse(localStorage.getItem("productsInCart"));
    const qtyButton = document.querySelectorAll('.itemQuantity');
    qtyButton.forEach((quantity) => {
        quantity.addEventListener("change", (e) => {
            
            for (item of cartRegistered){
                console.log(qtyButton);
                if (item._id == quantity.dataset.id && item.color == quantity.dataset.color){
                    item.quantity = parseInt(e.target.value);
                    localStorage.setItem("productsInCart", JSON.stringify(cartRegistered));
                    totalCart();
                }
            }
        })
    }) 
}



 

 


