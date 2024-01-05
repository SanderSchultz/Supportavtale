document.getElementById("SupportAvtale").style.backgroundColor = "#131215";
document.getElementById("SupportAvtale").style.color = "#FFFFFF";

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

const KundeMail = document.getElementById("kundensEpost")

const KundeNavn = document.getElementById("kundensNavn")

const KundePass = document.getElementById("kundensPassord")

var j60 = document.getElementById('Jotta60')
var j36 = document.getElementById('Jotta36')
var j24 = document.getElementById('Jotta24')
var j12 = document.getElementById('Jotta12')
var j06 = document.getElementById('Jotta06')

j36.checked = true

j60.value = false
j36.value = true
j24.value = false
j12.value = false
j06.value = false

var mc60 = document.getElementById('Mcafee60')
var mc36= document.getElementById('Mcafee36')
var mc24 = document.getElementById('Mcafee24')
var mc12 = document.getElementById('Mcafee12')
var mc06 = document.getElementById('Mcafee06')

mc36.checked = true

mc60.value = false
mc36.value = true
mc24.value = false
mc12.value = false
mc06.value = false

var RFcheck = document.getElementById('rf')

RFcheck.checked = true
RFcheck.value = true

RFcheck.addEventListener('click', function(event){
    if (RFcheck.checked){
        RFcheck.value = true
    }
    else {
        RFcheck.value = false
    }
})

var PDFcheck = document.getElementById('pdf')

PDFcheck.checked = true
PDFcheck.value = true

PDFcheck.addEventListener('click', function(event){
    if (PDFcheck.checked){
        PDFcheck.value = true
    }
    else {
        PDFcheck.value = false
    }
})

function cbChange(obj) {

    var cbs = document.getElementsByClassName("Jottamarken");

    if(!obj.checked){
        obj.checked = false;
        obj.value = false;
    }
    else{
        for (var i = 0; i < cbs.length; i++) {
            cbs[i].checked = false;
            cbs[i].value = false;
        }
        obj.checked = true;
        obj.value = true;
    }

}

function cbChange2(obj) {

    var cbs = document.getElementsByClassName("Mcafeen");

    if(!obj.checked){
        obj.checked = false;
        obj.value = false;
    }
    else{
        for (var i = 0; i < cbs.length; i++) {
            cbs[i].checked = false;
            cbs[i].value = false;
        }
        obj.checked = true;
        obj.value = true;
    }

}

j60.addEventListener('click', function(event){
    cbChange(this);
})

j36.addEventListener('click', function(event){
    cbChange(this);
})

j24.addEventListener('click', function(event){
    cbChange(this);
})

j12.addEventListener('click', function(event){
    cbChange(this);
})

j06.addEventListener('click', function(event){
    cbChange(this);
})

mc60.addEventListener('click', function(event){
    cbChange2(this);
})

mc36.addEventListener('click', function(event){
    cbChange2(this);
})

mc24.addEventListener('click', function(event){
    cbChange2(this);
})

mc12.addEventListener('click', function(event){
    cbChange2(this);
})

mc06.addEventListener('click', function(event){
    cbChange2(this);
})

//STARTS SA OPPSETT PC
const SArun = document.getElementById("START")
SArun.addEventListener('click', function(event) {
    
    if (KundeMail.value.length !== 0 && KundeNavn.value.length !== 0 && KundePass.value.length !== 0) {
        SArun.innerText = 'Loading...';
        
        window.api.send("app/SArun", [KundeMail.value, KundeNavn.value, KundePass.value, j60.value, j36.value, j24.value, j12.value, j06.value, mc60.value, mc36.value, mc24.value, mc12.value, mc06.value, RFcheck.value, PDFcheck.value]);

        setTimeout(branadas, 8000);
        function branadas() {
            SArun.innerHTML = 'START';
        }
    }
})
