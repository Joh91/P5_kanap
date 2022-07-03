

//cette fonction va nous permettre d'afficher les produits contenus dans le localstorage dans notre page panier
function cartAppear() {
    let addCart = JSON.parse(localStorage.getItem("productsInCart"));
        console.log(addCart)
    
    let cart__items = document.querySelector("#cart__items"); 
        if (addCart && cart__items) {
           cart__items.innerHTML = "";
           Object.values(addCart).map(item => {
            cart__items.innerHTML += `<article class="cart__item" data-id="${item._id}" data-color="${item.colors}">
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
                                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                                                </div>
                                                <div class="cart__item__content__settings__delete">
                                                    <p class="deleteItem">Supprimer</p>
                                                </div>
                                            </div>
                                        </article>`
           });
        }
      
    
}

cartAppear(); 


