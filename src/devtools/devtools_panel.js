/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

console.log("devtools panel loaded");

// browser.devtools.network.onRequestFinished.addListener((request) => {
// 	document.body.innerHTML += `<div>${request.request.url}</div>`;
// });

const attrs = ["debug", "uncached"];

attrs.forEach(attr => {
	document.querySelector(`#${attr}`).addEventListener("change", updateAttr(attr));
	document.addEventListener("DOMContentLoaded", loadAttr(attr));
});

function updateAttr(attr) {
	return () => {
		const value = document.querySelector(`#${attr}`).checked;
		browser.storage.local.set({
			[attr]: value
		});

		console.log("updated cfg", attr, value);
	};
}

function loadAttr(attr) {
	return () => {
		browser.storage.local.get(attr, data => {
			const value = data[attr] || false;
			document.querySelector(`#${attr}`).checked = value;

			console.log("loaded cfg", attr, value);
		});
	};
}
