/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

"use strict";

const rowsElems = {};

const rowBoxes = document.getElementsByClassName("td-cards-simples-box");
for (let i = 0; i < rowBoxes.length; ++i) {
	const box = rowBoxes[i];
	const rows = box.children;
	for (let j = 0; j < rows.length; ++j) {
		const row = rows[j];
		const href = row.getAttribute("href");
		rowsElems[href] = rowsElems[href] || [];
		rowsElems[href].push(row);
	}
}

// url -> promise
const rowsPromises = [];
const parser = new DOMParser();
Object.keys(rowsElems).forEach(href => {
	let res = content.fetch(href, {
		credentials: "same-origin"
	});
	res = res
		.then(r => r.text())
		.then(t => {
			const doc = parser.parseFromString(t, "text/html");
			return extractTheoreticalPriceFromTitlePage(doc, false);
		})
		.catch(e => console.error(e));
	rowsPromises.push(res);
	
	rowsElems[href].forEach(row => appendToMainRow(row, res));
});

Promise.all(rowsPromises).then(v => {
	return v
		.map(s => parseFloat(s, 2))
		.reduce((a, b) => { return a + b; }, 0)
		.toFixed(2);
});
