document.getElementById("LoginUpdate").style.backgroundColor = "#131215"

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

let MakePDF = document.getElementById('LAGPDF');
let JottaMail = document.getElementById('JottaEpost');
let JottaPass = document.getElementById('JottaPassord');
let McAfeeMail = document.getElementById('McafeeEpost');
let McAfeePass = document.getElementById('McafeePassord');
let OfficeMail = document.getElementById('OfficeEpost');
let OfficePass = document.getElementById('OfficePassord');

MakePDF.addEventListener('click', function(event) {
    MakePDF.innerHTML = 'Loading...';
    setTimeout(branadas, 4000);
        function branadas() {
            MakePDF.innerHTML = 'Lag PDF';
        }
    window.api.send("app/lagpdf", [JottaMail.value, JottaPass.value, McAfeeMail.value, McAfeePass.value, OfficeMail.value, OfficePass.value]);
})