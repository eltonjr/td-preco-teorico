/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

"use strict";

// sources of data can be:
// cards: default view until 03/2021
// table: default view after 03/2021
const useSource = "cards";

function trimTitle(t) {
	return t.split("\n").map(s => s.trim()).filter(s => s).join(" ")
}

function getDataFromRows(source) {
	const rowsData = {};

	// version included in march/2021
	if (source == "table") {
		const onclickRowGetter = new RegExp("location\.href='(.*)'");
		const rowBoxes = document.getElementsByClassName("td-invest-table__row first-row-shadow");
		for (let i = 0; i < rowBoxes.length; ++i) {
			const box = rowBoxes[i];
			const onclickAction = box.getAttribute("onclick");
			const paramsStr = onclickAction.match(onclickRowGetter);
			const href = paramsStr[1];
			const title = trimTitle(box.querySelector(".title-name").innerText);
			rowsData[href] = rowsData[href] || { title: title, elems: [], promise: null };
			rowsData[href].elems.push(box);
		}
	}

	if (source == "cards") {
		const rowBoxes = document.getElementsByClassName("home-cards-container");
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
	}

	return rowsData;
}

const rowsData = getDataFromRows(useSource);
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

	// TODO implement append function to table
	if (useSource == "cards") {
		rowsData[href].elems.forEach(row => appendToMainRow(row, res));
	}
});

appendToMainTop(rowsData);
