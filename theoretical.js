/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

"use strict";

const scripts = document.getElementsByTagName("script");
for (let i = 0; i < scripts.length; ++i) {
  let script = scripts[i];
  if (!script.src) {
    const theoreticalGetter = new RegExp('JSON\.parse\(\((.*)\)\);');
    const theoreticalGets = script.text.match(theoreticalGetter);
    if (theoreticalGets && theoreticalGets.length) {
      let data = theoreticalGets[1].slice(1,-1);
      try {
        data = JSON.parse(data);
        data = JSON.parse(data);
      } catch (e) {
        console.error(e);
        continue;
      }

      const lastTheoreticalPrice = data[data.length-1].TheoreticalPrice;
      appendToBody(lastTheoreticalPrice);
    }
  }
}

function appendToBody(value) {
  const h2 = document.createElement('h2');
  h2.setAttribute("class", 'td-meu-investimento-titulo');
  h2.appendChild(document.createTextNode("Valor total teórico bruto"));

  const span1 = document.createElement('span');
  span1.setAttribute("class", 'td-meu-investimento-titulo--valor');

  const span2 = document.createElement('span');
  span2.setAttribute("class", 'td-meu-investimento-titulo--cifrao');
  span2.appendChild(document.createTextNode("R$"));

  span1.appendChild(span2);
  span1.appendChild(document.createTextNode(value));
  h2.appendChild(span1);

  document.querySelector('.td-meu-investimento').appendChild(h2);
}
