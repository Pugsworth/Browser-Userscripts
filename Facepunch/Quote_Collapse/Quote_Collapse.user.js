// ==UserScript==
// @name        Quote Collapse
// @namespace   pugsworth.wellington
// @include     https://facepunch.com/showthread.php*
// @resource	MainStylesheet Quote_Collapse.css?2983472
// @version     0.1.9
// @grant       GM_getResourceText
// @grant		GM_addStyle
// @run-at		document-end
// ==/UserScript==

(function() {

	let mainCSSText = GM_getResourceText("MainStylesheet");
	GM_addStyle(mainCSSText);

	let settings = {
		CollapseHeight: 70, // the height to collapse if collapsed manually
		AutoCollapse: false,
		AutoCollapseThreshold: 350, // if greater than this height, auto collapse
		AutoCollapseHeight: 200 // the height to collapse if collapsed automatically
	};

	/* -- Mutation Observation -- */

	let mo = new MutationObserver(function(mutations) {
		console.log(mutations);
		
		for (let mutation of mutations)
		{
			let newNodes = mutation.addedNodes;
			if (newNodes === null) continue;
			
			for (let node of newNodes) {
				if (node.nodeType !== Node.ELEMENT_NODE)
					continue;

				let elmQuotes = node.getElementsByClassName("quote");
				for (let quote of elmQuotes) {
					processQuote(node);
				}
			} 
			
		}
	});

	let elmPosts = document.getElementById("posts");
	if (elmPosts == null) return console.error("#posts doesn't exist?!?");

	mo.observe(elmPosts, {childList: true});

	/* -- Main -- */

	let quotes = document.getElementsByClassName("quote");
	for (let quote of quotes) {
		processQuote(quote);
	}

	/* -- Toggle Event -- */

	function OnToggle(elmQToggler, elmQuote)
	{
		let elmMessage = elmQuote.getElementsByClassName("message")[0];
		if (elmMessage == null)
			return;

		if (!elmMessage.classList.contains("collapsed") && elmMessage.offsetHeight <= 75) { // need a way to specify a better unit
			return;
		}

		// it's possible these could become out of sync
		// what's the best course of action in this situation?
		elmQToggler.classList.toggle("down");
		elmQToggler.classList.toggle("up");

		let qfoot = elmQuote.getElementsByClassName("qfooter")[0];
		console.log(qfoot);

		if (elmMessage.classList.toggle("collapsed")) { // true = added, false = removed
			if (qfoot == null) {
				qfoot = document.createElement("span");
				qfoot.className = "qfooter";
				elmQuote.appendChild(qfoot);
			}

			qfoot.classList.remove("qhidden");
		}
		else {
			qfoot.classList.add("qhidden");
		}
	}

	/* -- Processing -- */

	function processQuote(elmQuote)
	{
		let elmInformation = elmQuote.getElementsByClassName("information")[0];
		if (elmInformation == null ) {
			elmInformation = document.createElement("div");
			elmInformation.className = "information";

			let elmInfoBefore = document.createElement("a");
			elmInfoBefore.className = "qlink";
			elmInformation.appendChild(elmInfoBefore);
			elmQuote.insertBefore(elmInformation, elmQuote.firstElementChild);
		} // if information doesn't exist, create it?

		let qtog = document.createElement("div");
		qtog.className = "qtoggler up"; // default to "up" (expanded) state
		elmInformation.appendChild(qtog);

		qtog.addEventListener("dblclick", function() {
			OnToggle(this, elmQuote);
		});

		let elmFirst = elmInformation.firstElementChild;
		if (elmFirst == null) return console.warn("first child of .information == null");

		elmFirst.classList.add("qlink");

		elmQuote.classList.add("qof"); // overflow

		if (settings.AutoCollapse && elmQuote.offsetHeight > settings.AutoCollapseThreshold) {
			OnToggle(qtog, elmQuote);
		}
	}

})();
