// ==UserScript==
// @name			Reddit Comment Usability
// @namespace		pugsworth.me
// @version			0.15
// @description		double click comments to toggle their visibility, instead of moving your mouse to a tiny-ass box
// @include			https://www.reddit.com/r/*/comments*
// @grant			none
// ==/UserScript==

(function() {
	function ToggleComment(elm) {
		// console.log(elm);
		if (elm == null)
			return;

		if (elm.classList.contains("thing") || elm.classList.contains("entry")) {
			let found = elm.querySelector(".expand");
			if (found) {
				let result = togglecomment(found);

				let scrollDelta = elm.offsetTop - document.documentElement.scrollTop;
				if (scrollDelta < elm.scrollHeight)
					window.scrollBy(window.scrollX, scrollDelta);

				return result;
			}	
		}

		return false;
	}

	function DoubleClickToggle(ev) {
		// console.log(ev);
		// console.log(this, ev.target);
		if ((ev.explicitOriginalTarget || ev.target).nodeType == Node.ELEMENT_NODE) {
			ev.stopPropagation();
			return ToggleComment(this);
		}
	}

	// .entry could be alone, so we limit it to chidlren of .thing
	for (var item of document.querySelectorAll(".thing.comment,.thing.comment .entry")) {
		item.addEventListener("dblclick", DoubleClickToggle);
	}
})();
