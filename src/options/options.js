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

	browser.storage.sync.get("onfail", data => {
		const rs = document.querySelectorAll('input[name="onfail"]');
		for (const r of rs) {
			if (r.value === data.onfail) {
				r.checked = r.value === data.onfail;
			}
		}
	});
});

document.querySelector("form").addEventListener("submit", evt => {
	evt.preventDefault();
	const rs = document.querySelectorAll('input[name="formatter"]');
	let formatter = 'br';
	for (const r of rs) {
		if (r.checked) {
			formatter = r.value;
			break;
		}
	}

	const onf = document.querySelectorAll('input[name="onfail"]');
	let onfail = 'error';
	for (const r of onf) {
		if (r.checked) {
			onfail = r.value;
			break;
		}
	}

	browser.storage.sync.set({
		formatter,
		onfail
	});

	const feedback = document.createElement("span");
	feedback.setAttribute("style", `color: green;`);
	const feedbackText = document.createTextNode("Opções salvas!");
	feedback.appendChild(feedbackText);
	setTimeout(() => feedback.removeChild(feedbackText), 3000);
	document.querySelector("form").appendChild(feedback);
});
