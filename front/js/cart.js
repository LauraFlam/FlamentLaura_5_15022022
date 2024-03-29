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

// Pour chaque produit dans le panier, on l'ajoute dans le DOM
async function getCart() {
  let listProduit = await getProduct();
  console.log(listProduit);

  let tableauProducts = JSON.parse(localStorage.getItem("product"));
  console.log(tableauProducts);

  let cartItems = document.getElementById("cart__items");
  let montantTotal = 0;
  let quantityTotal = 0;
  for (let i = 0; i < tableauProducts.length; i++) {
    let imageProduct;
    let altTxtProduct;
    console.log(tableauProducts[i].nameProduct);
    for (let product of listProduit) {
      if (product._id == tableauProducts[i]._id) {
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
    //Calcul du nombre d'articles et du montant total
    montantTotal += tableauProducts[i].quantityProduct * priceProduct;
    quantityTotal += parseInt(tableauProducts[i].quantityProduct);
  }
  let totalItems = document.getElementById("totalQuantity");
  let totalPrice = document.getElementById("totalPrice");
  totalItems.innerHTML = quantityTotal;
  totalPrice.innerHTML = montantTotal;

  //Fonction du suppression d'un produit 
  function removeItem() {
    let removeButton = document.querySelectorAll(".deleteItem");
    for (let i = 0; i < removeButton.length; i++) {
      removeButton[i].addEventListener("click", () => {
        tableauProducts.splice(i, 1);
        localStorage.setItem("product", JSON.stringify(tableauProducts));
        location.reload();
      })
    }
  }
  removeItem();

  //Fonction pour changer la quantité d'un produit
  function changeQuantity() {
    let itemQuantity = document.querySelectorAll(".itemQuantity");
    for (let i = 0; i < itemQuantity.length; i++) {
      itemQuantity[i].addEventListener("change", () => {

        if (itemQuantity[i].value <= 0) {
          itemQuantity[i].value = 0;
          tableauProducts.splice(i, 1);
        }
        else if (itemQuantity[i].value > 100) {
          itemQuantity[i].value = 100;
          tableauProducts[i].quantityProduct = 100;
        }

        else {
          tableauProducts[i].quantityProduct = itemQuantity[i].value;
        }
        localStorage.setItem("product", JSON.stringify(tableauProducts));
        location.reload();
      })
    }
  }
  changeQuantity();

}

getCart();

//Fonction d'envoi du formulaire après que toutes les conditions soient verifiées et validées
function sendForm() {
  let form = document.querySelector(".cart__order__form");
  let emailRegEx = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-z]+[.]{1}[a-z]+$');
  let otherRegEx = new RegExp("^[a-zA-Z ,.'-]+$");
  let adressRegEx = new RegExp("^[0-9]{1,3}(?:(?:[,. ])[a-zA-Z]+)+$");

  // Lorsqu'on rempli le formulaire, si l'un des champs est mal rempli ou vide, on affiche une erreur.
  form.email.addEventListener("change", function () {
    validEmail(this);
  });
  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  form.address.addEventListener("change", function () {
    validAddress(this);
  });

  form.city.addEventListener("change", function () {
    validCity(this);
  });

  let validEmail = function (inputEmail) {
    let testEmail = emailRegEx.test(inputEmail.value);
    let emailError = inputEmail.nextElementSibling;
    if (testEmail == true) {
      return true;
    } else {
      emailError.innerHTML = "Veuillez renseigner correctement l'email.";
      return false;
    }
  }

  let validFirstName = function (inputFirstName) {
    let firstNameError = inputFirstName.nextElementSibling;
    let testFirstName = otherRegEx.test(inputFirstName.value);
    if (testFirstName == true) {
      return true;
    } else {
      firstNameError.innerHTML =
        "Veuillez renseigner correctement le prénom.";
      return false;
    }
  };

  let validLastName = function (inputLastName) {
    let lastNameError = inputLastName.nextElementSibling;
    let testLastName = otherRegEx.test(inputLastName.value);
    if (testLastName == true) {
      return true;
    } else {
      lastNameError.innerHTML = "Veuillez renseigner correctement le nom de famille.";
      return false;
    }
  };

  let validAddress = function (inputAddress) {
    let addressError = inputAddress.nextElementSibling;
    let testAddress = adressRegEx.test(inputAddress.value);
    if (testAddress == true) {
      return true;
    } else {
      addressError.innerHTML = "Veuillez renseigner correctement l'adresse.";
      return false;
    }
  };

  let validCity = function (inputCity) {
    let cityError = inputCity.nextElementSibling;
    let testCity = otherRegEx.test(inputCity.value);
    if (testCity == true) {
      return true;
    } else {
      cityError.innerHTML = "Veuillez renseigner correctement la ville.";
      return false;
    }
  };

  // Si le formulaire est valide, on crée un contact avec les éléments du formulaire
  form.addEventListener("submit", function (element) {
    element.preventDefault()
    if (validFirstName && validLastName && validAddress && validCity && validEmail) {

      let contactFirstName = document.getElementById("firstName").value;
      let contactLastName = document.getElementById("lastName").value;
      let contactAddress = document.getElementById("address").value;
      let contactCity = document.getElementById("city").value;
      let contactEmail = document.getElementById("email").value;
      contact = {
        firstName: contactFirstName,
        lastName: contactLastName,
        address: contactAddress,
        city: contactCity,
        email: contactEmail,
      }

      // Envoi de la requête POST au back-end
      // Création de l'entête de la requête
      let data = JSON.parse(localStorage.getItem("product"))._id || [];
      let order = { contact: contact, products: data };
      const options = {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      // Envoie de la requête avec l'en-tête.
      fetch("http://localhost:3000/api/products/order", options)
        .then((result) => result.json())
        .then(function (dataOrder) {
          window.location.href = "confirmation.html?id=" + dataOrder.orderId;
          localStorage.setItem("orderId", dataOrder.orderId);
        }).catch(function (error) {
          console.log(error);
        })

    }
  })
}

sendForm();