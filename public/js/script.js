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