var uid = "";
var ACCESS_TOKEN = "LNDJgOit5yaRIWN";
var DEVICE_TYPE = "com.crunchyroll.windows.desktop";
var LOCALE = "enUS";
var VERSION = "1.1.20.0";
var CONNECTIVITY_TYPE = "ethernet";
var loginResponse;
var tokenResponse;
var recentResponse;
const recentMap = new Map();
var recentSort = [];

function uuid() {
    var uuid = "",
        i,
        random;

    for (i = 0; i < 32; i++) {
        random = (Math.random() * 16) | 0;

        if (i == 8 || i == 12 || i == 16 || i == 20) {
            uuid += "-";
        }

        uuid += (i == 12 ? 4 : i == 16 ? (random & 3) | 8 : random).toString(16);
    }
    localStorage.setItem("uid", uuid);
    return uuid;
}

function getRecentlyWatched() {
    let xmlHttpReq = new XMLHttpRequest();
    let url = `https://api.crunchyroll.com/recently_watched.0.json?session_id=${localStorage.getItem("session_id")}&media_types=anime%7Cdrama&fields=media.media_id,media.available,media.available_time,media.collection_id,media.collection_name,media.series_id,media.type,media.episode_number,media.name,media.description,media.screenshot_image,media.created,media.duration,media.playhead,media.bif_url,series.series_id,series.name,series.portrait_image,series.landscape_image,series.description,series.in_queue&limit=24&offset=0&locale=${LOCALE}&version${VERSION}&connectivity_type=${CONNECTIVITY_TYPE}`;
    xmlHttpReq.onreadystatechange = function() {
        if (xmlHttpReq.readyState == 4) {
            if (xmlHttpReq.status == 200) {
                recentResponse = JSON.parse(xmlHttpReq.responseText);
                for (var i = recentResponse.data.length - 1; i >= 0; i--) {
                    if (recentMap.has(recentResponse.data[i]["series"]["name"]) == false) {
                        recentMap.set(recentResponse.data[i]["series"]["name"], recentResponse.data[i]);
                    }
                }
                recentMap.forEach((value, key) => {
                    recentSort.push(recentMap.get(key))

                })
                recentSort.sort(function(a, b) {
                    return new Date(b.timestamp) - new Date(a.timestamp);
                })
            } else if (xmlHttpReq.status == 400) {
                alert('There was an error 400');
            } else {
                alert('something else other than 200 was returned');
            }
        }
    };
    xmlHttpReq.open("GET", url, false);
    xmlHttpReq.send();
}

function getToken() {
    if (localStorage.getItem("uid"))
        uid = localStorage.getItem("uid");
    else
        uid = uuid();
    let xmlHttpReq = new XMLHttpRequest();
    let url = `https://api.crunchyroll.com/start_session.0.json?access_token=${ACCESS_TOKEN}&device_type=${DEVICE_TYPE}&device_id=${uid}&locale=${LOCALE}&version=${VERSION}&connectivity_type=${CONNECTIVITY_TYPE}`;
    xmlHttpReq.onreadystatechange = function() {
        if (xmlHttpReq.readyState == 4) {
            if (xmlHttpReq.status == 200) {
                tokenResponse = JSON.parse(xmlHttpReq.responseText);
            } else if (xmlHttpReq.status == 400) {
                alert('There was an error 400');
            } else {
                alert('something else other than 200 was returned');
            }
        }
    };
    xmlHttpReq.open("GET", url, false);
    xmlHttpReq.send();
}

function loginForm() {
    var formElement = document.querySelector("form");
    var formData = new FormData(formElement);
    var request = new XMLHttpRequest();
    request.open("POST", "https://api.crunchyroll.com/login.0.json");
    request.send(formData);
    request.onreadystatechange = (function(_this) {
        return function() {
            // readyState
            // - 0: request not initialized
            // - 1: server connection established
            // - 2: request received
            // - 3: processing request
            // - 4: request finished and response is ready

            // status
            // - 200: OK 
            if (request.readyState === 4 && request.status === 200) {
                loginResponse = JSON.parse(request.responseText);
                if (loginResponse["error"]) {
                    document.getElementById("login_error").style.display = "inline";
                } else {
                    // Login
                    console.log("Login successful");
                    window.location.href = "./pages/dashboard.html";
                }
            };
        }
    })(this);
}

function main() {
    getToken();
    localStorage.setItem("session_id", tokenResponse["data"]["session_id"]);
    document.getElementById("login_form__token").value = localStorage.getItem("session_id");

}