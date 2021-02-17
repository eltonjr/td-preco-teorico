/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

"use strict";

const rowsData = {};

function trimTitle(t) {
	return t.split("\n").map(s => s.trim()).filter(s => s).join(" ")
}

const rowBoxes = document.getElementsByClassName("td-cards-simples-box");
for (let i = 0; i < rowBoxes.length; ++i) {
	const box = rowBoxes[i];
	const rows = box.children;
	for (let j = 0; j < rows.length; ++j) {
		const row = rows[j];
		const href = row.getAttribute("href");
		const title = trimTitle(row.querySelector("h2").innerText);
		rowsData[href] = rowsData[href] || { title: title, elems: [], promise: null };
		rowsData[href].elems.push(row);
	}
}

const parser = new DOMParser();
Object.keys(rowsData).forEach(href => {
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

	rowsData[href].promise = res;
	rowsData[href].elems.forEach(row => appendToMainRow(row, res));
});

appendToMainTop(rowsData);
