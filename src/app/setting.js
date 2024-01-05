/////////////IMPORTS//////////////////////////////////////////////////
const { app } = require("electron");
const Store = require('electron-store');

if(app.isPackaged) {
    app.setPath('userData', process.env.PORTABLE_EXECUTABLE_DIR + '/appdata');
}

//////////////////////////////////////////////////////////////////////

const Storage = new Store();

//STORES VERSION//////////////////////////////////////////////////////////////////

function getversion () {
    const default_input = 1.2;
    const size = Storage.get("version");

    if (size) return size;
    else {
        Storage.set("version", default_input);
        return default_input;
    }
}

function saveversion (version) {
        Storage.set("version", version);
}

//ELKJOP IDM STORAGE////////////////////////////////////////////////////////////
function getUserSettings_local () {
    const default_input5 = ['EI'];
    const size5 = Storage.get("data1");

    if (size5) return size5;
    else {
        Storage.set("data1", default_input5);
        return default_input5;
    }
}

function saveSettings (user_settings_remote) {
    if (user_settings_remote) {
        Storage.set("data1", user_settings_remote);
    }
}

//ELKJOP IDM PASSWORD STORAGE////////////////////////////////////////////////////////////
function getUserSettings_local2 () {
    const default_input2 = ['EP'];
    const size2 = Storage.get("data2");

    if (size2) return size2;
    else {
        Storage.set("data2", default_input2);
        return default_input2;
    }
}

function saveSettings2 (user_settings_remote2) {
    if (user_settings_remote2){
        Storage.set("data2", user_settings_remote2);
    }
    
}

//MCAFEE IDM STORAGE////////////////////////////////////////////////////////////
function getUserSettings_local3 () {
    const default_input3 = ['PI'];
    const size3 = Storage.get("data3");

    if (size3) return size3;
    else {
        Storage.set("data3", default_input3);
        return default_input3;
    }
}

function saveSettings3 (user_settings_remote3) {
    if (user_settings_remote3)  {
        Storage.set("data3", user_settings_remote3);
    }
}

//MCAFEE IDM PASSORD STORAGE////////////////////////////////////////////////////////////
function getUserSettings_local4 () {
    const default_input4 = ['PP'];
    const size4 = Storage.get("data4");

    if (size4) return size4;
    else {
        Storage.set("data4", default_input4);
        return default_input4;
    }
}

function saveSettings4 (user_settings_remote4) {
    if (user_settings_remote4)  {
        Storage.set("data4", user_settings_remote4);
    }
}

//EXPORT MODULES////////////////////////////////////////////////////////////////////
module.exports = {
    getUserSettings: getUserSettings_local,
    saveSettings: saveSettings,
    getUserSettings2: getUserSettings_local2,
    saveSettings2: saveSettings2,
    getUserSettings3: getUserSettings_local3,
    saveSettings3: saveSettings3,
    getUserSettings4: getUserSettings_local4,
    saveSettings4: saveSettings4,
    getversion: getversion,
    saveversion: saveversion
}
