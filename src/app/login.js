
const Minimizebutton = document.getElementById("minBtn")
Minimizebutton.addEventListener('click', function(event){
    window.api.send("toMain", "app/minimize")
})

//CLOSER APP
const Exitbutton = document.getElementById("closeBtn")
Exitbutton.addEventListener('click', function(event){
    window.api.send("toMain", "app/close");
})

const Passord = document.getElementById("ElkjopPassord")

const Indexing = document.getElementById("Login")
Indexing.addEventListener('click', function(event) {

    window.api.send("app/GetLogin", Passord.value);

})

window.addEventListener('keydown', function(event) {
    if(event.key == "Enter") {
        window.api.send("app/GetLogin", Passord.value);
    }
})

const OppdateringBTN = document.getElementById("Oppdatering")

window.api.send("toMain", "get/version");

await window.api.receive("fromMain", (data) => {

    OppdateringBTN.innerHTML = "Versjon " + data;

})
