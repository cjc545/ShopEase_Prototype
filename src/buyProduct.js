

var user = {}

document.querySelectorAll(".buy-button").forEach(button => {
  button.addEventListener("click", async function (event){
    const purchaseEmail = await getUserEmail();
    var product = ""
    if(button.closest(".product-container-case") != null)
      product = "Graphics Card";
    else if(button.closest(".product-container-rgb") != null)
      product = "RGB Lights";
    else
      product = "Graphics Card";
    console.log(purchaseEmail);
    console.log(product);
    
    await addOrderToDB(product, purchaseEmail);
    await change_page("purchaseConfirmed.html");

  });
});

function change_page(htmlString){
    window.location.href = htmlString;
}

function getUserEmail(){
  let userEmail = ""
  const request = new Request('http://localhost:3000/users', {
    headers: new Headers({
        "Content-type": "text/json; charset=UTF-8",
        "Connection": "keep-alive",
        "Keep-Alive": "timeout=5"
    }),
    method: 'GET'
  });
  return new Promise(function (resolve) {
    fetch(request).then((response) => {
      response.json().then((data) => {
        const users = data.data;
        const length = users.length;
        userEmail = users[length - 1].email;
        console.log(userEmail);
        resolve(userEmail);
      });
    });
  })


  

  return userEmail
}

function addOrderToDB(product, email){
  fetch("http://localhost:3200/orders", {
    method: "POST",
    body: JSON.stringify({
        "Product": product,
        "CustomerEmail": email}),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Connection": "keep-alive",
      "Keep-Alive": "timeout=5",
      "Origin": "http://localhost:2000"
    }
  });
    
}