/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

const labels = {
	processing: "Processando",
	theoreticalBruteValue: "Valor teórico bruto",
	theoreticalValue: "Valor teórico",
	theoreticalTotalValue: "Valor teórico total",
	error: "Erro",
	partial: "Resultado parcial"
};

// taken from TesouroDireto source code
const color = title => {
	if (title.includes("IPCA")) {
		return "#e4572e";
	} else if (title.toUpperCase().includes("SELIC")) {
		return "#4b3f72";
	} else if (title.includes("IGP-M")) {
		return "#ffc914";
	} else if (title.toUpperCase().includes("PREFIXADO")) {
		return "#119da4";
	} else if (title === 'ERROR') {
		return "#ff2727";
	} else { // novelty color used in newly created column
		return "#abfabf";
	}
};

class Formatter {
	constructor(option) {
		this.formatter = this.buildFormatter(option);
	}

	format(a) {
		if (isNaN(a)) {
			return a;
		}

		return this.formatter.format(a);
	}

	buildFormatter(option) {
		switch (option) {
			case 'browser':
				return new Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'BRL' });
			case 'noop':
				return {
					format: a => a
				};
			case 'br':
			default:
				return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
		}
	}
}

const sumArray = arr => {
	const err = arr.find(isNaN)
	if (err) {
		return err;
	}

	return sumArrayValids(arr);
}

const sumArrayValids = arr => {
	return arr
		.filter(v => !isNaN(v))
		.map(s => parseFloat(s, 2))
		.reduce((a, b) => { return a + b; }, 0)
		.toFixed(2);
}

const countInvalids = arr => {
	return arr
		.filter(v => isNaN(v))
		.length;
}
