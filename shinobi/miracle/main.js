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
    z80_init();
    miracle_init();
    miracle_reset();
    var rom = getLastRom();
    loadRomData(rom.file, function(romData) { 
        loadRom(rom.title, romData);
        start();
    });
}

function getLastRom() {
    if (typeof localStorage !== "undefined" && localStorage.rom) {
        currentRom = localStorage.rom;
        return roms[currentRom];
    }
    return roms[0];
}

function loadNextRom() {
    miracle_reset();
    currentRom = ++currentRom % roms.length;
    if (typeof localStorage !== "undefined") localStorage.rom = currentRom;
    var rom = roms[currentRom];
    loadRomData(rom.file, function(romData) { 
        loadRom(rom.title, romData);
        start();
    });
}
