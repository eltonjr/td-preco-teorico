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
	const p = document.createElement("p");
	p.setAttribute("class", "td-posicao-detalhada__info__valor");
	p.appendChild(document.createTextNode("Valor teórico bruto"));

	const span = document.createElement("span");
	const text = document.createTextNode("Processando");
	span.appendChild(text);

	p.appendChild(span);

	row.insertBefore(p, row.lastElementChild);

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

function appendToMainRow(row, promise) {
	const div = document.createElement("div");
	const span1 = document.createElement("span");
	span1.appendChild(document.createTextNode("Valor teórico bruto"));

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