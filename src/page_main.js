/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

"use strict";

// sources of data can be:
// cards: default view until 03/2021
// table: default view until 07/2024
// boxes: default view now
const dataSource = "boxes";

const dom = new MainPage(document);
// TODO implement append function to table
const rowAppender = dataSource == "cards" ? dom.appendToMainRow.bind(dom) : void(0);
const balancePromises = extractTheoreticalPriceFromMainPage(document, dataSource, rowAppender);
dom.appendToTop(balancePromises);
