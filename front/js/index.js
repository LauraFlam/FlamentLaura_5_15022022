//Insertion des produits dans la page d'accueil à l'aide de 'fetch()'
async function getProduct() {
    return fetch("http://localhost:3000/api/products")
        .then(function (result) {
            if (result.ok) {
                return result.json();
            }
        }).catch(function (error) {
            console.log(error);
        });
}

async function main() {
    let listProduit = await getProduct();
    console.log(listProduit);
    let sectionItems = document.getElementById("items");
    for (let product of listProduit) {
        console.log(product.name);
        // Répartir les données de chaque produit dans le DOM
        sectionItems.innerHTML += `<a href="./product.html?id=${product._id}">` +
            `<article>` +
            `<img src="${product.imageUrl}" alt="${product.altTxt}">` +
            `<h3 class="productName">${product.name}</h3>` +
            `<p class="productDescription">${product.description}</p>` +
            `</article>` +
            `</a>`
    }
}
main();

