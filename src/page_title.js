/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

"use strict";

async function loadTitle() {
	const config = await LoadConfig();
	const logger = new Logger(config);
	const fetcher = new Fetcher(content, config, logger);
	const dom = new TitlePage(document, config);
	const domparser = new DOMParser();
	const scrapper = new ScrapperTitlePage(document, logger, fetcher, domparser);

	const balancePromise = scrapper.scrapTitlePage(dom.appendToTableRow.bind(dom));

	dom.appendToTop(balancePromise);
}

loadTitle();
