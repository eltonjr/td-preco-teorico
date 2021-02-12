/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

"use strict";

const rows = document.getElementsByClassName("td-posicao-detalhada__info");
for (let i = 0; i < rows.length; ++i) {
	let row = rows[i];
	let detailsLink = row.lastElementChild;
	
	let href = detailsLink.getAttribute("href");
	if (!href) {
		continue;
	}

	let res = content.fetch(href, {
		credentials: 'same-origin'
	});
	res = res.then(r => r.text())
		.then(t => {
			const lastTheoreticalPrice = extractTheoreticalPrice(t);
			if (lastTheoreticalPrice) {
				console.log(lastTheoreticalPrice);
				return lastTheoreticalPrice;
			}
		})
		.catch(e => console.error(e));
	appendToTitleRow(row, res);
}

