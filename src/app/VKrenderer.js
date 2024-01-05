document.getElementById("Verktøy").style.backgroundColor = "#131215";
document.getElementById("Verktøy").style.color = "#FFFFFF";

//KJØRER RTG
const RTG = document.getElementById("RTG")
RTG.addEventListener('click', function(event) {
    window.api.send("toMain", "app/rtg");
})

const Remotefix = document.getElementById("Remotefix")
Remotefix.addEventListener('click', function(event) {
    window.api.send("toMain", "app/remotefix");
})

const Cloud = document.getElementById("Cloud")
Cloud.addEventListener('click', function(event) {
    window.api.send("toMain", "app/cloud");
})

const Benchmark = document.getElementById("Benchmark")
Benchmark.addEventListener('click', function(event) {
    window.api.send("toMain", "app/benchmark");
})

const Gaming = document.getElementById("Gaming")
Gaming.addEventListener('click', function(event) {
    window.api.send("toMain", "app/gaming");
})

// BYTTER TIL VERKTØY HTML
const VKBUTTON = document.getElementById("Verktøy")
VKBUTTON.addEventListener('click', function(event) {
    window.api.send("toMain", "app/htmlvk");
})

const Minimizebutton = document.getElementById("minBtn")
Minimizebutton.addEventListener('click', function(event){
    window.api.send("toMain", "app/minimize");
})

//BYTTER TIL SUPPORT HTML
const SupportButton = document.getElementById("SupportAvtale")
SupportButton.addEventListener('click', function(event) {
    window.api.send("toMain", "app/supporthtml");
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
