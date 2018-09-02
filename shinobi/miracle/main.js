"use strict";

var tstates = 0;
var running;
var event_next_event;
var currentRom = 0;

function loadRomData(name, callback) {
    var path = "roms/" + name;
    console.log("Loading rom data from " + path);

    var request = new XMLHttpRequest();
    request.onload = function(e) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                callback(request.response);
            } 
            else {
                x.write(request.statusText);
            }
        }
    };
    request.onerror = function() {
        x.write(request.statusText);
    };
    request.overrideMimeType('text/plain; charset=x-user-defined');
    request.open("GET", path, true);
    request.send();
}

function go() {
    var i;
    z80_init();
    miracle_init();
    miracle_reset();
    var romName = getLastRom();
    loadRomData(romName, function(romData) { 
        loadRom(romName, romData);
        start();
    });
}

function getLastRom() {
    if (typeof(localStorage) !== "undefined" && localStorage.rom) {
        currentRom = RomList.indexOf(localStorage.rom);
        return localStorage.rom;
    }
    return RomList[0];
}

function loadNextRom() {
    miracle_reset();
    currentRom = ++currentRom % RomList.length;
    var romName = RomList[currentRom];
    loadRomData(romName, function(romData) { 
        loadRom(romName, romData);
        start();
    });
}
