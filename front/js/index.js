
/*On realise ici une requête de type GET afin de récupérer les produits et pouvoir les integrer
de façon dynamique dans notre homepage*/ 

function productsAppear() {
    fetch("http://localhost:3000/api/products")

    //première promesse dans laquelle on demande de retourner les résultats de la requête en JSON 
    .then((res) => {
        if (res.ok){
            return res.json(); 
        } 
    })

    //deuxième promesse qui s'execute si la première est "true" 
    .then((data) => {
    
        //déclaration d'une boucle qui va répéter la création des balises et l'ajout des données dans la section "items" selon le nombre de produits
        for(let products of data){
        document
        .getElementById("items")
        .innerHTML += `<a href="./product.html?id=${products._id}">
                            <article>
                            <img src="${products.imageUrl}" alt="${products.altText}, ${products.name}">
                            <h3 class="product name">${products.name}</h3>
                            <p class="productDescription">${products.description}</p>
                            </article>
                        </a>`}
    })

    //Active dans le cas où notre première promesse est "false"
    .catch ((err) => {
        document
        .getElementById("items")
        .innerText = "Nous ne sommes pas parvenu à afficher les éléments attendus, veuillez-vous excuser"; 

        console.log("erreur")
    });
};

//declaration de la fonction productAppear
productsAppear(); 



