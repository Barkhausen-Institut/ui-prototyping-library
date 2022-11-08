const cryptoIp = window.location.host.split(":")[0];
const cryptoServiceRSUHost = `http://${cryptoIp}:8000`;
const cryptoServiceCarHost = `http://${cryptoIp}:8002`;

const antennaIP = "http://192.168.178.190"

var cryptoState = false;

function setCrypto(enabled) {
    console.log(`Setting crypto to ${enabled}`);
    $.ajax({
        url: `${cryptoServiceRSUHost}/crypto?enabled=${enabled}`,
        type: "put",
    });
    $.ajax({
        url: `${cryptoServiceCarHost}/crypto?enabled=${enabled}`,
        type: "put",
    });
}

function getCrypto(callback) {
    function _getCryptoImpl(endpoint) {
        return $.ajax({
            url: endpoint,
            type: 'GET',
            mimeType: "text/plain"
        });
    }

    function convertToBool(val) {
        if (val == "true")
            return true;
        if (val == "false")
            return false;
        console.error("Invalid value: ", val);
        return null;
    }

    Promise.all([_getCryptoImpl(`${cryptoServiceRSUHost}/crypto`),
                 _getCryptoImpl(`${cryptoServiceCarHost}/crypto`)]).then(
                     ([rsu, car]) => {
                         callback(convertToBool(rsu), convertToBool(car));
                     });
}


function btnCrypto() {
    animateButton("btnCrypto");

    setCrypto(!cryptoState);
    window.setTimeout(displayCryptoState, 50);
}

function displayCryptoState() {
    getCrypto((rsu, car) => {
        console.debug("Got crypto: ", rsu, car);
        if (rsu != car)
            console.error("Inconsistent crypto state!");
        if (rsu == cryptoState)
            return;
        cryptoState = rsu;
        var color = "#AA0000";
        if (rsu)
            color = "#00AA00";
        var pb = new Playbook();
        pb.fill(color, "cryptoState", 200);
        if (rsu) {
            pb.atTheSameTime().fadeOut("lockOpen");
            pb.atTheSameTime().fadeIn("lockClosed");
        }
        else {
            pb.atTheSameTime().fadeOut("lockClosed");
            pb.atTheSameTime().fadeIn("lockOpen");
        }

        pb.play();

        if (rsu)
            setLedColor(antennaIP, [0, 255, 0]);
        else
            setLedColor(antennaIP, [255, 0, 0]);
    });
}

function getObstacle(callback) {
    $.ajax({

        url: "/obstacle",
        type: "GET",
        success: function(data) {
            if (data.obstacle == true)
                callback(true);
            else if (data.obstacle == false)
                callback(false);
            else
                console.error("Unknown RSU response", data);
        }
    });
}

function showExclamationMark() {
    $("#exclamation").show();
}

function hideExclamationMark() {
    $("#exclamation").hide();
}

function displayObstacleState() {
    getObstacle((value) => {
        var txt = "";
        if (value) {
            txt = "Hindernis erkannt!";
            showExclamationMark();
        }
        else {
            txt = "Strecke frei";
            hideExclamationMark();
        }
        svgId("txtObstacleState").getElementsByTagName("tspan")[0].innerHTML = txt;
        console.debug("Obstacle State:", value);
    });
}


function playChristmasSound() {
    console.log("Playing sound...");

    $.ajax("/play_sound", {
        data : JSON.stringify({"sound": "Christmas.wav"}),
        contentType : 'application/json',
        type : 'POST'
    });
}

$(document).ready(() => {
    window.setTimeout(function() {
        console.debug("Document Loaded");

        $(svgId("btnCrypto")).click(btnCrypto);

        $("#cryptoOn").click(() => {
            setCrypto(true);
        });

        $("#cryptoOff").click(() => {
            setCrypto(false);
        });

        $("#getCrypto").click(() => {
            getCrypto((value) => {
                $("#cryptoState").text(value);
            });
        });

        $("#christmashat").click(playChristmasSound);

        setInterval(() => {
            getCrypto((value) => {
                $("#cryptoState2").text(`Current crypto state is ${value}`);
            });
        }, 1000);

        setInterval(displayCryptoState, 1000);
        setInterval(displayObstacleState, 1000);
    }, 500);
});
