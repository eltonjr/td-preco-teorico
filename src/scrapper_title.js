/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

class ScrapperTitlePage {
	constructor(doc, logger, fetcher, domparser) {
		this.document = doc;
		this.logger = logger;
		this.fetcher = fetcher;
		this.domparser = domparser;

		this.token = ScrapperUtils.getToken(this.document);
	}

	scrapTitlePage(rowAppender = ScrapperUtils.noop) {
		const rows = this.document.getElementsByClassName("saldo-table-data-values");
		const rowsPromises = Array.from(rows).map(row => {
			const tds = row.getElementsByTagName("td");
			const iconTd = Array.from(tds)[0];
			const anchors = iconTd.getElementsByTagName("a");
			const iconAnchor = Array.from(anchors)[0];
			const onclickAction = iconAnchor.getAttribute("onclick");
			const paramsStr = onclickAction.match(ScrapperUtils.onclickActionGetter);
			const [
				CodigoInstituicaoFinanceira,
				CodigoTitulo,
				QuatidadeTitulo,
				MesConsulta,
				AnoConsulta,
				TickDataInvestimento
			] = paramsStr[1].split('|');
			const payload = {
				CodigoInstituicaoFinanceira,
				CodigoTitulo,
				QuatidadeTitulo,
				MesConsulta,
				AnoConsulta,
				TickDataInvestimento
			};

			let res = this.scrapDetailsPage(payload, this.token);
			rowAppender(row, res);
			return res;
		});

		return Promise.all(rowsPromises).then(v => {
			return v
				.reduce((a, b) => { return a + b; }, 0)
				.toFixed(2);
		});
	}

	/**
	 * Details page only shows a modal with the theoretical price.
	 * This is where the theorecical price really is.
	 * Currently there is no need for a dedicated scrapper.
	 */
	scrapDetailsPage(payload, token) {
		const response = this.fetcher.getDetails(payload, token);
		return response
			.then(o => this.scrapDetailsResponse(o.view));
	}

	scrapDetailsResponse(html) {
		const modal = this.domparser.parseFromString(html, "text/html");
		const theoreticalSpan = modal.querySelector(".dataset2-legend .money-value");
		const valueStr = (theoreticalSpan || {}).textContent;
		return ScrapperUtils.brlToNumber(valueStr);
	}
}
