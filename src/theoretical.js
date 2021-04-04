/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

"use strict";

const theoreticalGetter = new RegExp("JSON\.parse\(\((.*)\)\);");
const onclickActionGetter = new RegExp("[a-zA-Z]+\\('(.*)'\\);");

function extractTheoreticalPrice(script) {
	const theoreticalGets = script.match(theoreticalGetter);
	if (theoreticalGets && theoreticalGets.length) {
		let data = theoreticalGets[1].slice(1,-1);
		try {
			data = JSON.parse(data);
			data = JSON.parse(data);
		} catch (e) {
			console.error(e);
			return "Invalid data";
		}

		return data[data.length-1].TheoreticalPrice;
	}
}

function extractTheoreticalPriceFromTitlePage(doc, appendToRows) {
	let rowsPromises = [];

	const rows = doc.getElementsByClassName("saldo-table-data-values");
	for (let i = 0; i < rows.length; ++i) {
		let row = rows[i];
		let onclickAction = row.getAttribute("onclick");
		let paramsStr = onclickAction.match(onclickActionGetter);
		let params = paramsStr[1].split('|');
		var obj = { CodigoInstituicaoFinanceira: params[0], CodigoTitulo: params[1], QuatidadeTitulo: params[2], MesConsulta: params[3], AnoConsulta: params[4], TickDataInvestimento: params[5] };
		var href = "/MeusInvestimentos/LoadDetalhe";
		var token = getToken();

		let res = content.fetch(href, {
			method: "POST",
			credentials: "same-origin",
			body: JSON.stringify(obj),
			redirect: 'follow',
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				"__RequestVerificationToken": token
			}
		});
		res = res
			.then(r => r.json())
			.then(o => {
				const lastTheoreticalPrice = extractTheoreticalPriceFromDetailsRequest(o.view);
				if (lastTheoreticalPrice) {
					return lastTheoreticalPrice;
				}
			})
			.catch(e => console.error(e));
		rowsPromises.push(res);

		if (appendToRows) {
			appendToTitleRow(row, res);
		}
	}

	return Promise.all(rowsPromises).then(v => {
		return v
			.reduce((a, b) => { return a + b; }, 0)
			.toFixed(2);
	});
}

function extractTheoreticalPriceFromDetailsRequest(viewStr) {
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
		.replace(",", "."));
}

function getToken() {
	return document.querySelector("form#__AjaxAntiForgeryForm input").value;
}