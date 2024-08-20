/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * TitlePage groups DOM functions to be used in the page
 * /MeusInvestimentos/Titulo
 * to display the teoretical value of some title in it.
 */
class TitlePage {

	/**
	 * The title page displays a big table with several values.
	 * At the startup, a new column will be opened in this table
	 * to hold theoretical values for each row.
	 *
	 * @param {HTMLDocument} doc the page where dom elements will be inserted into
	 */
	constructor(doc, cfg) {
		this.doc = doc;
		this.formatter = new Formatter(cfg.formatter);

		const table = this.doc.querySelector("table.saldo-table-container");
		const tbody = table.getElementsByTagName("tbody");

		const firstHeader = tbody[0].querySelector("tr.saldo-table-vencimento th");
		firstHeader.setAttribute("colspan", parseInt(firstHeader.getAttribute("colspan")) + 1);

		const secondHeader = tbody[0].querySelector("tr.saldo-table-headers th");
		// store the size of the table, so when appending the value row, we know where to put it
		this.secondHeaderSize = parseInt(secondHeader.getAttribute("colspan")) + 1;
		secondHeader.setAttribute("colspan", this.secondHeaderSize);

		const thirdHeader = tbody[0].querySelector("tr.saldo-table-data-names");
		const theoreticalHeader = this.doc.createElement("td");
		theoreticalHeader.setAttribute("class", "rentabilidade-cell");
		theoreticalHeader.setAttribute("rowspan", "3");
		theoreticalHeader.setAttribute("style", `background-color: ${color("NEW COLUMN")};`);
		const theoreticalHeaderText = this.doc.createElement("span");
		theoreticalHeaderText.appendChild(this.doc.createTextNode(labels.theoreticalBruteValue.toUpperCase()));
		theoreticalHeader.appendChild(theoreticalHeaderText);
		thirdHeader.appendChild(theoreticalHeader);
	}

	/**
	 * The top of the page displays the total amount
	 * invested in the title, summing every investment.
	 *
	 * @param {Promise} promise an async theoretical value
	 */
	appendToTop(promises) {
		const span1 = this.doc.createElement("span");
		span1.setAttribute("class", "td-meu-investimento-titulo--valor");
		span1.appendChild(this.doc.createTextNode(labels.theoreticalBruteValue));

		const span2 = this.doc.createElement("span");
		span2.setAttribute("class", "td-meu-investimento-titulo--cifrao");
		const text = this.doc.createTextNode(labels.processing);
		span2.appendChild(text);

		span1.appendChild(span2);

		this.doc.querySelector(".td-meu-investimento-datalhe-posicao").appendChild(span1);

		Promise.all(promises).then(v => {
			const sum = sumArray(v);
			text.textContent = this.formatter.format(sum);
		});
	}

	/**
	 * Each row displays a single investment in this title.
	 * @param {HTMLElement} row the html element for the value to be inserted into
	 * @param {Promise} promise an async theoretical value
	 */
	appendToTableRow(row, promise) {
		const theoreticalCell = this.doc.createElement("td");
		const span = this.doc.createElement("span");
		const text = this.doc.createTextNode(labels.processing);
		span.appendChild(text);

		theoreticalCell.appendChild(span);

		row.insertBefore(theoreticalCell, row.getElementsByTagName("td")[this.secondHeaderSize-1]);

		promise.then(value => {
			if (isNaN(value)) {
				theoreticalCell.setAttribute("style", `background-color: ${color("ERROR")};`);
			}
			text.textContent = this.formatter.format(value);
		});
	}
}
