/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

class Fetcher {
	constructor(content, cfg, logger) {
		this.content = content;
		this.cache = NewCache(cfg);
		this.logger = logger;
	}

	get(url) {
		const cached = this.cache.get(url);
		if (cached) {
			this.logger.log(`get ${url}: cached`);
			return Promise.resolve(cached);
		}

		const promise = this.content.fetch(url, {
			credentials: "include",
			redirect: 'follow'
		});

		return promise
			.then(r => r.text())
			.then(r => {
				this.logger.log(`get ${url}: fetched`);
				this.cache.set(url, r);
				return r;
			});
	}

	getDetails(payload, referer) {
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
				this.logger.log(`post ${key}: fetched`);
				this.cache.set(key, r);
				return r;
			});
	}

	buildDetailsKey(payload) {
		return `/MeusInvestimentos/LoadDetalhe?CodigoInstituicaoFinanceira=${payload.CodigoInstituicaoFinanceira}&CodigoTitulo=${payload.CodigoTitulo}&QuatidadeTitulo=${payload.QuatidadeTitulo}&MesConsulta=${payload.MesConsulta}&AnoConsulta=${payload.AnoConsulta}&TickDataInvestimento=${payload.TickDataInvestimento}`;
	}
}
