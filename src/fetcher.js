/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

class Fetcher {
	constructor(content, cfg, logger) {
		this.content = content;
		this.cache = NewCache(cfg);
		this.logger = logger;

		this.maxRetries = 4;
		this.retryDelay = 1000;
	}

	get(url, retries = 0) {
		const cached = this.cache.get(url);
		if (cached) {
			this.logger.log(`get ${url}: cached`);
			return Promise.resolve(cached);
		}

		return this.content.fetch(url, {
			credentials: "include",
			redirect: 'follow'
		})
			.then(r => r.text())
			.then(r => {
				this.logger.log(`get ${url}: fetched`);
				this.cache.set(url, r);
				return r;
			})
			.catch(err => {
				this.logger.log(`get ${url} error - retries left: ${this.maxRetries - retries}: error: ${err}`);
				if (retries >= this.maxRetries) {
					throw err;
				}

				return this.wait(this.backoff(retries)).then(() => this.get(url, retries + 1));
			});
	}

	getDetails(payload, referer, retries = 0) {
		const key = this.buildDetailsKey(payload);
		const cached = this.cache.get(key);
		if (cached) {
			this.logger.log(`post ${key}: cached`);
			return Promise.resolve(cached);
		}

		const promise = this.content.fetch("/MeusInvestimentos/LoadDetalhe", {
			method: "POST",
			credentials: "include",
			body: JSON.stringify(payload),
			redirect: 'follow',
			referrer: referer,
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				"Accept": "application/json, text/javascript, */*; q=0.01",
				"X-Requested-With": "XMLHttpRequest",
				"Priority": "u=0"
			}
		});

		return promise
			.then(r => r.json())
			.then(r => {
				if (!r.success) {
					this.logger.log(`post ${key} error - retries left: ${this.maxRetries - retries}: error: ${r.errorMessage}`);
					if (retries >= this.maxRetries) {
						throw new Error(r.errorMessage);
					}

					return this.wait(this.backoff(retries)).then(() => this.getDetails(payload, referer, retries + 1));
				}

				this.logger.log(`post ${key}: fetched`);
				this.cache.set(key, r);
				return r;
			});
	}

	buildDetailsKey(payload) {
		return `/MeusInvestimentos/LoadDetalhe?CodigoInstituicaoFinanceira=${payload.CodigoInstituicaoFinanceira}&CodigoTitulo=${payload.CodigoTitulo}&QuatidadeTitulo=${payload.QuatidadeTitulo}&MesConsulta=${payload.MesConsulta}&AnoConsulta=${payload.AnoConsulta}&TickDataInvestimento=${payload.TickDataInvestimento}`;
	}

	wait(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	backoff(retries) {
		return this.retryDelay * (retries + 1);
	}
}
