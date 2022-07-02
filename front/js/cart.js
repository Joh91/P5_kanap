//On récupère notre élément enregistré dans le localstorage
let addCart = JSON.parse(localStorage.getItem("productsInCart"));

//cette fonction va nous permettre d'afficher les produits contenus dans le localstorage dans notre page panier
async function cartAppear() {
   
    if (addCart) {
        await addCart
        
        document
        .querySelector("#cart__items")
        .innerHTML += `<article class="cart__item" data-id="${addCart._id}" data-color="${addCart.colors}">
                        <div class="cart__item__img">
                            <img src="${addCart.imageUrl}" alt="${addCart.altTxt}">
                        </div>
                        <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${addCart.name}</h2>
                            <p>${addCart.colors}</p>
                            <p>${addCart.price}</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : ${addCart.quantity} </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </article>`   
    } 
}

cartAppear(); 

