/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

"use strict";

const scripts = document.getElementsByTagName("script");
for (let i = 0; i < scripts.length; ++i) {
	let script = scripts[i];
	if (!script.src) {
		const lastTheoreticalPrice = extractTheoreticalPrice(script.text);
		if (lastTheoreticalPrice) {
			appendToDetailsBody(lastTheoreticalPrice);
		}
	}
}