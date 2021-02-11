/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

"use strict";

const theoreticalGetter = new RegExp('JSON\.parse\(\((.*)\)\);');
const rows = document.getElementsByClassName("td-posicao-detalhada__info");
for (let i = 0; i < rows.length; ++i) {
  let row = rows[i];
  let detailsLink = row.lastElementChild;
  
  let href = detailsLink.getAttribute("href");
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
        appendToTitleRow(row, lastTheoreticalPrice);
      }
    })
    .catch(e => console.error(e));
}

