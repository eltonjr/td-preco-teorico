/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * MainPage groups DOM functions to be used in the page
 * /MeusInvestimentos
 * to display the teoretical value of all investments in it.
 */
class MainPage {
	/**
	 * Builds a panel to later display each
	 * title and its values.
	 *
	 * @param {HTMLDocument} doc the page where dom elements will be inserted into
	 */
	constructor(doc) {
		this.doc = doc;
		browser.storage.sync.get("formatter", data => {
			this.formatter = buildFormatter(data.formatter);
		});

		const titleDiv = this.doc.createElement("div");
		titleDiv.setAttribute("id", "td-preco-teorico");
		titleDiv.setAttribute("class", "lembrete-investimento-box");
		const title = this.doc.createElement("h4");
		title.setAttribute("class", "titulo-card");
		title.appendChild(this.doc.createTextNode(labels.theoreticalTotalValue));
		const titlePDiv = this.doc.createElement("div");
		titlePDiv.setAttribute("class", "td-meus-investimentos__valor-box");
		const totalValue = this.doc.createElement("span");
		totalValue.setAttribute("class", "td-meus-investimentos__valor");
		totalValue.setAttribute("data-gross-amount", labels.processing);
		const totalValueText = this.doc.createTextNode(labels.processing);
		totalValue.appendChild(totalValueText);

		titlePDiv.appendChild(totalValue);

		titleDiv.appendChild(title);
		titleDiv.appendChild(titlePDiv);

		this.doc.querySelector(".fx-column-30").appendChild(titleDiv);
		this.totalValueSpan = totalValue;
		this.totalValueText = totalValueText;
	}

	/**
	 * Display every title in the panel created
	 * by the constructor function.
	 *
	 * @param {Object} promises a list of objects containing a title and a promise
	 * [{
	 *     "title": "SELIC 2055",
	 *     "promise": <promise>
	 * }]
	 */
	appendToTop(promises) {
		const byTitle = promises
			.reduce((a, b) => {
				a[b.title] = a[b.title] || [];
				a[b.title].push(b.promise);
				return a;
			}, {});

		const div = this.doc.createElement("div");
		div.setAttribute("class", "td-investimentos-charts");

		const ul = this.doc.createElement("ul");
		ul.setAttribute("class", "td-graph-list");
		ul.setAttribute("style", "width: 60%; padding: 10px 20px");

		Object.keys(byTitle).forEach(title => {
			const li = this.doc.createElement("li");
			li.setAttribute("onclick", "event.preventDefault();");
			const span1 = this.doc.createElement("span");
			span1.setAttribute("class", "td-graph-list__item");

			const span2 = this.doc.createElement("span");
			span2.setAttribute("class", "td-graph-list__icon");
			span2.setAttribute("style", `background-color:${color(title)};`);

			const titleNameSpan = this.doc.createElement("span");
			titleNameSpan.setAttribute("style", "font-size: 1.6rem;");
			const titleName = this.doc.createTextNode(title);
			titleNameSpan.appendChild(titleName);

			const span3 = this.doc.createElement("span");
			span3.setAttribute("style", "letter-spacing: -0.56px; text-align: right; margin-left: auto; position: relative;font-size: 1.8rem;font-weight: 600;");
			span3.setAttribute("data-gross-amount", labels.processing);
			const titleValue = this.doc.createTextNode(labels.processing);
			span3.appendChild(titleValue);

			span1.appendChild(span2);
			span1.appendChild(titleNameSpan);
			span1.appendChild(span3);

			li.appendChild(span1);
			ul.appendChild(li);

			Promise.all(byTitle[title]).then(v => {
				const sum = v
					.map(s => parseFloat(s, 2))
					.reduce((a, b) => { return a + b; }, 0)
					.toFixed(2);
				span3.setAttribute("data-gross-amount", sum);
				span3.innerHTML = "";
				span3.appendChild(titleValue);
				titleValue.textContent = this.formatter.format(sum);
			});
		});

		div.appendChild(ul);
		this.doc.querySelector("#td-preco-teorico").appendChild(div);

		Promise.all(Object.values(byTitle).flat()).then(v => {
			const sum = v
				.map(s => parseFloat(s, 2))
				.reduce((a, b) => { return a + b; }, 0)
				.toFixed(2);
			this.totalValueSpan.setAttribute("data-gross-amount", sum);
			this.totalValueSpan.innerHTML = "";
			this.totalValueSpan.appendChild(this.totalValueText);
			this.totalValueText.textContent = this.formatter.format(sum);
		});
	}

	/**
	 * Each row displays a single title
	 *
	 * @param {HTMLElement} row the html element for the value to be inserted into
	 * @param {Promise} promise an async theoretical value
	 */
	appendToMainRow(row, promise) {
		const div = this.doc.createElement("div");
		const span1 = this.doc.createElement("span");
		span1.appendChild(this.doc.createTextNode(labels.theoreticalValue));

		const p = this.doc.createElement("p");
		p.setAttribute("class", "td-card-simples__valor");

		const span2 = this.doc.createElement("span");
		const text = this.doc.createTextNode(labels.processing);
		span2.appendChild(text);

		p.appendChild(span2);

		div.appendChild(span1);
		div.appendChild(p);

		row
			.querySelector(".td-card-simples-valores div")
			.appendChild(div);

		promise.then(value => {
			text.textContent = this.formatter.format(value);
		});
	}
}
