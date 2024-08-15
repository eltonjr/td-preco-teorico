const theHelp = Chart.helpers;
let chartInstance = null;
const titulosCores = [
    {
        nome: "EDUCA+",
        cor: "#2B59C3"
    },
    {
        nome: "RENDA+",
        cor: "#A253A5"
    },
    {
        nome: "SELIC",
        cor: "#4B3F72"
    },
    {
        nome: "IPCA",
        cor: "#CE185D"
    },
    {
        nome: "IGPM",
        cor: "#F1B80C"
    },
    {
        nome: "PREFIXADO",
        cor: "#148389"
    },


];

const initPositionSummaryChart = () => {

    const corretoraSelecioanda = $('#corretora-selecionada');

    if (corretoraSelecioanda) {
        $('#ddl_instituicaoFinanceira').val($(corretoraSelecioanda).data('corretora-selecionada'))
    }

    carregarDadosGraficoPositionSummary();
}

const carregarDadosGraficoPositionSummary = () => {
    var dataInitial = `
        <div id="id_position-summary-box__content__skeleton" class="position-summary-box__content__skeleton">

        <div id="outer-circle" class="placeholder placeholder-glow">
        </div>


        <div id="legend-containere"><ul style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;"><li class="custom-legend__li"><div class="custom-legend__header placeholder placeholder-glow"><span style="background: rgb(43, 89, 195); display: inline-block; flex-shrink: 0; border-radius: 100px; height: 4px; width: 15px;"></span></div><div><p style="margin: 0px; padding: 0px;" class="placeholder placeholder-glow">EDUCA+</p><span style="display: flex;" class="placeholder placeholder-glow"><p class="p__porcentagem" style="background: rgb(43, 89, 195);">45.9 %</p></span></div></li><li class="custom-legend__li"><div class="placeholder placeholder-glow custom-legend__header"><span style="background: rgb(75, 63, 114); display: inline-block; flex-shrink: 0; border-radius: 100px; height: 4px; width: 15px;"></span></div><div><p style="margin: 0px; padding: 0px;" class="placeholder placeholder-glow">SELIC</p><span style="display: flex;" class="placeholder placeholder-glow"><p class="p__porcentagem" style="background: rgb(75, 63, 114);">44.3 %</p></span></div></li><li class="custom-legend__li"><div class="placeholder placeholder-glow custom-legend__header"><span style="background: rgb(162, 83, 165); display: inline-block; flex-shrink: 0; border-radius: 100px; height: 4px; width: 15px;"></span></div><div><p style="margin: 0px; padding: 0px;" class="placeholder placeholder-glow">RENDA+</p><span style="display: flex;" class="placeholder placeholder-glow"><p class="p__porcentagem" style="background: rgb(162, 83, 165);">5.3 %</p></span></div></li><li class="custom-legend__li"><div class="placeholder placeholder-glow custom-legend__header"><span style="background: rgb(206, 24, 93); display: inline-block; flex-shrink: 0; border-radius: 100px; height: 4px; width: 15px;"></span></div><div><p style="margin: 0px; padding: 0px;" class="placeholder placeholder-glow">IPCA</p><span style="display: flex;" class="placeholder placeholder-glow"><p class="p__porcentagem" style="background: rgb(206, 24, 93);">1.8 %</p></span></div></li><li class="custom-legend__li"><div class="custom-legend__header placeholder placeholder-glow"><span style="background: rgb(20, 131, 137); display: inline-block; flex-shrink: 0; border-radius: 100px; height: 4px; width: 15px;"></span></div><div><p style="margin: 0px; padding: 0px;" class="placeholder placeholder-glow">PREFIXADO</p><span style="display: flex;" class="placeholder placeholder-glow"><p class="p__porcentagem" style="background: rgb(20, 131, 137);">1.3 %</p></span></div></li><li class="custom-legend__li"><div class="placeholder placeholder-glow custom-legend__header"><span style="background: rgb(75, 63, 114); display: inline-block; flex-shrink: 0; border-radius: 100px; height: 4px; width: 15px;"></span></div><div><p style="margin: 0px; padding: 0px;" class="placeholder placeholder-glow">IGP-M</p><span style="display: flex;" class="placeholder placeholder-glow"><p class="p__porcentagem" style="background: rgb(75, 63, 114);">1.1 %</p></span></div></li></ul></div>
        </div>
        </div>

`
    $('#containerChartPositionSummary').empty();
    $('#containerChartPositionSummary').append(dataInitial);
    $.ajax({
        method: "POST",
        dataType: "Html",
        url: "/MeusInvestimentos/PositionSummaryChart",
        contentType: "application/json; charset=utf-8",
        cache: false,
        async: true,
        data: JSON.stringify({
            codigoAgenteCustodia: $('#ddl_instituicaoFinanceira').val()
        }),
        success: function (data) {
            $('#containerChartPositionSummary').append(data);
            $('.position-summary-box__content').addClass('display-none');
            afterLoad();
            setTimeout(() => geraGraficoPosicaoSumarizada(), 1000);
        },
        error: function (err) {
            console.log('Failed to get data' + err);

        }
    });
}

const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector('ul');

    if (!listContainer) {
        listContainer = document.createElement('ul');
        listContainer.style.display = 'grid';
        listContainer.style.gridTemplateColumns = '1fr 1fr';
        listContainer.style.gap = '10px';

        legendContainer.appendChild(listContainer);
    }

    return listContainer;
};

const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart, options) {
        const ul = getOrCreateLegendList(chart, "legend-container");

        // Remove old legend items
        while (ul.firstChild) {
            ul.firstChild.remove();
        }

        // Reuse the built-in legendItems generator
        const items = chart.options.plugins.legend.labels.generateLabels(chart);

        items.forEach((item, idx) => {
            const li = document.createElement('li');
            li.className = "custom-legend__li" + (item.hidden ? " opacity-legend" : "");

            li.onclick = () => {
                let {type} = chart.config;
                if (type === 'pie' || type === 'doughnut' || type === 'RoundedDoughnut') {
                    chart.getDatasetMeta(0).data[item.index].hidden = !chart.getDatasetMeta(0).data[item.index].hidden;
                } else {
                    chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
                }
                chart.update();
                calculaValorTotalGrafico();
           };

            const boxSpan = document.createElement('span');
            boxSpan.style.background = item.fillStyle;
            boxSpan.style.borderColor = item.strokeStyle;
            boxSpan.style.borderWidth = item.lineWidth + 'px';
            boxSpan.style.display = 'inline-block';
            boxSpan.style.flexShrink = 0;
            boxSpan.style.borderRadius = '100px';
            boxSpan.style.height = '4px';
            boxSpan.style.width = '15px';

            // Text
            const textContainer = document.createElement('p');
            textContainer.style.color = item.fontColor;
            textContainer.style.margin = 0;
            textContainer.style.padding = 0;

            const text = document.createTextNode(item.label);
            textContainer.appendChild(text);

            //
            const textPorcentagem = document.createElement('p');
            textPorcentagem.className = "p__porcentagem";

            textPorcentagem.style.background = item.fillStyle;
            textPorcentagem.style.borderColor = item.strokeStyle;
            textPorcentagem.style.color = item.fontColor;


            const textPer = document.createTextNode(item.text + " %");
            textPorcentagem.appendChild(textPer);

            const divSuperior = document.createElement("div");
            const divInferior = document.createElement("div");
            const spanPorcentagem = document.createElement("span");

            spanPorcentagem.style.display = "flex";

            spanPorcentagem.appendChild(textPorcentagem);

            divSuperior.className = "custom-legend__header";
            divSuperior.appendChild(boxSpan);

            divInferior.appendChild(textContainer);
            divInferior.appendChild(spanPorcentagem);

            li.appendChild(divSuperior);
            li.appendChild(divInferior);
            ul.appendChild(li);
        });
    }
};

function calculaValorTotalGrafico() {
    let textoGrafico = "Valor bruto total";
    const datas = chartInstance.getDatasetMeta(0).data.filter(x => x.hidden == null || !x.hidden);
    const valores = [];
    const datasGrafico = [];

    for (let x of datas) {
        valores.push(positionSummary.summary[x.$context.dataIndex].summaryGroupGrossAmount);
        datasGrafico.push(positionSummary.summary[x.$context.dataIndex]);
    }

     if (valores.length == 1) {
         textoGrafico = "Valor do titulo " + datasGrafico[0].summaryGroupName
    } else if (valores.length < positionSummary.summary.length) {
        textoGrafico = "Valor bruto selecionado";
    }


    const sum = valores.reduce((acc, currentValue) => acc + currentValue, 0);
    document.getElementById("valorTotalGrafico").innerHTML = "<small>R$</small> " + formatMil(sum, 2);
    document.getElementById("textoGrafico").innerText = textoGrafico;
}

//$(window).on('resize',
//    function () {
//        let win = $(this);
//        Chart.defaults.font.size = win.width() <= 1024 ? 13 : 16;
//    });

// GRAFICO DA PAGINA INICIAL ACOMPANHAR
//if ($('#summaryChart').length) {
//    carregarDadosGraficoPositionSummary();
//}



function geraGraficoPosicaoSumarizada() {

    let titulosNomes = [];
    let cores = [];
    let data = [];
    for (let filter in positionSummary.summary) {
        titulosNomes.push(positionSummary.summary[filter].summaryGroupName);
        let corTitulo = titulosCores.find(x => x.nome == positionSummary.summary[filter].summaryGroupName);
        cores.push(corTitulo?.cor ?? Roxo);
        data.push(positionSummary.summary[filter].summaryGroupPercentage);
    }


    let config = {
        type: 'doughnut',
        responsive: true,
        plugins: [htmlLegendPlugin],
        data: {
            labels: titulosNomes,
            datasets: [{
                data: data,
                backgroundColor: cores,
                hoverBackgroundColor: cores,
                fill: true,
                borderRadius: 30,
                borderColor: "#FFF",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            tooltips: {
                enabled: false,
            },
            legend: {
                display: false,
            },
            plugins: {
                htmlLegend: {
                    // ID of the container to put the legend in
                    containerID: 'legend-container',
                },
                legend: {
                    display: false,
                    labels: {
                        generateLabels: function (chart) {
                            let data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                return data.labels.map(function (label, i) {
                                    let meta = chart.getDatasetMeta(0);
                                    let ds = data.datasets[0];
                                    let arc = meta.data[i];
                                    let custom = arc && arc.custom || {};
                                    let getValueAtIndexOrDefault = theHelp.resolve;
                                    let arcOpts = chart.options.elements.arc;
                                    let fill = custom.backgroundColor ? custom.backgroundColor : ds.backgroundColor[i];
                                    let stroke = custom.borderColor ? custom.borderColor : ds.borderColor[i];
                                    let bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, undefined, i);
                                    return {
                                        // And finally :
                                        text: ds.data[i],
                                        label,
                                        fillStyle: fill,
                                        strokeStyle: stroke,
                                        lineWidth: bw,
                                        hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                                        index: i
                                    };
                                });
                            }
                            return [];
                        }
                    }
                },
                tooltip: {
                    enabled: false
                }
            },
            cutout: "85%",
            title: {
                display: false,
                text: 'Chart.js Doughnut Chart'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            },
            elements: {
                center: {
                    // the longest text that could appear in the center  7,500,000 /10,000,000
                    maxText: '100%',
                    text: '',
                    fontColor: '#000',
                    fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    fontStyle: 'bold',
                    minFontSize: 1,
                    maxFontSize: 256,
                }
            }
        }
    };

    let ctx = document.getElementById("summaryChart").getContext("2d");
    chartInstance = new Chart(ctx, config);
    setTimeout(() => calculaValorTotalGrafico(), 500);

}

$(document).ready(function () { initPositionSummaryChart(); });
