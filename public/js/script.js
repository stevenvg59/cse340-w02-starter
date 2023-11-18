const addBtn = document.getElementById("addClassification")
addBtn.addEventListener("click", function() {
    var userInput = document.getElementById("classification_name").value
    var regExp = /^[a-zA-Z]+$/
    console.log("Clicking");

    if(userInput.match(regExp))
    {
        console.log("Valid input")
    }
    else {
        console.log("Invalid input")
    }
});


const pswBtn = document.querySelector("#pswBtn");
pswBtn.addEventListener("click", function() {
    const pswInput = document.getElementById("password");
    const pswType = pswInput.getAttribute("type");
    if (pswType == "password"){
        pswInput.setAttribute("type", "text");
        pswBtn.innerHTML = "Hide Password";
    } else {
        pswInput.setAttribute("type", "password");
        pswBtn.innerHTML = "Show Password";
    }
});

