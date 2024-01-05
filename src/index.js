
const { app, BrowserWindow, ipcMain } = require("electron");

const path = require("path");
const fs = require("fs");
const { dialog } = require('electron');
const fetch = require('node-fetch');
const { exec } = require("child_process");
const child = require('child_process').execFile;
const CryptoJS = require("crypto-js");

//HENTER USER-SETTINGS///////////////////////////////
const { 
    getUserSettings, 
    getUserSettings2, 
    getUserSettings3, 
    getUserSettings4, 
    saveSettings, 
    saveSettings2, 
    saveSettings3, 
    saveSettings4, 
    getversion, 
    saveversion
} = require("./app/setting.js");

app.whenReady().then(Loadingscreen);

//SER ETTER OPPDATERING///////////////////////////////
async function check_for_update() {

    const version = getversion();
        
    const url = 'url'

    const response = await fetch(url);

    const body = await response.text();

    if(parseFloat(body) > parseFloat(version)){
        function confirmAction() {

            dialog.showMessageBox({
                type: 'question',
                buttons: ['Ja', 'Nei'],
                title: 'Oppdatering tilgjengelig!',
                message: 'Vil du oppdatere nå?',
                cancelId: 1
            }).then(result => {
                if (result.response === 0) {
                    saveversion(parseFloat(title.text()));
                    exec(process.env.PORTABLE_EXECUTABLE_DIR + '/appdata/update.exe');
                }
            })
        }
        confirmAction();
    }
}

//LOADING SCREEN/////////////////////////////////////
function Loadingscreen () {
    
    loadingwindow = new BrowserWindow({
        width: 290,
        height: 200,
        resizable: false,
        autoHideMenuBar: true,
        frame: false,
        show: true,
        transparent: true,
        skipTaskbar: true,
    })

    loadingwindow.loadFile(path.join(__dirname, "/app/Loadingscreen.html"));

    setTimeout(() => {
        main(), loadingwindow.close();
    }, 2500);

    setTimeout(() => {
        check_for_update();
    }, 3000);
}

//MAIN WINDOW////////////////////////////////////////
function main () {

    const user_settings_remote = getUserSettings ();
    const user_settings_remote2 = getUserSettings2 ();
    const user_settings_remote3 = getUserSettings3 ();
    const user_settings_remote4 = getUserSettings4 ();

    const user_settings_remote_Array = [user_settings_remote, user_settings_remote2, user_settings_remote3, user_settings_remote4];
    const user_settings_remote_save_Array = [saveSettings, saveSettings2, saveSettings3, saveSettings4];

    const thekey = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Base64.parse(fs.readFileSync(path.join(__dirname, "/thekey.key"), 'utf8')));

    window = new BrowserWindow({
        icon: path.join(__dirname, "/elkjoplogo.ico"),
        width: 1000,
        height: 600,
        resizable: false,
        show: false,
        autoHideMenuBar: true,
        frame: false,
        sandbox: true,
        transparent: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            devTools: false,
            preload: path.join(__dirname, "/app/preload.js"),
        },
    });

    window.webContents.on('did-finish-load', () => {
        window.show()
    });

    window.loadFile(path.join(__dirname, "/app/login.html"));
    
    /////////////////////////////////////////////////
    ////Handler med switch for å endre html filer og kjøre andre ting
    /////////////////////////////////////////////////
    
    ipcMain.on("toMain", (event, args) => {
        switch(args){
            case "app/pdfhtml":
                window.loadFile(path.join(__dirname, "/app/PDF.html"));
                break;
            case "app/supporthtml":
                window.loadFile(path.join(__dirname, "/app/SupportMe.html"));
                break;
            case "app/htmlvk":
                window.loadFile(path.join(__dirname, "/app/VK.html"));
                break;
            case "app/backtomainhtml":
                window.loadFile(path.join(__dirname, "/app/index.html"));
                break;
            case "app/settingshtml":
                window.loadFile(path.join(__dirname, "/app/Settings.html"));
                break;
            case "app/close":
                app.quit();
                break;
            case "app/minimize":
                window.minimize();
                break;
            case "get/version":
                event.sender.send("fromMain", getversion());
                break;
            case "app/rtg":
                child(process.env.PORTABLE_EXECUTABLE_DIR + "/appdata/RTG.exe")
                break;
            case "app/remotefix":
                child(process.env.PORTABLE_EXECUTABLE_DIR + "/appdata/RemotefixRun.exe");
                break;
            case "app/cloud":
                exec(process.env.PORTABLE_EXECUTABLE_DIR + '/appdata/setup.exe');
                break;
            case "app/benchmark":
                exec("start cmd /c " + process.env.PORTABLE_EXECUTABLE_DIR + '/appdata/helsesjekk/helsesjekk.bat');
                break;
            case "app/gaming":
                exec(process.env.PORTABLE_EXECUTABLE_DIR + '/appdata/RTGGaming.exe');
                break;
        }
    })

    /////////////////////////////////////////////////
    ////Handler for å logge inn med Passord
    /////////////////////////////////////////////////

    ipcMain.on("app/GetLogin", (event, args) => {

        let logon = fs.readFileSync(path.join(__dirname, "/loginkey.key"), 'utf8').replace(/\n/g, "");

        if (args === logon) {
            window.loadFile(path.join(__dirname, "/app/index.html"));
        }
        else {
            dialog.showMessageBox({
                type: 'error',
                buttons: ['Ok'],
                title: 'Feil',
                message: 'Feil passord!'
            });
        }
    });

    /////////////////////////////////////////////////
    ////Handler for oppdatering av Login Info
    /////////////////////////////////////////////////

    ipcMain.on("app/OppdaterLogin", (event, args) => {
        for (let i = 0; i < user_settings_remote_save_Array.length; i++) {
            if (args[i] != ''){
                var encrypted = CryptoJS.AES.encrypt(JSON.stringify(args[i]), thekey).toString();
                user_settings_remote_save_Array[i](encrypted);
            }
        }
        if (!args.every(arg => arg === '')) {
            app.relaunch({ execPath: process.env.PORTABLE_EXECUTABLE_FILE });
            app.quit();
        }
    })

    /////////////////////////////////////////////////
    ////Handler for å generere PDF
    /////////////////////////////////////////////////

    ipcMain.on("app/lagpdf", (event, args) => {
        
        var executablePath = process.env.PORTABLE_EXECUTABLE_DIR + '/app/programs/ManuellPDF.exe';

        var values_to_send = [];

        const argNames = ['value1', 'value2', 'value3', 'value4', 'value5', 'value6'];

        for (let i = 0; i < 6; i++) {
            if (args[i]) {
                values_to_send.push(`--${argNames[i]}`);
                values_to_send.push(args[i]);
            }
        }
        
        child(executablePath, values_to_send, (error) => {
            if (error) {
                dialog.showMessageBox({
                    type: 'error',
                    buttons: ['Ok'],
                    title: 'Feil',
                    message: 'Feil ved generering av PDF!'
                });
            }
          });
    })

    /////////////////////////////////////////////////
    ////Handler for å kjøre Support Avtale oppsett
    /////////////////////////////////////////////////

    ipcMain.on("app/SArun", (event, args) => {

        const argNames = ['val1', 'val2', 'val3', 'val4', 'val5', 'val6', 'val7', 'val8', 'val9', 'val10', 'val11', 'val13', 'val14', 'val15', 'val15'];

        const argNamesPassive = ['value1', 'value2', 'value3', 'value4'];

        var something = [];

        for (let i = 0; i < 15; i++) {
            if (args[i]) {
                something.push(`--${argNames[i]}`);
                something.push(args[i]);
            }
        }

        for(var i = 0; i < user_settings_remote_Array.length; i++){
            try {
                var decrypting = CryptoJS.AES.decrypt(user_settings_remote_Array[i], thekey);
                var decryptingString = JSON.parse(decrypting.toString(CryptoJS.enc.Utf8));
                var decrypted = JSON.stringify(decryptingString);
                something.push(`--${argNamesPassive[i]}`);
                something.push(decrypted);
            }
            catch (error) {
                dialog.showMessageBox({
                    type: 'error',
                    title: 'Error',
                    message: 'Noe gikk galt med å hente Login Informasjonen.\nVennligst fyll inn Login Informasjonen inne i Innstillinger og prøv igjen.',
                    buttons: ['OK']
                    }).then((result) => {
                        if (result.response === 0) {
                            window.loadFile(path.join(__dirname, "/app/Settings.html"));
                        }
                    });
                return;
            }
        }

        var executablePath = path.join(__dirname, "/app/programs/Support.exe");

        child(executablePath, something, (error) => {
            if (error) {
                dialog.showMessageBox({
                    type: 'error',
                    buttons: ['Ok'],
                    title: 'Feil',
                    message: 'Feil ved kjøring av Support Avtale oppsett!'
                });
            }
        });
    });
};
