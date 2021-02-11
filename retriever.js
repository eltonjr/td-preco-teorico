/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

"use strict";

const theoreticalGetter = new RegExp('JSON\.parse\(\((.*)\)\);');
const details = document.getElementsByClassName("td-posicao-detalhada__info__link");
for (let i = 0; i < details.length; ++i) {
  let detail = details[i];
  let href = detail.getAttribute("href");
  let res = content.fetch(href, {
    credentials: 'same-origin'
  });
  res.then(r => r.text())
    .then(t => {
      const theoreticalGets = t.match(theoreticalGetter);
      if (theoreticalGets && theoreticalGets.length) {
        let data = theoreticalGets[1].slice(1,-1);
        try {
          data = JSON.parse(data);
          data = JSON.parse(data);
        } catch (e) {
          console.error(e);
          return;
        }

        const lastTheoreticalPrice = data[data.length-1].TheoreticalPrice;
        console.log(lastTheoreticalPrice);
        appendToRow(lastTheoreticalPrice);
      }
    })
    .catch(e => console.error(e));
}

function appendToRow(value) {
  const p = document.createElement('p');
  p.setAttribute("class", 'td-posicao-detalhada__info__valor');
  p.appendChild(document.createTextNode("Valor teórico bruto"));

  const span = document.createElement('span');
  span.setAttribute("class", 'td-posicao-detalhada__info__data');
  span.appendChild(document.createTextNode(`R$ ${value}`));

  p.appendChild(span);

  let row = document.querySelector('.td-posicao-detalhada__info');
  row.insertBefore(p, row.lastElementChild);
}

