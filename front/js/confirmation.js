//Comme pour la page produit, on récupère l'order-ID pour l'afficher sur la page
const urlOrder = window.location.search;
console.log(urlOrder)
const urlParams = new URLSearchParams(urlOrder);
console.log(urlParams)
const newOrderId = urlParams.get("orderId"); 
console.log(newOrderId)

//intégration du numéro de commande 
let orderIdIntegrated = document.querySelector("#orderId")
.innerHTML += `<span id="orderId">${newOrderId}</span></p>` 
