'use strict';

var setParameterHost = window.location.host.split(":")[0] + ":8001";
var setParameterUrl = `http://${setParameterHost}/set_parameter`;

//const antennaIP = "ledlights.free.beeceptor.com"
//const antennaIP = "192.168.178.xx:8080" // adjust as needed
const antennaIP = "http://192.168.178.164"

const antennaOnUrl = `http://${antennaIP}/fieldValue?name=brightness&value=100`
const antennaOffUrl = `http://${antennaIP}/fieldValue?name=brightness&value=10`

const leftLane = 0.15;
const rightLane = -leftLane;

const slowSpeed = 0.5;
const fastSpeed = 1.0;


function setParameter(obj) {
    console.debug("Set Parameter:", obj);
    var params = $.param(obj);
    var url = `${setParameterUrl}?${params}`;
    $.ajax({
        url: url,
        type: "PUT",
        success: function(result) {
            if (result)
                console.debug(result);
        }
    });
    blinkLed(antennaIP);
    //$.post(antennaOnUrl);
    //window.setTimeout(() => { $.post(antennaOffUrl); }, 1000);
}

function btnLeft() {
    console.debug("Left!");
    animateButton("btnLeft");
    setParameter({"lane": leftLane});
}

function btnRight() {
    console.debug("Right!");
    animateButton("btnRight");
    setParameter({"lane": rightLane});
}

function btnSlow() {
    console.debug("Slow!");
    animateButton("btnSlow");
    setParameter({"speed": slowSpeed});
}

function btnFast() {
    console.debug("Fast!");
    animateButton("btnFast");
    setParameter({"speed": fastSpeed});
}

function btnStop() {
    console.debug("Stop!");
    animateButton("btnStop");
    setParameter({"speed": 0});
}

$(document).ready(() => {
    window.setTimeout(function() {
        console.debug("Document Loaded");

        $("#btnLeft").click(btnLeft);
        $("#btnRight").click(btnRight);
        $("#btnSlow").click(btnSlow);
        $("#btnFast").click(btnFast);


        $(svgId("btnLeft")).click(btnLeft);
        $(svgId("btnRight")).click(btnRight);
        $(svgId("btnSlow")).click(btnSlow);
        $(svgId("btnFast")).click(btnFast);
        $(svgId("btnStop")).click(btnStop);

        setLedColor(antennaIP, [255, 255, 255]);
    }, 500);
});
