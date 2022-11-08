/*
  Created by Maximilian Matthe, Barkhausen Institut, 2022
  Licensed under General Public License v3
*/

'use strict';

function svgId(id) {
    // Search for the element in the background image and return it.
    return document.getElementById("bg").contentDocument.getElementById(id);
}

function animateButton(btnId) {
    // Create an animation which fades in and out a button.
    new Playbook().pressButton(btnId).play();
}

function btnShow() {
    animateButton("btnShow");
    console.log("Show!");
    new Playbook().fadeIn("objCar").play();
}

function btnHide() {
    animateButton("btnHide");
    console.log("Hide!");
    new Playbook().fadeOut("objCar").play();
}

function btnLeft() {
    console.log("Left!");
    animateButton("btnLeft");

    new Playbook().alongPath("pathRightToLeft", 1000, "objCar").play();
}

function btnRight() {
    console.log("Right!");
    animateButton("btnRight");

    new Playbook().alongPath("pathLeftToRight", 1000, "objCar").play();
}

function btnComplex() {
    console.log("Running a Complex animation!");
    animateButton("btnMoveBoth");


    // Illustrates, how multiple animations can be chained together.
    var pb = new Playbook();
    pb.defaultTarget("objCar");
    pb.fadeIn().fadeOut().fadeIn();
    pb.stroke("#00ffff");
    pb.alongPath("pathLeftToRight", 2000);
    pb.fadeOut("objCar", 200).fadeIn("objCar", 200);
    pb.callback(() => { console.log("Callback in between"); });
    pb.alongPath("pathRightToLeft", 500);
    pb.fadeOut().fadeIn();
    pb.stroke("#ff0000");
    pb.onFinished(() => {
        console.log("Complex animation is finished!");
    });
    pb.play();
}

$(document).ready(() => {
    // Add some time to let the contained SVG load and render.
    window.setTimeout(function() {
        console.debug("Document loaded!");

        svgId("paths").style.opacity = 0;  // Hide the paths from the SVG

        // Connect Event handlers
        $(svgId("btnShow")).click(btnShow);
        $(svgId("btnHide")).click(btnHide);
        $(svgId("btnLeft")).click(btnLeft);
        $(svgId("btnRight")).click(btnRight);
        $(svgId("btnMoveBoth")).click(btnComplex);
    }, 500);
});
