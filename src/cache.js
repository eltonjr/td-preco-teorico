/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

function NewCache(cfg) {
	if (cfg.uncached) {
		return new NoopCache();
	}

	return new Cache();
}

class Cache {
	constructor() {
		this.cache = {};
	}

	get(key) {
		return this.cache[key];
	}

	set(key, value) {
		this.cache[key]= value;
	}
}

class NoopCache {
	get() {}
	set() {}
}
