// ==UserScript==
// @name        Google Search Buttons
// @author      Pugsworth
// @include     https://www.google.com/search*
// @include     http://www.google.com/search*
// @version     0.30
// @run-at      document-end
// @grant       GM_addStyle
// @noframes
// ==/UserScript==

//
// Begin edit block
//

// do not edit beyond "End Edit Block" unless you know what you're doing

// name/tooltip -> [domain, icon]
var BUTTONS = {
    "Reddit":         ["reddit.com",        "data:image/png;base64,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"],
    "Facepunch":      ["facepunch.com",     "data:image/png;base64,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"],
    "Stackoverflow":  ["stackoverflow.com", "data:image/x-icon;base64,AAABAAIAEBAAAAEAIABoBAAAJgAAACAgAAABACAAqBAAAI4EAAAoAAAAEAAAACAAAAABACAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAqaOe/6mjnv+po57/qaOe/6mjnv+po57/qaOe/6mjnv+po57/qaOe/6mjnv8AAAAAAAAAAAAAAAAAAAAAAAAAAKmjnv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACpo57/AAAAAAAAAAAAAAAAAAAAAAAAAACpo57/AAAAAAlw8v8JcPL/CXDy/wlw8v8JcPL/CXDy/wlw8v8AAAAAqaOe/wAAAAAAAAAAAAAAAAAAAAAAAAAAqaOe/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlw8hMJcPI2AAAAAKmjnv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACXDyLwlw8l0JcPKJCXDytglw8uIJcPLvCXDyvQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlw8sIJcPKlCXDydwlw8kkJcPIdCXDyEwlw8nEJcPIvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJcPI9CXDypQlw8u8JcPKgCXDyLwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACXDyDwlw8nEJcPLWCXDy0wlw8msJcPIPCXDyPQlw8uIJcPInAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlw8iMJcPKgCXDyOgAAAAAAAAAACXDydwlw8ugJcPJGCXDyUQlw8oIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJcPITCXDytglw8sIJcPIdCXDyGAlw8ugJcPI2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJcPI6CXDy4glw8okJcPIDAAAAAAlw8rYJcPJ+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACXDyZAlw8kkAAAAAAAAAAAlw8msJcPLICXDyAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlw8icJcPLoCXDyIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJcPLCCXDyZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACXDyHQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AADABwAA3/cAANAXAADflwAA8B8AAPAPAAD+DwAA8AcAAPGDAAD+AwAA/CcAAPzHAAD/jwAA/58AAP+/AAAoAAAAIAAAAEAAAAABACAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AKmjngCpo54AqaOeAKmjngCpo54AqaOeAKmjngCpo54AqaOeAKmjngCpo54AqaOeAKmjngCpo54AqaOeAKmjngCpo54AqaOeAKmjngCpo54AqaOeAKmjngD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AqaOeAKmjngCpo54AqaOeAKmjngCpo54AqaOeAKmjngCpo54AqaOeAKmjngCpo54AqaOeAKmjngCpo54AqaOeAKmjngCpo54AqaOeAKmjngCpo54AqaOeAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCpo54AqaOe/6mjnv+po57/qaOe/6mjnv+po57/qaOe/6mjnv+po57/qaOe/6mjnv+po57/qaOe/6mjnv+po57/qaOe/6mjnv+po57/qaOe/6mjnv+po54A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AKmjngCpo57/qaOe/6mjnv+po57/qaOe/6mjnv+po57/qaOe/6mjnv+po57/qaOe/6mjnv+po57/qaOe/6mjnv+po57/qaOe/6mjnv+po57/qaOe/6mjngD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AqaOeAKmjnv+po57/JID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0AKmjnv+po57/JID0ACSA9AAkgPQAJID0AP///wD///8A////AP///wD///8A////AP///wCpo54AqaOe/6mjnv8kgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAqaOe/6mjnv8kgPQAJID0ACSA9AAkgPQA////AP///wD///8A////AP///wD///8A////AKmjngCpo57/qaOe/ySA9AAkgPQAJID0/ySA9P8kgPT/JID0/ySA9P8kgPT/JID0/ySA9P8kgPT/JID0/ySA9P8kgPT/JID0ACSA9ACpo57/qaOe/ySA9AAkgPQAJID0ACSA9AD///8A////AP///wD///8A////AP///wD///8AqaOeAKmjnv+po57/JID0ACSA9AAkgPT/JID0/ySA9P8kgPT/JID0/ySA9P8kgPT/JID0/ySA9P8kgPT/JID0/ySA9P8kgPQAJID0AKmjnv+po57/JID0ACSA9AAkgPQAJID0AP///wD///8A////AP///wD///8A////AP///wCpo54AqaOe/6mjnv8kgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAqaOe/6mjnv8kgPQAJID0ACSA9AAkgPQA////AP///wD///8A////AP///wD///8A////AKmjngCpo57/qaOe/ySA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9B4kgPRRJID0gSSA9LQkgPTjJID0EiSA9ACpo57/qaOe/ySA9AAkgPQAJID0ACSA9AD///8A////AP///wD///8A////AP///wD///8AqaOeAKmjngCpo54AJID0ACSA9AAkgPQAJID0AiSA9CYkgPRXJID0iSSA9LokgPTtJID0/ySA9P8kgPT/JID0/ySA9P8kgPRKJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAkgPQAJID0ACSA9LgkgPTxJID0/ySA9P8kgPT/JID0/ySA9P8kgPT/JID0+SSA9M0kgPSaJID0aiSA9CQkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////ACSA9AAkgPQAJID0vSSA9P8kgPT/JID09CSA9MUkgPSUJID0YiSA9DEkgPQFJID0ACSA9DQkgPSjJID05iSA9A0kgPQAJID0ACSA9AAkgPQAJID0ACSA9AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AJID0ACSA9AAkgPRKJID0WySA9CkkgPQDJID0ACSA9AAkgPQAJID0BSSA9FgkgPTHJID0/ySA9P8kgPT/JID0eCSA9AAkgPQAJID0ACSA9AAkgPQAJID0AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0FSSA9HwkgPTkJID0/ySA9P8kgPT/JID02SSA9GwkgPQ9JID0LCSA9AAkgPQAJID0ACSA9AAkgPQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0MiSA9J8kgPT4JID0/ySA9P8kgPT+JID0tySA9EkkgPQCJID0YiSA9PckgPTjJID0HCSA9AAkgPQAJID0ACSA9AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AJID0ACSA9AAkgPQAJID0KiSA9MIkgPT/JID0/ySA9P8kgPTyJID0lCSA9CYkgPQAJID0CCSA9J8kgPT/JID0/ySA9OkkgPRGJID0IySA9AAkgPQAJID0AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAkgPQAJID0ACSA9AAkgPQPJID07iSA9P8kgPTcJID0cCSA9A8kgPQAJID0ACSA9CQkgPTPJID0/ySA9P8kgPTDJID0HCSA9K4kgPTzJID0ZiSA9AAkgPQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////ACSA9AAkgPQAJID0ACSA9AAkgPRaJID0TCSA9AIkgPQAJID0ACSA9AAkgPRQJID07ySA9P8kgPT+JID0jiSA9AUkgPR+JID0/ySA9P8kgPSOJID0ACSA9AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQEJID0iCSA9P4kgPT/JID08SSA9FQkgPQAJID0TSSA9P4kgPT/JID0uySA9AMkgPQAJID0AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0GCSA9MAkgPT/JID0/ySA9NMkgPQmJID0ACSA9CgkgPTwJID0/ySA9N4kgPQUJID0ACSA9AAkgPQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9B8kgPTnJID0/ySA9P8kgPSiJID0CiSA9AAkgPQPJID02CSA9P8kgPT1JID0LiSA9AAkgPQAJID0ACSA9AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9JYkgPT4JID0ZySA9AAkgPQAJID0AiSA9LQkgPT/JID0/iSA9FYkgPQAJID0ACSA9AAkgPQAJID0AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0AySA9CokgPQAJID0ACSA9AAkgPSCJID0/ySA9P8kgPSIJID0ACSA9AAkgPQAJID0ACSA9AAkgPQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0UySA9P4kgPT/JID0tySA9AMkgPQAJID0ACSA9AAkgPQAJID0ACSA9AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9A8kgPTvJID0/ySA9NskgPQQJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9DQkgPTIJID0LCSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0ACSA9AAkgPQAJID0AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP////////////////wAAD/8AAA//P//P/z//z/8wAM//MADP/z//z/8/4E//+AB///AAf//wBD//8OA///+AH//+AA//+AQH//gYA//8cAP//8CD//+BB///Ag///4wf//+cP///+D////B////4///////////////////////"]
};

//
// End Edit Block
//








// If you know css, you can take a crack at changing it below
var css = `
.sfbg-btn-canvas {
    /* background-color: #ffffff; */
    /* box-shadow: inset 0 0 5px #f1f1f1; */
    display: inline-flex;
    flex-flow: row nowrap;
    float: right;
    position: relative;
    top: 2px;
    z-index: 980;
    padding-right: 16px;
    padding-left: 16px;
    justify-content: flex-end;
    align-items: center;
    /* border-width: 1px; */
    /* border-style: dashed; */
}
.sfbg-btn-canvas>*:first-child {
    margin-left: 0;
}
.sfbg-btn-canvas>*:last-child {
    margin-right: 0;
}
.sfbg-btn {
    position: relative;
    display: inline-block;
    box-sizing: border-box;

    width: 32px;
    height: 32px;

    border: solid #777 1px;
    border-radius: 3px;

    padding: 0;
    /* margin-left: 5px; */
    margin-right: 5px;

    background: #ffffff;
    background-image: linear-gradient(to bottom, #ffffff, #f1f1f1);
}
.sfbg-btn:active {
    background-image: linear-gradient(to bottom, #dedede, #f1f1f1);
}
.sfbg-btn-img {
    position: relative;
    display: block;

    width: 100%;
    height: 100%;

    background-repeat: no-repeat;
    background-position: center;
    background-size: 80%;
}
.sfbg-btn:active .sfbg-btn-img {
    background-size: 75%;
    mix-blend-mode: luminosity;
}
.sfbg-btn-selected {
    background-image: linear-gradient(to bottom, #DCF6FF, #C3DBF5);
}
`;

GM_addStyle(css);


// let's try again using the form itself
function filterSearch(to) {
    var form       = document.getElementById("tsf"); // do these names ever change?
    var searchElm  = document.getElementById("lst-ib");
    var searchText = searchElm.value;
    var finalQuery = "";

    // try to find existing site filter
    // if found, replace it with ours
    // otherwise, just append to the end of the query
    var reg    = new RegExp(/(site:[A-z0-9.]+)/gi);
    var result = reg.exec(searchText);

    var site = "site:" + to;

    if (result === null) {
        finalQuery = searchText + " " + site;
    }
    else {
        if (to == result[0].substr(5)) {
            // remove the existing one to allow for "toggling"
            site = "";
        }
        finalQuery = searchText.substr(0, result.index) + site + searchText.substr(result.index + result[0].length);
    }

    // initiate search as if the user did it themselves
    searchElm.value = finalQuery;
    form.submit();
}

function main() {

    var root = document.querySelector("#searchform .sfibbbc");
    if (root === null) {
        console.error("Google Search Buttons: root not found!");
        return -1;
    }

    var searchElm  = document.getElementById("lst-ib");
    var searchText = searchElm.value;
    var siteReg    = new RegExp(/(site:([A-z0-9.]+))/gi);
    var siteResult = siteReg.exec(searchText);

    var canvas = document.createElement("div");
    canvas.appendChild(document.createTextNode("Site Filters: "));
    canvas.classList.add("sfbg-btn-canvas");

    for (var key of Object.keys(BUTTONS)) {
        var item = BUTTONS[key];

        var btn = document.createElement("a");
        btn.classList.add("sfbg-btn");
        btn.setAttribute("title", key);
        btn.addEventListener("click", (function(e) { filterSearch(this); }).bind(item[0]));

        if (siteResult !== null && siteResult[2] == item[0]) {
            btn.classList.add("sfbg-btn-selected");
        }

        var img = document.createElement("div");
        img.classList.add("sfbg-btn-img");
        img.setAttribute("style", "background-image: " + "url(\""+item[1]+"\")");

        btn.appendChild(img);
        canvas.appendChild(btn);
    }

    var where = root.firstElementChild;
    root.insertBefore(canvas, where);
}

window.addEventListener("DOMContentLoaded", main);

