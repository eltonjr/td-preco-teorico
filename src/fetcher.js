/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

class Fetcher {
	constructor(content, cfg) {
		this.content = content;
		this.cache = NewCache(cfg);
		this.logger = new Logger(cfg);
	}

	get(url) {
		const cached = this.cache.get(url);
		if (cached) {
			this.logger.log(`get ${url}: cached`);
			return cached;
		}

		const promise = this.content.fetch(url, {
			credentials: "same-origin",
			redirect: 'follow'
		});

		this.cache.set(url, promise);

		return promise
			.then(r => {
				this.logger.log(`get ${url} fetched: ${r.status}`);
				return r;
			})
			.then(r => r.text());
	}

	getDetails(payload, token) {
		const key = this.buildDetailsKey(payload);
		const cached = this.cache.get(key);
		if (cached) {
			this.logger.log(`post ${key}: cached`);
			return cached;
		}

		const promise = this.content.fetch("/MeusInvestimentos/LoadDetalhe", {
			method: "POST",
			credentials: "same-origin",
			body: JSON.stringify(payload),
			redirect: 'follow',
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				"__RequestVerificationToken": token
			}
		});

		this.cache.set(key, promise);

		return promise
			.then(r => {
				this.logger.log(`post ${key} fetched: ${r.status}`);
				return r;
			})
			.then(r => r.json());
	}

	buildDetailsKey(payload) {
		return `/MeusInvestimentos/LoadDetalhe?CodigoInstituicaoFinanceira=${payload.CodigoInstituicaoFinanceira}&CodigoTitulo=${payload.CodigoTitulo}&QuatidadeTitulo=${payload.QuatidadeTitulo}&MesConsulta=${payload.MesConsulta}&AnoConsulta=${payload.AnoConsulta}&TickDataInvestimento=${payload.TickDataInvestimento}`;
	}
}
