/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

class ScrapperTitlePage {
	constructor(doc, logger, fetcher, domparser) {
		this.document = doc;
		this.logger = logger;
		this.fetcher = fetcher;
		this.domparser = domparser;
	}

	findInvestments() {
		return this.scrapTitleRows();
	}

	scrapTitleRows() {
		const rows = this.document.getElementsByClassName("saldo-table-data-values");
		return Array.from(rows).map(row => {
			const tds = row.getElementsByTagName("td");
			const iconTd = Array.from(tds)[0];
			const anchors = iconTd.getElementsByTagName("a");
			const iconAnchor = Array.from(anchors)[0];
			const CodigoInstituicaoFinanceira = iconAnchor.getAttribute("data-partyid");
			const CodigoTitulo = iconAnchor.getAttribute("data-bondid");
			const QuatidadeTitulo = iconAnchor.getAttribute("data-bondquantity");
			const MesConsulta = iconAnchor.getAttribute("data-month");
			const AnoConsulta = iconAnchor.getAttribute("data-year");
			const TickDataInvestimento = iconAnchor.getAttribute("data-ticks");
			return {
				CodigoInstituicaoFinanceira,
				CodigoTitulo,
				QuatidadeTitulo,
				MesConsulta,
				AnoConsulta,
				TickDataInvestimento
			};
		});
	}

	scrapTitlePage(rowAppender = ScrapperUtils.noop, referer) {
		const rows = this.document.getElementsByClassName("saldo-table-data-values");
		const rowsPromises = Array.from(rows).map(row => {
			const tds = row.getElementsByTagName("td");
			const iconTd = Array.from(tds)[0];
			const anchors = iconTd.getElementsByTagName("a");
			const iconAnchor = Array.from(anchors)[0];
			const CodigoInstituicaoFinanceira = iconAnchor.getAttribute("data-partyid");
			const CodigoTitulo = iconAnchor.getAttribute("data-bondid");
			const QuatidadeTitulo = iconAnchor.getAttribute("data-bondquantity");
			const MesConsulta = iconAnchor.getAttribute("data-month");
			const AnoConsulta = iconAnchor.getAttribute("data-year");
			const TickDataInvestimento = iconAnchor.getAttribute("data-ticks");
			const payload = {
				CodigoInstituicaoFinanceira,
				CodigoTitulo,
				QuatidadeTitulo,
				MesConsulta,
				AnoConsulta,
				TickDataInvestimento
			};

			let res = this.scrapDetailsPage(payload, referer);
			rowAppender(row, res);
			return res;
		});

		return rowsPromises;
	}

	/**
	 * Details page only shows a modal with the theoretical price.
	 * This is where the theorecical price really is.
	 * Currently there is no need for a dedicated scrapper.
	 */
	scrapDetailsPage(payload, referer) {
		const response = this.fetcher.getDetails(payload, referer);
		return response
			.then(o => this.scrapDetailsResponse(o));
	}

	scrapDetailsResponse(res) {
		if (!res.success) {
			return res.errorMessage || "-";
		}

		const modal = this.domparser.parseFromString(res.view, "text/html");
		const theoreticalSpan = modal.querySelector(".dataset2-legend .money-value");
		const valueStr = (theoreticalSpan || {}).textContent;
		return ScrapperUtils.brlToNumber(valueStr);
	}
}
