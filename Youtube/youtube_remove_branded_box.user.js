// ==UserScript==
// @name        youtube remove branded box
// @namespace   pugsworth.wellington
// @include     https://www.youtube.com/user/*
// @include     https://youtube.com/user/*
// @version     1
// @grant       none
// @run-at      document-end
// ==/UserScript==

function main(evt) {
    var pageBoxes = document.getElementsByClassName("branded-page-box");

    for (var i = 0; i < pageBoxes.length; i++) {
        var pb = pageBoxes[i];

        if (pb && pb.classList.contains("video-player-view-component")) {
            pb.remove();
        }
    }
}

window.addEventListener("DOMContentLoaded", main);

