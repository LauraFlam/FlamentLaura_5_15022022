async function getProduct(){
    return fetch("http://localhost:3000/api/products")
    .then(function(result){
        if(result.ok){
            return result.json();
        }
    }).catch(function(error){
        console.log(error);
    });
}


async function getCart(){
let listProduit = await getProduct();
console.log(listProduit);   

let tableauProducts = JSON.parse(localStorage.getItem("product"));
console.log(tableauProducts);

let cartItems = document.getElementById("cart__items");
let montantTotal = 0;
let quantityTotal = 0;
for(let i=0; i< tableauProducts.length; i++){
    let imageProduct;
    let altTxtProduct;
    console.log(tableauProducts[i].nameProduct);
    for(let product of listProduit){
        if (product._id == tableauProducts[i]._id){
            imageProduct = product.imageUrl;
            altTxtProduct = product.altTxt;
            priceProduct = product.price;
        }
    }
    cartItems.innerHTML += `<article class="cart__item" data-id="${tableauProducts[i]._id}" data-color="${tableauProducts[i].colorProduct}">` +
            
    `<div class="cart__item__img">` +
    `<img src="${imageProduct}" alt="${altTxtProduct}" />` +
    `</div>` +

    `<div class="cart__item__content">` +
    `<div class="cart__item__content__description">` +
        `<h2>${tableauProducts[i].nameProduct}</h2>` +
        `<p>${tableauProducts[i].colorProduct}</p>` +
        `<p>${priceProduct}€</p>` +
    `</div>` +

    `<div class="cart__item__content__settings">` +
        `<div class="cart__item__content__settings__quantity">` +
        `<p>${tableauProducts[i].quantityProduct} </p>` +
        `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${tableauProducts[i].quantityProduct}" />` +
    `</div>` +
        `<div class="cart__item__content__settings__delete">` +
        `<p class="deleteItem">Supprimer</p>` +
        `</div>` +
    `</div>` +
    `</div>` +
    `</article> `;
    montantTotal += tableauProducts[i].quantityProduct * priceProduct;
    quantityTotal += parseInt(tableauProducts[i].quantityProduct);
    }
    let totalItems = document.getElementById("totalQuantity");
    let totalPrice = document.getElementById("totalPrice");
    totalItems.innerHTML = quantityTotal;
    totalPrice.innerHTML = montantTotal;

}
