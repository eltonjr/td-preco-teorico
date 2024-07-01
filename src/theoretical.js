/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

"use strict";

const noop = _ => {};

function extractTheoreticalPriceFromMainPage(doc, dataSource, rowFn = noop) {
	// TODO make RowsData an object with strict fields
	const rowsData = getDataFromMainRows(doc, dataSource);
	const parser = new DOMParser();
	Object.keys(rowsData).forEach(href => {
		let res = content.fetch(href, {
			credentials: "same-origin",
			redirect: 'follow'
		});
		res = res
			.then(r => r.text())
			.then(t => {
				const titleDoc = parser.parseFromString(t, "text/html");
				return extractTheoreticalPriceFromTitlePage(titleDoc);
			})
			.catch(e => console.error(e));

		rowsData[href].promise = res;

		rowsData[href].elems.forEach(row => rowFn(row, res));
	});

	return Object.values(rowsData);
}

function getDataFromMainRows(doc, dataSource) {
	const rowsData = {};

	// version included in march/2021
	if (dataSource == "table") {
		const onclickRowGetter = new RegExp("location\.href='(.*)'");
		const rowBoxes = doc.getElementsByClassName("td-invest-table__row first-row-shadow");
		for (let i = 0; i < rowBoxes.length; ++i) {
			const box = rowBoxes[i];
			const onclickAction = box.getAttribute("onclick");
			const paramsStr = onclickAction.match(onclickRowGetter);
			const href = paramsStr[1];
			const title = trimTitle(box.querySelector(".title-name").innerText);
			rowsData[href] = rowsData[href] || { title: title, elems: [], promise: null };
			rowsData[href].elems.push(box);
		}
	}

	if (dataSource == "cards") {
		const rowBoxes = doc.getElementsByClassName("home-cards-container");
		for (let i = 0; i < rowBoxes.length; ++i) {
			const box = rowBoxes[i];
			const rows = box.children;
			for (let j = 0; j < rows.length; ++j) {
				const row = rows[j];
				const href = row.getAttribute("href");
				const title = trimTitle(row.querySelector("h2").innerText);
				rowsData[href] = rowsData[href] || { title: title, elems: [], promise: null };
				rowsData[href].elems.push(row);
			}
		}
	}

	if (dataSource == "boxes") {
		const titlesContent = doc.getElementsByClassName("lista-titulos-body__content");
		const brokers = titlesContent[0].children;
		Array.from(brokers)
			.filter(broker => broker.getAttribute("class") != "hidden")
			.map(broker => broker.querySelector("#titulos-wrapper").children)
			.flatMap(links => Array.from(links))
			.forEach(a => {
				const href = a.getAttribute("href");
				const title = trimTitle(a.querySelector(".titulo-card__title").innerText);
				rowsData[href] = rowsData[href] || { title: title, elems: [], promise: null };
				// rowsData[href].elems.push(row);
			});
	}

	return rowsData;
}

function trimTitle(t) {
	return t.split("\n").map(s => s.trim()).filter(s => s).join(" ")
}

function extractTheoreticalPriceFromTitlePage(doc, rowFn = noop) {
	const onclickActionGetter = new RegExp("[a-zA-Z]+\\('(.*)'\\);");

	const rows = doc.getElementsByClassName("saldo-table-data-values");
	const rowsPromises = Array.from(rows).map(row => {
		const tds = row.getElementsByTagName("td");
		const iconTd = Array.from(tds)[0];
		const anchors = iconTd.getElementsByTagName("a");
		const iconAnchor = Array.from(anchors)[0];
		const onclickAction = iconAnchor.getAttribute("onclick");
		const paramsStr = onclickAction.match(onclickActionGetter);
		const [
			CodigoInstituicaoFinanceira, 
			CodigoTitulo, 
			QuatidadeTitulo,
			MesConsulta,
			AnoConsulta,
			TickDataInvestimento
		] = paramsStr[1].split('|');
		const payload = { 
			CodigoInstituicaoFinanceira, 
			CodigoTitulo,
			QuatidadeTitulo,
			MesConsulta,
			AnoConsulta,
			TickDataInvestimento
		};
		const token = getToken();

		let res = extractTheoreticalPriceFromDetailsRequest(payload, token);
		rowFn(row, res);
		return res;
	})

	return Promise.all(rowsPromises).then(v => {
		return v
			.reduce((a, b) => { return a + b; }, 0)
			.toFixed(2);
	});
}

function extractTheoreticalPriceFromDetailsRequest(payload, token) {
	const response = content.fetch("/MeusInvestimentos/LoadDetalhe", {
		method: "POST",
		credentials: "same-origin",
		body: JSON.stringify(payload),
		redirect: 'follow',
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"__RequestVerificationToken": token
		}
	});
	return response
		.then(r => r.json())
		.then(o => extractTheoreticalPriceFromDetailsResponse(o.view));
}

function extractTheoreticalPriceFromDetailsResponse(viewStr) {
	const parser = new DOMParser();
	const modal = parser.parseFromString(viewStr, "text/html");
	const theoreticalSpan = modal.querySelector(".dataset2-legend .money-value");
	const valueStr = (theoreticalSpan || {}).textContent;
	return brlToNumber(valueStr);
}

function brlToNumber(str) {
	if (!str) {
		return 0;
	}

	return Number(str
		.replace("R$", "")
		.replace(".", "")
		.replace(",", ".")
		.replace(";", "")
		.trim());
}

function getToken() {
	return document.querySelector("form#__AjaxAntiForgeryForm input").value;
}