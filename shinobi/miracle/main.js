"use strict";

var tstates = 0;
var running;
var event_next_event;
var currentRom = 0;

function loadRomData(rom) {
    x.write('Loading ' + rom.title);

    var path = "roms/" + rom.file;
    console.log("Loading rom data from " + path);

    var request = new XMLHttpRequest();
    request.onload = function(e) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                x.write('Rom loaded');
                loadRom(rom.title, request.response);
                start();
            }
            else {
                x.write('Rom loading error: ' + request.statusText);
            }
        }
    };
    request.onerror = function() {
        x.write(request.statusText);
    };
    request.overrideMimeType('text/plain; charset=x-user-defined');
    request.open('GET', path, true);
    request.send();
}

function go() {
    z80_init();
    miracle_init();
    miracle_reset();
    loadRomData(getLastRom());
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
    loadRomData(roms[currentRom]);
}
