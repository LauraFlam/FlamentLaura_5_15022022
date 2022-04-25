//Récupération d'un seul produit dans l'API en fonction de l'id
async function getProduct(productId) {
    return fetch("http://localhost:3000/api/products/" + productId)
        .then(function (result) {
            if (result.ok) {
                //Récupération des caractéristiques du produit en fonction de son id
                let title = document.getElementById("title");
                let price = document.getElementById("price");
                let description = document.getElementById("description");
                let img = document.querySelector(".item__img");
                let baliseImg = document.createElement('img');
                let colorSelect = document.getElementById("colors");

                return result.json()
                    .then(data => {
                        console.log(data)
                        title.innerHTML = data.name;
                        price.innerHTML = data.price;
                        description.innerHTML = data.description;
                        baliseImg.src = data.imageUrl;
                        img.appendChild(baliseImg);

                        for (let oneColor of data.colors) {
                            colorSelect.innerHTML += `<option value="${oneColor}">${oneColor}</option>`;
                        }

                    });
            }
        }).catch(function (error) {
            console.log(error);
        });
}

const paramId = new URLSearchParams(window.location.search);
const productId = paramId.get("id");
let result = getProduct(productId);
console.log(result);

let addToCart = document.getElementById("addToCart");

//Eléments à ajouter dans le panier lors du clic de l'utilisateur 
addToCart.addEventListener("click", function cart() {
    let product = {
        _id: productId,
        nameProduct: document.getElementById("title").textContent,
        colorProduct: document.getElementById("colors").value,
        quantityProduct: document.getElementById("quantity").value,
    }

    let isNotPresent = true;
    let tableauProducts = [];
    if (localStorage.getItem("product") != null) {
        tableauProducts = JSON.parse(localStorage.getItem("product"));

        for (let i = 0; i < tableauProducts.length; i++) {
            if (tableauProducts[i].nameProduct == product.nameProduct &&
                tableauProducts[i].colorProduct == product.colorProduct) {
                tableauProducts[i].quantityProduct = parseInt(tableauProducts[i].quantityProduct) + parseInt(product.quantityProduct);
                localStorage.setItem("product", JSON.stringify(tableauProducts));
                isNotPresent = false
            }
        }
        if (isNotPresent) {
            tableauProducts.push(product);
            localStorage.setItem("product", JSON.stringify(tableauProducts));
        }
    }

    else {
        tableauProducts.push(product);
        localStorage.setItem("product", JSON.stringify(tableauProducts));
    }
})
