/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

"use strict";

const dom = new TitlePage(document);
const balancePromise = extractTheoreticalPriceFromTitlePage(document, dom.appendToTableRow.bind(dom));

dom.appendToTop(balancePromise);
