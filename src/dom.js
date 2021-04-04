/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

function appendToDetailsBody(value) {
	const h2 = document.createElement("h2");
	h2.setAttribute("class", "td-meu-investimento-titulo");
	h2.appendChild(document.createTextNode("Valor total teórico bruto"));

	const span1 = document.createElement("span");
	span1.setAttribute("class", "td-meu-investimento-titulo--valor");

	const span2 = document.createElement("span");
	span2.setAttribute("class", "td-meu-investimento-titulo--cifrao");
	span2.appendChild(document.createTextNode("R$"));

	span1.appendChild(span2);
	span1.appendChild(document.createTextNode(value));
	h2.appendChild(span1);

	document.querySelector(".td-meu-investimento").appendChild(h2);
}

function appendToTitleRow(row, promise) {
	const magicPosition = 5;

	const theoreticalCell = document.createElement("td");
	const span = document.createElement("span");
	const text = document.createTextNode("Processando");
	span.appendChild(text);

	theoreticalCell.appendChild(span);

	row.insertBefore(theoreticalCell, row.getElementsByTagName("td")[magicPosition]);

	promise.then(value => {
		text.textContent = `R$${value}`;
	});
}

function appendToTitleTop(promise) {
	const span1 = document.createElement("span");
	span1.setAttribute("class", "td-meu-investimento-titulo--valor");
	span1.appendChild(document.createTextNode("Valor teórico bruto"));

	const span2 = document.createElement("span");
	span2.setAttribute("class", "td-meu-investimento-titulo--cifrao");
	const text = document.createTextNode("Processando");
	span2.appendChild(text);

	span1.appendChild(span2);

	document.querySelector(".td-meu-investimento-datalhe-posicao").appendChild(span1);

	promise.then(value => {
		text.textContent = `R$${value}`;
	});
}

function adjustTitleTable(doc) {
	const table = doc.querySelector("table.saldo-table-container");
	const tbody = table.getElementsByTagName("tbody");

	const firstHeader = tbody[0].querySelector("tr.saldo-table-vencimento th");
	firstHeader.setAttribute("colspan", "16");

	const secondHeader = tbody[0].querySelector("tr.saldo-table-headers th");
	secondHeader.setAttribute("colspan", "6");

	const thirdHeader = tbody[0].querySelector("tr.saldo-table-data-names");
	const theoreticalHeader = doc.createElement("td");
	theoreticalHeader.setAttribute("class", "rentabilidade-cell");
	theoreticalHeader.setAttribute("rowspan", "3");
	theoreticalHeader.setAttribute("style", "background-color: #ABF;");
	const theoreticalHeaderText = doc.createElement("span");
	theoreticalHeaderText.appendChild(doc.createTextNode("VALOR TEÓRICO BRUTO"));
	theoreticalHeader.appendChild(theoreticalHeaderText);
	thirdHeader.appendChild(theoreticalHeader);
}

function appendToMainRow(row, promise) {
	const div = document.createElement("div");
	const span1 = document.createElement("span");
	span1.appendChild(document.createTextNode("Valor teórico"));

	const p = document.createElement("p");
	p.setAttribute("class", "td-card-simples__valor");

	const span2 = document.createElement("span");
	span2.setAttribute("class", "td-card-simples__valor--cifrao");
	span2.appendChild(document.createTextNode("R$"));

	p.appendChild(span2);

	const span3 = document.createElement("span");
	const text = document.createTextNode("Processando");
	span3.appendChild(text);

	p.appendChild(span3);

	div.appendChild(span1);
	div.appendChild(p);

	row
		.querySelector(".td-card-simples-valores div")
		.appendChild(div);

	promise.then(value => {
		text.textContent = `${value}`;
	});
}

function color(title) {
	if (title.includes("IPCA")) {
		return "#e4572e";
	} else if (title.includes("SELIC")) {
		return "#4b3f72";
	} else if (title.includes("IGP-M")) {
		return "#ffc914";
	} else {
		return "#119da4";
	}
}

function appendToMainTop(rowsData) {
	const byTitle = Object.values(rowsData)
		.reduce((a, b) => { 
			a[b.title] = a[b.title] || [];
			a[b.title].push(b.promise);
			return a;
		}, {});

	const titleHeader = buildTitleHeader(byTitle);

	const div = document.createElement("div");
	div.setAttribute("class", "td-investimentos-charts");

	const ul = document.createElement("ul");
	ul.setAttribute("class", "td-graph-list");
	ul.setAttribute("style", "width: 60%;");

	Object.keys(byTitle).forEach(title => {
		const li = document.createElement("li");
		li.setAttribute("onclick", "event.preventDefault();");
		const span1 = document.createElement("span");
		span1.setAttribute("class", "td-graph-list__item");

		const span2 = document.createElement("span");
		span2.setAttribute("class", "td-graph-list__icon");
		span2.setAttribute("style", `background-color:${color(title)};`);

		const titleNameSpan = document.createElement("span");
		titleNameSpan.setAttribute("style", "font-size: 1.6rem;");
		const titleName = document.createTextNode(title);
		titleNameSpan.appendChild(titleName);

		const span3 = document.createElement("span");
		span3.setAttribute("class", "td-graph-list__valor");
		span3.setAttribute("data-gross-amount", "Processando");
		const titleValue = document.createTextNode("Processando");
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
			titleValue.textContent = sum;
		});
	});

	div.appendChild(ul);

	document.querySelector(".td-investimentos-resumo-box").appendChild(titleHeader);
	document.querySelector(".td-investimentos-resumo-box").appendChild(div);
}

function buildTitleHeader(byTitle) {
	const titleDiv = document.createElement("div");
	titleDiv.setAttribute("class", "td-meus-investimentos");
	const titleDiv2 = document.createElement("div");
	titleDiv2.setAttribute("class", "td-meus-investimentos__valor-bruto");
	const titleP = document.createElement("p");
	titleP.setAttribute("class", "td-meus-investimentos__titulo");
	titleP.appendChild(document.createTextNode("Valor teórico total"));
	const titlePDiv = document.createElement("div");
	titlePDiv.setAttribute("class", "td-meus-investimentos__valor-box");
	const titleSign = document.createElement("span");
	titleSign.setAttribute("class", "td-meus-investimentos__cifrao");
	titleSign.appendChild(document.createTextNode("R$"));
	const totalValue = document.createElement("span");
	totalValue.setAttribute("class", "td-meus-investimentos__valor");
	totalValue.setAttribute("data-gross-amount", "Processando");
	const totalValueText = document.createTextNode("Processando");
	totalValue.appendChild(totalValueText);

	titlePDiv.appendChild(titleSign);
	titlePDiv.appendChild(totalValue);
	
	titleDiv2.appendChild(titleP);
	titleDiv2.appendChild(titlePDiv);
	titleDiv.appendChild(titleDiv2);

	Promise.all(Object.values(byTitle).reduce((a, b) => [].concat(a, b), [])).then(v => {
		const sum = v
			.map(s => parseFloat(s, 2))
			.reduce((a, b) => { return a + b; }, 0)
			.toFixed(2);
		totalValue.setAttribute("data-gross-amount", sum);
		totalValue.innerHTML = "";
		totalValue.appendChild(totalValueText);
		totalValueText.textContent = sum;
	});

	return titleDiv;
}