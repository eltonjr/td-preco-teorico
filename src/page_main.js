/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

"use strict";

// sources of data can be:
// cards: default view until 03/2021
// table: default view until 07/2024
// boxes: default view now
const dataSource = "boxes";

// const algorithm = "dfs";
const algorithm = "bfs";

async function loadMain() {
	const config = await LoadConfig();
	const logger = new Logger(config);
	const fetcher = new Fetcher(content, config, logger);
	const domparser = new DOMParser();
	const dom = new MainPage(document, config, logger, domparser);
	const scrapper = new ScrapperMainPage(document, logger, fetcher, domparser);

	// TODO implement append function to boxes
	const rowAppender = dataSource == "cards" ? dom.appendToMainRow.bind(dom) : void(0);

	if (algorithm === "dfs") {
		const balancePromises = scrapper.scrapMainPage(rowAppender);
		dom.appendToTop(balancePromises);
	}

	if (algorithm === "bfs") {
		const investments = scrapper.findInvestments();
		dom.appendInvestments(investments);

		const titlePagesPromises = investments.map(inv => {
			return fetcher.get(inv.href)
				.then(t => {
					const titleDoc = domparser.parseFromString(t, "text/html");
					const scrapper = new ScrapperTitlePage(titleDoc, logger, fetcher, domparser);
					return {
						href: inv.href,
						title: inv.title,
						investments: scrapper.findInvestments(),
						scrapper
					};
				})
				.catch(e => console.error(e));
		});

		const titlePages = await Promise.all(titlePagesPromises);
		titlePages.forEach(titlePage => {
			dom.setTotalInvesmentsQuantity(titlePage.href, titlePage.investments.length);
		});

		const detailsPromises = titlePages.map(titlePage => {
			return titlePage.investments.map(inv => {
				return titlePage.scrapper.scrapDetailsPage(inv, titlePage.href).then(v => {
					dom.updateProgress(titlePage.href, 1);
					return {
						href: titlePage.href,
						title: titlePage.title,
						value: v
					};
				});
			});
		});

		detailsPromises.forEach(p => {
			Promise.all(p).then(v => {
				dom.updateValue(v[0].href, v.map(i => i.value));
			});
		});

		const details = await Promise.all(detailsPromises.flat());
		dom.updateTotal(details.map(d => d.value));
	}
}

loadMain();
