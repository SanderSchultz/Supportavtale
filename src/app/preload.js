const {
    contextBridge,
    ipcRenderer
} = require("electron");

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            let validChannels = ["toMain", "app/OppdaterLogin", "app/lagpdf", "app/SArun", "app/GetLogin"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["fromMain"];
            if (validChannels.includes(channel)) { 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);
