function orderNumber() {
    
    const orderId = document.getElementById("orderId")
    orderId.innerText = localStorage.getItem("orderId");
  
    // On vide le localStorage 
    localStorage.clear(); 
  }

  orderNumber();
