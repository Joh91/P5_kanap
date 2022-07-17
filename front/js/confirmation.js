//Comme pour la page produit, on récupère l'order-ID pour l'afficher sur la page
function getOrderId(){
    const urlOrder = window.location.search;
    console.log(urlOrder)
    const urlParams = new URLSearchParams(urlOrder);
    console.log(urlParams)
    const newOrderId = urlParams.get("orderId"); 
    console.log(newOrderId)

    //déclaration de OrderIdDisplay qui récupère la valeur de newOrderId 
    orderIdDisplay(newOrderId)
};
  
//intégration du numéro de commande dans la page confirmation 
function orderIdDisplay(newOrderId){
    let orderIdIntegrated = document.querySelector("#orderId")
    .innerHTML += `<span id="orderId">${newOrderId}</span></p>`;
};

//Déclaration de getOrderId 
getOrderId(); 
