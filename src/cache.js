/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

async function NewCache(cfg, logger) {
	if (cfg.uncached) {
		return new NoopCache();
	}

	const cache = new Cache(logger);
	await cache.init();
	return cache;
}

class Cache {
	constructor(logger) {
		this.ttl = 60 * 60 * 1000; // 1h
		this.key = "td-preco-teorico:cache";
		this.logger = logger;
		this.cache = {};
	}

	init() {
		return browser.storage.local.get(this.key)
			.then(stored => {
				const entries = stored[this.key] || {};
				this.cache = entries;
			})
			.catch(() => {
				this.logger.log("Cache storage init failed");
			});
	}

	get(key) {
		const entry = this.cache[key];
		if (!entry) {
			return null;
		}

		if (entry.expiration <= Date.now()) {
			return null;
		}

		return entry.value;
	}

	set(key, value) {
		this.cache[key] = {
			value,
			expiration: Date.now() + this.ttl
		};
		this.persist();
	}

	persist() {
		return browser.storage.local.set({
			[this.key]: this.cache
		})
		.catch(() => {
			this.logger.log("Cache storage persistence failed");
		});
	}
}

class NoopCache {
	get() {}
	set() {}
}
