

document.getElementById("login-submit").addEventListener("click", function (event) {
    event.preventDefault(); // Prevents form submission
    console.log("Submit button clicked!");

    const username = document.getElementById("username");
    const password = document.getElementById("password");

    console.log(username)
    addDataToDB("users", ["johnJoe, johnjim123, test@test.ie"])
    // console.log(password)
}); 