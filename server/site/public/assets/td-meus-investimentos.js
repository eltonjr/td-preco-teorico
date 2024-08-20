let loaderUtil = new LoaderUtil();

function showLoad() {
    loaderUtil.ShowLoader();
}

function hideLoad() {
    loaderUtil.HideLoader();
}

var Azul = "#119da4";
var Roxo = "#4b3f72";
var Laranja = "#e4572e";
var Amarelo = "#ffc914";

$(document).ready(function () {
    $("#lnkMeusInvestimentos").parent().addClass("td-acompanhar-lista__item--active");
    carregaVisualizacaoValoresInvestimento();
});

Chart.defaults.global.defaultFontFamily = "'Source Sans Pro', 'Open Sans', 'Helvetica Neue Light', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
Chart.defaults.global.defaultFontSize = 16;


if ($(window).width() <= 1024) {
    Chart.defaults.global.defaultFontSize = 13;
} else {
    Chart.defaults.global.defaultFontSize = 16;
}


$(window).on('resize',
    function () {
        var win = $(this);
        Chart.defaults.font.size = win.width() <= 1024 ? 13 : 16;
    });

// GRAFICO DA PAGINA INICIAL ACOMPANHAR
if ($('#meusInvestimentosGraph').length) {

    var labels = [positions.length - 1];
    var percentages = [positions.length - 1];
    var totalInvestments = 0;

    //Texto acessivel para o aria-label do canvas.
    var accessibilityText = "Imagem de um gráfico em forma de um círculo, mostrando os índices de ";

    for (let i = 0; i < positions.length; i++) {
        labels[i] = positions[i].FinIndxs.nm;
        percentages[i] = positions[i].invstmtAmt;
        totalInvestments += positions[i].invstmtAmt;
    }

    //Completa a string para adicionar no aria-label do canvas.
    for (let i = 0; i < positions.length; i++) {

        //Quando for o ultimo titulo
        if (i == positions.length - 1) {
            accessibilityText += " e " + labels[i] + ": " + parseFloat((percentages[i] * 100) / totalInvestments).toFixed(1) + "%.";
        }
        //Quando for o penultimo título
        else if (i == positions.length - 2) {
            accessibilityText += labels[i] + ": " + parseFloat((percentages[i] * 100) / totalInvestments).toFixed(1) + "%";
        }
        //Iteração normal
        else {
            accessibilityText += labels[i] + ": " + parseFloat((percentages[i] * 100) / totalInvestments).toFixed(1) + "%, ";
        }
    }

    //Atribui o texto acessivel ao aria-label do canvas.
    $('#meusInvestimentosGraph').attr("aria-label", accessibilityText);

    geraGraphInvestimentos(labels, percentages)

    // FECHA CLICANDO NO X
    $('.td-investir-snackbar__close').click(function () {
        $(".td-investir-snackbar").fadeOut(300);
    });
}

function geraGraphInvestimentos(labels, percentages) {


    var titulosNomes = (labels == undefined ? ["SELIC", "IPCA+", "IGP-M", "PREFIXADO"] : labels);

    var titulosCores = [
        {
            nome: "SELIC",
            cor: Roxo
        },
        {
            nome: "IPCA+",
            cor: Laranja
        },
        {
            nome: "IGP-M",
            cor: Amarelo
        },
        {
            nome: "PREFIXADO",
            cor: Azul
        },


    ];

    var cores = [];

    for (var filter in titulosNomes) {
        for (var arr in titulosCores) {
            if (titulosNomes[filter] == titulosCores[arr].nome) {
                cores.push(titulosCores[arr].cor);
            }
        }

    }

    var ctx = document.getElementById('meusInvestimentosGraph').getContext('2d');

    var InvestimentoGraph = new Chart(ctx,
        {
            type: 'doughnut',
            responsive: true,
            data: {
                labels: titulosNomes,
                datasets: [
                    {
                        data: percentages == undefined ? [46, 37, 7, 10] : percentages,
                        backgroundColor: cores,
                        borderWidth: 0
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                },
                cutoutPercentage: 60,
                hover: {
                    mode: null
                }
            }
        });


    function montaListaInvestimentos() {

        var nomeTitulos = InvestimentoGraph.data.labels; // Pega array dos nomes dos títulos
        var valorTitulos = InvestimentoGraph.data.datasets[0].data; // Pega array dos valores dos gráficos
        var corTitulo = InvestimentoGraph.data.datasets[0].backgroundColor; // Pega array dos cores dos gráficos
        var listaTitulos = '<ul class="td-graph-list">';

        var indexerTabs = [{ indexer: "SELIC", Tab: "1" }, { indexer: "PREFIXADO", Tab: "2" }, { indexer: "IPCA+", Tab: "3" }, { indexer: "IGP-M", Tab: "3" }];

        nomeTitulos.forEach(function (titulo, i) {

            var indexerTab = null;

            var targetTab = 0;

            for (var x = 0; x < indexerTabs.length; x++) {
                var indexerTab = indexerTabs[x];
                if (titulo !== indexerTab.indexer) continue;
                targetTab = indexerTab.Tab;
                break;
            }

            // Monta uma <li> para cada nome de título
            listaTitulos += '<li data-target-tab="' + targetTab + '"><a class="td-graph-list__item">' +
                '<span class="td-graph-list__icon" style="background-color:' +
                corTitulo[i] +
                ';"></span>' // Inclui o ícone com a cor do gráfico
                +
                titulo // Inclui o nome do título
                +
                '<span class="td-graph-list__valor td-graph-list__valor--remove-seta-mobile" data-gross-amount="' + formatMil(valorTitulos[i]) + '"> R$ ' +
                formatMil(valorTitulos[i]) +
                ' </span>' // Inclui o valor do título
                +
                '</a></li>';


        });

        listaTitulos += '</ul>';

        document.getElementById("listaMeusInvestimentos").innerHTML = listaTitulos;
    }
    montaListaInvestimentos();
}

function carregaVisualizacaoValoresInvestimento() {
    var olhoElement = $('.td-meus-investimentos__ver-valor').find("img.td-meus-investimentos__icon");
    var exibeValor = $("#hdnVisualizaValor").val() == "True" ? true : false;

    $('.td-meus-investimentos__valor').each(function (index) {
        var valorAtualizado = $(this).attr("data-gross-amount");
        var textoAtualizado = exibeValor ? valorAtualizado : "--";
        $(this).text(textoAtualizado);
    });

    //DEsativado por mudança na tela
    /*
    if (exibeValor) {
        olhoElement.attr("src", olhoElement.attr("src").replace("td-eye-green.svg", "td-eye-green-cut.svg"));
        visualizaValoresInvestimentos(true);
    }
    else {
        olhoElement.attr("src", olhoElement.attr("src").replace("td-eye-green-cut.svg", "td-eye-green.svg"));
        visualizaValoresInvestimentos(false);
    }*/
}

function toogleVisualizacaoValores() {

    $('.td-meus-investimentos__valor').each(function (index) {
        var valorAtualizado = $(this).attr("data-gross-amount");
        var textoAtualizado = $(this).text() === "--" ? valorAtualizado : "--";
        $(this).text(textoAtualizado);
    });

    var valorIsVisible = true;

    var olhoElement = $(this).find("img.td-meus-investimentos__icon");

    if (olhoElement.attr("src").indexOf("td-eye-green.svg") > 0) {
        olhoElement.attr("src", olhoElement.attr("src").replace("td-eye-green.svg", "td-eye-green-cut.svg"));
        valorIsVisible = true;
        gravaCookieOlho(true);
    }
    else {
        olhoElement.attr("src", olhoElement.attr("src").replace("td-eye-green-cut.svg", "td-eye-green.svg"));
        valorIsVisible = false;
        gravaCookieOlho(false);
    }
    visualizaValoresInvestimentos(valorIsVisible);
}

function visualizaValoresInvestimentos(valorIsVisible) {
    var valorCardBond = $("div#td-titulos-tab-group").find("span[data-gross-amount]");

    var valorGrafico = $(".td-graph-list__valor");

    $(valorCardBond).each(function (index, item) {
        $(item).text(valorIsVisible ? $(item).attr("data-gross-amount") : "--");
    });

    $(valorGrafico).each(function (index, item) {
        $(item).text(valorIsVisible ? "R$ " + $(item).attr("data-gross-amount") : "R$ --");
    });
}

function aplicaFiltroCorretoras(partyId) {
    showLoad();
    var tipoPagina = $("#hdnTipoPagina").val();
    var pagina = tipoPagina == 1 ? "/MeusInvestimentos" : "/Acompanhar";
    document.location.href = partyId === undefined || parseInt(partyId) === 0 || parseInt(partyId) === -1 ? pagina : `${pagina}/${partyId}`;
}

$(function () {

    $(".td-nav-list a.td-nav-acompanhar").addClass("td-navbar-list__link--active");
    $(".td-nav-list a.td-nav-acompanhar").attr("aria-current", true);

    if ($(window).width() > 1024) {
        $(".td-graph-list > li").click(function () {
            var targetTab = parseInt($(this).data("target-tab"));
            $($(".td-tabs-links__link")[targetTab]).click();

            $("html,body").animate({
                scrollTop: $(".td-tabs-links__link").offset().top - 90
            }, 'slow');
        });
    }


    $(".td-meus-investimentos__ver-valor").unbind().click(toogleVisualizacaoValores);

    $("#ddl_instituicaoFinanceira").change(function (event) {
        aplicaFiltroCorretoras(event.currentTarget.value);
    });

});

window.addEventListener('load', function () {
    hideLoad();
});

