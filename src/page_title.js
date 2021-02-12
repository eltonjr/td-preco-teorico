/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

"use strict";

let rowsPromises = [];

const rows = document.getElementsByClassName("td-posicao-detalhada__info");
for (let i = 0; i < rows.length; ++i) {
	let row = rows[i];
	let detailsLink = row.lastElementChild;
	
	let href = detailsLink.getAttribute("href");
	if (!href) {
		continue;
	}

	let res = content.fetch(href, {
		credentials: "same-origin"
	});
	res = res.then(r => r.text())
		.then(t => {
			const lastTheoreticalPrice = extractTheoreticalPrice(t);
			if (lastTheoreticalPrice) {
				return lastTheoreticalPrice;
			}
		})
		.catch(e => console.error(e));
	rowsPromises.push(res);
	appendToTitleRow(row, res);
}

const balancePromise = Promise.all(rowsPromises).then(v => {
	return v
		.map(s => parseFloat(s, 2))
		.reduce((a, b) => { return a + b; }, 0)
		.toFixed(2);
});
appendToTitleTop(balancePromise);

