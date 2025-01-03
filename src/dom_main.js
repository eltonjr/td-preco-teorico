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
	constructor(doc, cfg, logger, domparser) {
		this.doc = doc;
		this.formatter = new Formatter(cfg.formatter);
		this.debug = cfg.debug;
		this.logger = logger;
		this.domparser = domparser;
		this.logger.log("MainPage loaded");

		const html = `
			<div id="td-preco-teorico" class="lembrete-investimento-box">
				<h4 class="titulo-card">${labels.theoreticalTotalValue}</h4>
				<div id="error-area" class="td-meus-investimentos">
					<span class="td-meus-investimentos"></span>
				</div>
				<div class="td-meus-investimentos__valor-box">
					<span class="td-meus-investimentos__valor">
						${labels.processing}
					</span>
				</div>
			</div>
		`;
		const parsed = this.domparser.parseFromString(html, "text/html");
		const div = parsed.querySelector("#td-preco-teorico");

		this.doc.querySelector(".fx-column-30").appendChild(div);
		this.titleDiv = this.doc.querySelector("#td-preco-teorico");
		this.totalValueSpan = this.titleDiv.querySelector(".td-meus-investimentos__valor");
		this.totalValueText = this.totalValueSpan.firstChild;
		this.errorAreaText = this.titleDiv.querySelector("#error-area").firstChild;
		this.investments = {};
	}

	appendInvestments(investments) {
		const html = `
			<div class="td-investimentos-charts">
				<ul class="td-graph-list" style="width: 60%; padding: 10px 20px">
					${investments.map(investment => `
						<li id="${titleId(investment.title)}" onclick="event.preventDefault();">
							<span class="td-graph-list__item">
								<span class="td-graph-list__icon" style="background-color:${color(investment.title)};"></span>
								<span style="font-size: 1.6rem;">${investment.title}</span>
								<span style="letter-spacing: -0.56px; text-align: right; margin-left: auto; position: relative;font-size: 1.8rem;font-weight: 600;" data-gross-amount="${labels.processing}">
									${labels.processing}
								</span>
								<div class="progress-bar" style="width: 10rem; height: 1rem; margin-left: 0.5rem; border-style: solid; border-width: 2px; border-radius: 1rem; border-color: ${color(investment.title)}">
									<div class="progress-bar-fill" style="background-color:${color(investment.title)}; width: 0%; height: 100%;"></div>
								</div>
							</span>
						</li>
					`).join('')}
				</ul>
			</div>
		`;
		const parsed = this.domparser.parseFromString(html, "text/html");
		const div = parsed.querySelector(".td-investimentos-charts");
		this.titleDiv.appendChild(div);
		// this.titleDiv.insertAdjacentHTML('beforeend', html);

		investments.forEach(investment => {
			const li = this.titleDiv.querySelector(`#${titleId(investment.title)}`);
			const span3 = li.querySelector('span span:last-of-type');
			this.investments[investment.href] = {
				li: li,
				valueSpan: span3,
				valueText: span3.firstChild
			};
		});
	};

	setTotalInvesmentsQuantity(href, quantity) {
		this.investments[href].quantity = quantity;
		this.investments[href].completed = 0;
	};

	updateProgress(href, progress) {
		this.investments[href].completed += progress;

		const percentage = (this.investments[href].completed / this.investments[href].quantity) * 100;
		const progressBar = this.investments[href].li.querySelector('.progress-bar-fill');
		progressBar.style.width = `${percentage}%`;

		if (this.investments[href].completed === this.investments[href].quantity) {
			const progressBar = this.investments[href].li.querySelector('.progress-bar');
			progressBar.remove();
		}
	}

	updateValue(href, values) {
		var sum = sumArray(values);
		if (isNaN(sum)) {
			sum = `${labels.partial}: ${sumArrayValids(values)}`;
			if (this.debug) {
				sum += ` (${labels.error}: ${countInvalids(values)})`
			}
		}

		this.investments[href].valueText.textContent = this.formatter.format(sum);
	}

	updateTotal(values) {
		let sum = sumArray(values);
		if (isNaN(sum)) {
			sum = `${labels.partial}: ${sumArrayValids(values)}`;
			if (this.debug) {
				sum += ` (${labels.error}: ${countInvalids(values)})`
			}
			this.errorAreaText.textContent = labels.errorsMessage;
		}
		this.totalValueText.textContent = this.formatter.format(sum);
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
						let sum = sumArray(v);
						if (isNaN(sum)) {
							sum = `${labels.partial}: ${sumArrayValids(v)} (${labels.error}: ${countInvalids(v)})`;
						}
						this.logger.log(`Contribs resolved: ${title}: ${v.length}`);
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
					sum = `${labels.partial}: ${sumArrayValids(vv)} (${labels.error}: ${countInvalids(vv)})`;
				}
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
