/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

class Logger {
	constructor(cfg) {
		this.logger = () => {};

		if (cfg.debug) {
			this.logger = console.log.bind(console);
		}

		if (cfg.trace) {
			this.logger = console.trace.bind(console);
		}

		this.log("Logger created");
		this.log("Config: ", cfg);
	}

	log(...args) {
		this.logger(...args);
	}
}
