/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

"use strict";

const theoreticalGetter = new RegExp("JSON\.parse\(\((.*)\)\);");

function extractTheoreticalPrice(script) {
	const theoreticalGets = script.match(theoreticalGetter);
	if (theoreticalGets && theoreticalGets.length) {
		let data = theoreticalGets[1].slice(1,-1);
		try {
			data = JSON.parse(data);
			data = JSON.parse(data);
		} catch (e) {
			console.error(e);
			return "Invalid data";
		}

		return data[data.length-1].TheoreticalPrice;
	}
}
