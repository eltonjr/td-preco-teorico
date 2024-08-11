/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

function LoadConfig() {
	const cfg = {};

	browser.storage.sync.get("formatter", data => {
		cfg.formatter = data.formatter;
	});

	browser.storage.sync.get("cfg", data => {
		const inner = data.cfg || {};
		cfg.logger = inner.logger;
		cfg.uncached = inner.uncached;
	});

	return cfg;
}
