"use strict";

function svgId(id) {
    return document.getElementById("bg").contentDocument.getElementById(id);
}

function animateButton(btnId) {
    var pb = new Playbook();
    pb.pressButton(btnId);
    pb.play();
}

function blinkLed(host) {
    var urlOn = `${host}/fieldValue?name=brightness&value=100`;
    var urlOff = `${host}/fieldValue?name=brightness&value=10`;

    $.post(urlOn);
    window.setTimeout(() => { $.post(urlOff); }, 1000);
}

function setLedColor(host, color) {
    var url = `${host}/fieldValue?name=solidColor&r=${color[0]}&g=${color[1]}&b=${color[2]}`;
    $.post(url);
}
