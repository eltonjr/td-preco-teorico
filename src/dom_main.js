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
	constructor(doc, cfg, logger) {
		this.doc = doc;
		this.formatter = new Formatter(cfg.formatter);
		this.debug = cfg.debug;
		this.logger = logger;
		this.logger.log("MainPage loaded");

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
		this.titleDiv = titleDiv;
		this.totalValueSpan = totalValue;
		this.totalValueText = totalValueText;
		this.investments = {};
	}

	appendInvestments(investments) {
		const div = this.doc.createElement("div");
		div.setAttribute("class", "td-investimentos-charts");

		const ul = this.doc.createElement("ul");
		ul.setAttribute("class", "td-graph-list");
		ul.setAttribute("style", "width: 60%; padding: 10px 20px");

		investments.forEach(investment => {
			const li = this.doc.createElement("li");
			li.setAttribute("onclick", "event.preventDefault();");
			const span1 = this.doc.createElement("span");
			span1.setAttribute("class", "td-graph-list__item");

			const span2 = this.doc.createElement("span");
			span2.setAttribute("class", "td-graph-list__icon");
			span2.setAttribute("style", `background-color:${color(investment.title)};`);

			const titleNameSpan = this.doc.createElement("span");
			titleNameSpan.setAttribute("style", "font-size: 1.6rem;");
			const titleName = this.doc.createTextNode(investment.title);
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

			this.investments[investment.href] = {
				li: li,
				valueSpan: span3,
				valueText: titleValue
			};
		});

		div.appendChild(ul);
		this.titleDiv.appendChild(div);
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

			if (this.debug) {
				const total = byTitle[title].length;
				this.logger.log(`Brokers by title: ${title}: ${total}`);
				let done = 0;
				byTitle[title].forEach(p => {
					p.then(() => {
						done++;
						this.logger.log(`Progress: ${title} (${done}/${total}) (?/?)`);
						titleValue.textContent = `${labels.processing} (${done}/${total}) (?/?)`;
					});
				});
			}

			Promise.all(byTitle[title]).then(titlePs => {
				const tpf = titlePs.flat();

				if (this.debug) {
					this.logger.log(`Brokers resolved. Contribs by title: ${title}: ${tpf.length}`);
					const total = tpf.length;
					let done = 0;
					tpf.forEach(p => {
						p.then(() => {
							done++;
							this.logger.log(`Progress: ${title} (-/-) (${done}/${total})`);
							titleValue.textContent = `${labels.processing} (${titlePs.length}/${titlePs.length}) (${done}/${total})`;
						});
					});
				}

				Promise.all(tpf).then(v => {
					setTimeout(() => {
						const sum = sumArray(v);
						this.logger.log(`Contribs resolved: ${title}: ${v.length}`);
						span3.setAttribute("data-gross-amount", sum);
						span3.innerHTML = "";
						span3.appendChild(titleValue);
						titleValue.textContent = this.formatter.format(sum);
					}, 500);
				});
			});
		});

		div.appendChild(ul);
		this.doc.querySelector("#td-preco-teorico").appendChild(div);

		Promise.all(Object.values(byTitle).flat()).then(v => {
			Promise.all(v.flat()).then(vv => {
				let sum = sumArray(vv);
				if (isNaN(sum)) {
					sum = `${labels.partial}: ${sumArrayValids(vv)}`;
				}
				this.totalValueSpan.setAttribute("data-gross-amount", sum);
				this.totalValueSpan.innerHTML = "";
				this.totalValueSpan.appendChild(this.totalValueText);
				this.totalValueText.textContent = this.formatter.format(sum);
			})
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
