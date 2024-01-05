document.getElementById("Settings").style.backgroundColor = "#131215"
document.getElementById("Settings").style.color = "#FFFFFF"

// BYTTER TIL VERKTØY HTML
const VKBUTTON = document.getElementById("Verktøy")
VKBUTTON.addEventListener('click', function(event) {
    window.api.send("toMain", "app/htmlvk")
})

const Minimizebutton = document.getElementById("minBtn")
Minimizebutton.addEventListener('click', function(event){
    window.api.send("toMain", "app/minimize")
})

//BYTTER TIL SUPPORT HTML
const SupportButton = document.getElementById("SupportAvtale")
SupportButton.addEventListener('click', function(event) {
    window.api.send("toMain", "app/supporthtml")
})

//BYTTER TIL PDF HTML
const PDFButton = document.getElementById("LoginUpdate")
PDFButton.addEventListener('click', function(event) {
    window.api.send("toMain", "app/pdfhtml");
})

//CLOSER APP
const Exitbutton = document.getElementById("closeBtn")
Exitbutton.addEventListener('click', function(event){
    window.api.send("toMain", "app/close");
})

//BYTTER TIL HW HTML
const SettingBTN = document.getElementById("Settings")
SettingBTN.addEventListener('click', function(event) {
    window.api.send("toMain", "app/settingshtml");
})

const OppdateringBTN = document.getElementById("Oppdatering")
window.api.send("toMain", "get/version");
await window.api.receive("fromMain", (data) => {
    OppdateringBTN.innerHTML = "Versjon " + data;
})

const OppdaterLoginbtn = document.getElementById('OppdaterLogin');

let ElkjopMail = document.getElementById('ElkjopEpost');
let ElkjopPass = document.getElementById('ElkjopPassord');
let McAfeeMail = document.getElementById('McafeeEpost');
let McafeePass = document.getElementById('McafeePassord');

//OPPDATERER LOGIN INFORMASJON VED Å TRYKKE PÅ KNAPPEN
OppdaterLoginbtn.addEventListener('click', function(event) {
    window.api.send("app/OppdaterLogin", [ElkjopMail.value, ElkjopPass.value, McAfeeMail.value, McafeePass.value]);
})
