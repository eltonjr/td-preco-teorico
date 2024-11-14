/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
 
/**
 * logging from this file does not work
 */

document.addEventListener("DOMContentLoaded", () => {
	browser = chrome;
	const allowBrowserFormatter = !!navigator.language;
	browser.storage.sync.get("formatter", data => {
		const rs = document.querySelectorAll('input[name="formatter"]');
		for (const r of rs) {
			if (r.value === data.formatter) {
				r.checked = r.value === data.formatter;
			}
			if (!allowBrowserFormatter && r.value === 'browser') {
				r.disabled = true;
			}
		}
	});
});

document.querySelector("form").addEventListener("submit", evt => {
	evt.preventDefault();
	const rs = document.querySelectorAll('input[name="formatter"]');
	let selected = 'br';
	for (const r of rs) {
		if (r.checked) {
			selected = r.value;
			break;
		}
	}
	browser.storage.sync.set({
		formatter: selected
	});

	const feedback = document.createElement("span");
	feedback.setAttribute("style", `color: green;`);
	feedback.appendChild(document.createTextNode("Opções salvas!"));
	document.querySelector("form").appendChild(feedback);
});
