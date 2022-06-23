
/*on realise ici une requête de type GET afin de récupérer les produits et pouvoir les integrer
de façon dynamique dans notre homepage*/ 

function productAppear() {
    fetch("http://localhost:3000/api/products")

    .then((res) => {
        if (res.ok){
            return res.json(); 
        } 
    })

    .then((data) => {
    
        for(let product of data){
            console.log(product)
        document
        .getElementById("items")
        .innerHTML += `<a href="./product.html?id=${product._id}">
                            <article>
                            <img src="${product.imageUrl}" alt="${product.altText}, ${product.name}">
                            <h3 class="product name">${product.name}</h3>
                            <p class="productDescription">${product.description}</p>
                            </article>
                        </a>`}
    })

    .catch ((err) => {
        document
        .getElementById("items")
        .innerText = "Nous ne sommes pas parvenu à afficher les éléments attendus, veuillez-vous excuser"; 

        console.log("erreur")
    });
    
};

productAppear (); 



