/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

 class ScrapperMainPage {
	constructor(doc, logger, fetcher, domparser) {
		this.document = doc;
		this.logger = logger;
		this.fetcher = fetcher;
		this.domparser = domparser;

		this.titleScrapper = new ScrapperTitlePage(doc, logger, fetcher, domparser);
	}

	scrapMainPage(rowAppender = ScrapperUtils.noop) {
		const rowsData = this.scrapMainRows();
		Object.keys(rowsData).forEach(href => {
			let res = this.fetcher.get(href)
				.then(t => {
					const titleDoc = this.domparser.parseFromString(t, "text/html");
					const scrapper = new ScrapperTitlePage(titleDoc, this.logger, this.fetcher, this.domparser);
					return scrapper.scrapTitlePage();
				})
				.catch(e => console.error(e));

			rowsData[href].promise = res;

			rowsData[href].elems.forEach(row => rowAppender(row, res));
		});

		return Object.values(rowsData);
	}

	scrapMainRows() {
		const rowsData = {};
		const titlesContent = this.document.getElementsByClassName("lista-titulos-body__content");
		const brokers = titlesContent[0].children;
		Array.from(brokers)
			.filter(broker => broker.getAttribute("class") != "hidden")
			.map(broker => broker.querySelector("#titulos-wrapper").children)
			.flatMap(links => Array.from(links))
			.forEach(a => {
				const href = a.getAttribute("href");
				const title = ScrapperUtils.trimTitle(a.querySelector(".titulo-card__title").innerText);
				rowsData[href] = rowsData[href] || { title: title, elems: [], promise: null };
				// rowsData[href].elems.push(row);
			});
		return rowsData;
	}
}
