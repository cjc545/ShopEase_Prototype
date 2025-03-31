document.getElementById("login-submit").addEventListener("click", function (event) {
    event.preventDefault(); // Prevents form submission
    console.log("Submit button clicked!");

    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const email = document.getElementById("email")

    fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify({
            "username": username.value,
            "password": password.value, 
            "email": email.value}),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Connection": "keep-alive",
          "Keep-Alive": "timeout=5"
        }
      });
    
      change_page("products.html");

      
      

    // console.log(username)
    // addDataToDB("users", ["johnJoe, johnjim123, test@test.ie"])
    // console.log(password)
});



function change_page(htmlString){
  window.location.href = htmlString;
}