   
const urlProduct = window.location.search;
const urlParams = new URLSearchParams(urlProduct);
const newUrl = urlParams.get("id"); 
console.log(newUrl)
    
function productAppear() {
fetch(`http://localhost:3000/api/products/${newUrl}`)

    //première promesse dans laquelle on demande de retourner les résultats de la requête en JSON 
    .then((res) => {
        if (res.ok){
            return res.json(); 
        } 
    })

    //deuxième promesse qui s'execute si la première est "true" 
    .then((data) => {
       let productData = data; 

       if (productData === data){
        console.log("true")

        document
        .querySelector(".item__img")
        .innerHTML = `<img src="${productData.imageUrl}" alt="Photographie d'un canapé"></img>`

        document
        .querySelector(".item__content__titlePrice")
        .innerHTML = `<h1 id="title">${productData.name}</h1>
        <p>Prix : <span id="price">${productData.price}</span>€</p>`

        document
        .querySelector(".item__content__description")
        .innerHTML = `<p id="description">${productData.description}</p>`

        for (let colors of productData.colors){
            document
        .querySelector("#colors").innerHTML += `<option value="${colors}">${colors}</option>` 
        }
       }
  
    })
    

    //Active dans le cas où notre première promesse est "false"
    .catch ((err) => {
        document
        .getElementsByClassName("item")
        .innerText = "Nous ne sommes pas parvenu à afficher les éléments attendus, veuillez-vous excuser"; 

        console.log("erreur")
    });
    
};



//declaration de la fonction productAppear
productAppear(); 
