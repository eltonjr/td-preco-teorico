/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

const ScrapperUtils = {
	brlToNumber: str => {
		if (!str) {
			return 0;
		}

		return Number(str
			.replace("R$", "")
			.replace(".", "")
			.replace(",", ".")
			.replace(";", "")
			.trim());
	},

	trimTitle: t => t.split("\n").map(s => s.trim()).filter(s => s).join(" "),

	getToken: doc => doc.querySelector("form#__AjaxAntiForgeryForm input").value,

	onclickActionGetter: new RegExp("[a-zA-Z]+\\('(.*)'\\);"),

	noop: _ => { }
}
