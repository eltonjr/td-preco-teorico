/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

console.log("devtools panel loaded");

// browser.devtools.network.onRequestFinished.addListener((request) => {
// 	document.body.innerHTML += `<div>${request.request.url}</div>`;
// });

document.addEventListener("DOMContentLoaded", () => {
	browser.storage.sync.get("cfg", data => {
		const cfg = data.cfg || {};
		document.querySelector("#logger").checked = cfg.logger;
		document.querySelector("#uncached").checked = cfg.uncached;

		console.log("loaded cfg", cfg);
	});
});

document.querySelector("#logger").addEventListener("change", updateform);
document.querySelector("#uncached").addEventListener("change", updateform);

function updateform() {
	const logger = document.querySelector("#logger").checked;
	const uncached = document.querySelector("#uncached").checked;
	const cfg = {
		logger,
		uncached
	};
	browser.storage.sync.set({
		cfg
	});

	console.log("updated cfg", cfg);
}
