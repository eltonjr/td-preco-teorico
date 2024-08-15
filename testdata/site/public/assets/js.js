/* Minification failed. Returning unminified contents.
(190,5-6): run-time error JS1014: Invalid character: #
(190,20-21): run-time error JS1005: Expected '(': ;
(190,20-21): run-time error JS1008: Expected '{': ;
(191,5-6): run-time error JS1014: Invalid character: #
(192,5-6): run-time error JS1014: Invalid character: #
(193,5-6): run-time error JS1014: Invalid character: #
(194,5-6): run-time error JS1014: Invalid character: #
(195,5-6): run-time error JS1014: Invalid character: #
(197,5-6): run-time error JS1014: Invalid character: #
(199,5-6): run-time error JS1014: Invalid character: #
(199,23): run-time error JS1004: Expected ';'
(201,14-15): run-time error JS1014: Invalid character: #
(201,50-51): run-time error JS1014: Invalid character: #
(203,18-19): run-time error JS1014: Invalid character: #
(203,56-57): run-time error JS1014: Invalid character: #
(211,5-6): run-time error JS1014: Invalid character: #
(211,34): run-time error JS1004: Expected ';'
(214,14-15): run-time error JS1014: Invalid character: #
(216,14-15): run-time error JS1014: Invalid character: #
(218,14-15): run-time error JS1014: Invalid character: #
(222,11): run-time error JS1004: Expected ';'
(224,14-15): run-time error JS1014: Invalid character: #
(225,14-15): run-time error JS1014: Invalid character: #
(226,14-15): run-time error JS1014: Invalid character: #
(227,14-15): run-time error JS1014: Invalid character: #
(228,14-15): run-time error JS1014: Invalid character: #
(229,14-15): run-time error JS1014: Invalid character: #
(231,14-15): run-time error JS1014: Invalid character: #
(231,67-68): run-time error JS1014: Invalid character: #
(232,14-15): run-time error JS1014: Invalid character: #
(232,70-71): run-time error JS1014: Invalid character: #
(233,14-15): run-time error JS1014: Invalid character: #
(233,69-70): run-time error JS1014: Invalid character: #
(238,1-13): run-time error JS1010: Expected identifier: 'use strict'
(238,13-14): run-time error JS1005: Expected '(': ;
(238,13-14): run-time error JS1008: Expected '{': ;
(1481,14-15): run-time error JS1014: Invalid character: #
(1482,14-15): run-time error JS1014: Invalid character: #
(1483,14-15): run-time error JS1014: Invalid character: #
(1484,14-15): run-time error JS1014: Invalid character: #
(1487,18-19): run-time error JS1014: Invalid character: #
(1491,5-6): run-time error JS1014: Invalid character: #
(1492,47-48): run-time error JS1014: Invalid character: #
(1495,5-6): run-time error JS1014: Invalid character: #
(1503,5-6): run-time error JS1014: Invalid character: #
(1504,14-15): run-time error JS1014: Invalid character: #
(1504,55-56): run-time error JS1014: Invalid character: #
(1505,14-15): run-time error JS1014: Invalid character: #
(1505,49-50): run-time error JS1014: Invalid character: #
(1508,5-6): run-time error JS1014: Invalid character: #
(1519,5-6): run-time error JS1014: Invalid character: #
(1523,5-6): run-time error JS1014: Invalid character: #
(1525,14-15): run-time error JS1014: Invalid character: #
(1526,14-15): run-time error JS1014: Invalid character: #
(1527,14-15): run-time error JS1014: Invalid character: #
(1530,5-6): run-time error JS1014: Invalid character: #
(1536,5-6): run-time error JS1014: Invalid character: #
(1537,31-32): run-time error JS1195: Expected expression: .
(1537,56-57): run-time error JS1003: Expected ':': ;
(1538,33-34): run-time error JS1195: Expected expression: .
(1538,58-59): run-time error JS1003: Expected ':': ;
(1539,39-40): run-time error JS1195: Expected expression: .
(1539,67-68): run-time error JS1003: Expected ':': ;
(1540,43-44): run-time error JS1195: Expected expression: .
(1540,71-72): run-time error JS1003: Expected ':': ;
(1542,46-47): run-time error JS1014: Invalid character: #
(1542,82-83): run-time error JS1014: Invalid character: #
(1550,5-6): run-time error JS1014: Invalid character: #
(1555,5-6): run-time error JS1014: Invalid character: #
(1562,5-6): run-time error JS1014: Invalid character: #
(1563,14-15): run-time error JS1014: Invalid character: #
(1563,37-38): run-time error JS1014: Invalid character: #
(1563,100-101): run-time error JS1014: Invalid character: #
(1566,5-6): run-time error JS1014: Invalid character: #
(1580,5-6): run-time error JS1014: Invalid character: #
(1586,5-6): run-time error JS1014: Invalid character: #
(238,1): run-time error JS1301: End of file encountered before function is properly closed
(1614,1): run-time error JS1107: Expecting more source characters
(1614,1): run-time error JS1009: Expected '}'
(197,6-27): run-time error JS1300: Strict-mode does not allow assignment to undefined variables: menuMobileClosedClass
 */
function validaData(data, format = "dd/MM/yyyy") {
    
    if (data == "" || data == null) {
        return false;
    }

    if (format == 'dd/MM/yyyy') {
        let dataArray = data.split("/");

        if (dataArray.length !== 3) {
            return false;
        }

        if (dataArray[2].length < 3) {
            data = dataArray[2] + "0" + "-" + dataArray[1] + "-" + dataArray[0];
        }
        else {
            data = dataArray[2] + "-" + dataArray[1] + "-" + dataArray[0];
        }
    }
   

    let nasc = new Date(data);
    let ano = nasc.getFullYear();
    let anoLength = String(ano);

    return !(isNaN(nasc.getDate()) || anoLength.length != 4);

}

function validarCPF(cpf) {

    let numCpf = cpf.replace(/[^\d]+/g, '');
    let add, rev;

    // Elimina CPFs invalidos conhecidos
    if (numCpf == '' || numCpf.length != 11 ||
        numCpf == "00000000000" ||
        numCpf == "11111111111" ||
        numCpf == "22222222222" ||
        numCpf == "33333333333" ||
        numCpf == "44444444444" ||
        numCpf == "55555555555" ||
        numCpf == "66666666666" ||
        numCpf == "77777777777" ||
        numCpf == "88888888888" ||
        numCpf == "99999999999") {
        return false;
    }

    // Valida 1o digito
    add = 0;
    for (let i = 0; i < 9; i++)
        add += parseInt(numCpf.charAt(i)) * (10 - i);

    rev = 11 - (add % 11);

    if (rev == 10 || rev == 11)
        rev = 0;

    if (rev != parseInt(numCpf.charAt(9)))
        return false;

    // Valida 2o digito
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(numCpf.charAt(i)) * (11 - i);

    rev = 11 - (add % 11);

    if (rev == 10 || rev == 11)
        rev = 0;

    return rev == parseInt(numCpf.charAt(10));

}

function validarEmail(email) {

    if (!email) {
        return false;
    }

    const trimmedEmail = email.trim(); 

    if (trimmedEmail === '') {
        return false;
    }

    return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(trimmedEmail);

};
var $btnAumentar = $("#btnAumentar");
var $btnReset = $("#btnReset");
var $btnDiminuir = $("#btnDiminuir");
var $elemento = $("body").find("*");
var fonts = [];
var reset = [];

(function obterTamanhoFonte() {
    for (var i = 0; i < $elemento.length; i++) {
        fonts.push(parseFloat($elemento.eq(i).css('font-size')));
        reset.push(parseFloat($elemento.eq(i).css('font-size')));
    }
})()

$btnAumentar.on('click', function () {
    for (var i = 0; i < $elemento.length; i++) {
        ++fonts[i];
        $elemento.eq(i).css('font-size', fonts[i]);
    }
});

$btnDiminuir.on('click', function () {
    for (var i = 0; i < $elemento.length; i++) {
        --fonts[i];
        $elemento.eq(i).css('font-size', fonts[i]);
    }
});

$btnReset.on('click', function () {
    for (var i = 0; i < $elemento.length; i++) {
        $elemento.eq(i).css('font-size', reset[i]);
        fonts[i] = reset[i];
    }
});

(function () {

    var Contrast = {
        storage: 'contrastState',
        cssClass: 'contrast',
        currentState: null,
        check: checkContrast,
        getState: getContrastState,
        setState: setContrastState,
        toogle: toogleContrast,
        updateView: updateViewContrast
    };

    window.toggleContrast = function () { Contrast.toogle(); };

    Contrast.check();

    function checkContrast() {
        this.updateView();
    }

    function getContrastState() {
        return localStorage.getItem(this.storage) === 'true';
    }

    function setContrastState(state) {
        localStorage.setItem(this.storage, '' + state);
        this.currentState = state;
        this.updateView();
    }

    function updateViewContrast() {

        var body = document.body;

        if (!body) return;

        if (this.currentState === null)
            this.currentState = this.getState();

        if (this.currentState)
            body.classList.add(this.cssClass);
        else
            body.classList.remove(this.cssClass);
    }

    function toogleContrast(event) {
        this.setState(!this.currentState);

        let value = event.target.getAttribute("aria-pressed");

        event.target.setAttribute("aria-pressed", (value == "false") ? "true" : "false");
        event.target.setAttribute("class", (value == "true") ? "td-nao-faz-nada" : "td-nav-list__link--active");
    }
})();

$(function () {
    $("h1").attr("id", "ancora");
});
;
class TesouroMenuHambuguerMobile {

    #btnMenuTrigger;
    #tdMenuMobile;
    #tdMenuMobileClose;
    #tdMenuMobilePerfilSeta;
    #tdMenuMobilePerfilItens;
    #tdMenuScrollable;

    #menuMobileClosedClass = "td-menu-mobile__closed";

    #toogleMenuState() {

        this.#tdMenuMobile.classList.toggle(this.#menuMobileClosedClass);

        if (this.#tdMenuMobile.classList.contains(this.#menuMobileClosedClass)) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }

    }

    #toogleMenuPerfilState(event) {

        let openedClass = "td-menu-mobile__item__seta__perfil__aberto";
        this.#tdMenuMobilePerfilSeta.classList.toggle(openedClass);

        this.#tdMenuMobilePerfilItens.classList.toggle('td-menu-mobile__collapsable__opened');

        this.#tdMenuScrollable.classList.toggle('td-menu-mobile__scrollable__openedPerfil');

    }

    Init() {

        this.#btnMenuTrigger = document.querySelector('button.td-menu-trigger');
        this.#tdMenuMobile = document.querySelector('div.td-menu-mobile');
        this.#tdMenuMobileClose = document.querySelector('div.td-menu-mobile__close');
        this.#tdMenuMobilePerfilSeta = document.querySelector('div.td-menu-mobile__item__seta__perfil');
        this.#tdMenuMobilePerfilItens = document.querySelector('div.td-menu-mobile__collapsable');
        this.#tdMenuScrollable = document.querySelector('div.td-menu-mobile__scrollable');

        this.#btnMenuTrigger.addEventListener('click', () => this.#toogleMenuState());
        this.#tdMenuMobileClose.addEventListener('click', () => this.#toogleMenuState());
        this.#tdMenuMobilePerfilSeta.addEventListener('click', this.#toogleMenuPerfilState.bind(this));

    }

};
'use strict';

var _initCarouselSubAjuda;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(window).scroll(function () {
    $('.td-header').toggleClass('td-header--scrolled', $(this).scrollTop() > 10);
});

if (/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)) {
    $(".td-nav-list").insertAfter(".td-header");
};

$(".td-login-input").on('input', function () {
    $(this).parent(".td-label").removeClass("td-label--erro");
    $(this).next(".td-login-input-subtitulo--erro").css("display", "none");
});

$("#ver-login-senha").click(function () {
    $(this).toggleClass("td-login-input-icon-custon--senha--active");
    mostraSenha("login-senha");
});

$("#ver-nova-senha").click(function () {
    $(this).toggleClass("td-login-input-icon-custon--senha--active");
    mostraSenha("nova-senha");
});

$("#ver-meus-dados-senha").click(function () {
    $(this).toggleClass("td-login-input-icon-custon--senha--active");
    mostraSenha("meus-dados-senha");
});

$("#ver-confirmacao-senha").click(function () {
    $(this).toggleClass("td-login-input-icon-custon--senha--active");
    mostraSenha("confirmar-nova-senha");
});

function mostraSenha(input) {
    var inputSenha = document.getElementById(input);
    if (inputSenha.type === "password") {
        inputSenha.type = "text";
    } else {
        inputSenha.type = "password";
    }
}

function desvincular_clickHandler(event) {
    if ($('#modal-desvincular-conta').length) {
        $('#modal-desvincular-conta').show();

        if ($('#usuario').length) {
            $('#usuario').hide();
        }       

        if ($('#cancelar-desvinculo').length) {
            $('#cancelar-desvinculo').click(function () {
                $('#modal-desvincular-conta').hide();
            })
        }
    }
}

function continuarDesvinculo_clickHandler(event) {

    if ($('#desvincular-conta-form').length) {
        $('#desvincular-conta-form').submit()
    }
}

$(document).ready(function () {

    if ($('#login-cpf').length) {
        $('#login-cpf').mask('000.000.000-00');
    }

    if ($('#recuperar-senha-cpf').length) {
        $('#recuperar-senha-cpf').mask('000.000.000-00');
    }

    if ($('#recuperar-senha-nasc').length) {
        $('#recuperar-senha-nasc').mask('00/00/0000');
    }

    if ($('#data-nasc').length) {
        $('#data-nasc').mask('00/00/0000');
    }

    if ($('#dataAgendamento').length) {
        $('#dataAgendamento').mask('00/00/0000');
    }

    if ($('.td-operacoes-filtro__input-date').length) {
        $('.td-operacoes-filtro__input-date').mask('00/00/0000');
    }

    if ($('.td-reinvestir-data-agendamento ').length) {
        $('.td-reinvestir-data-agendamento ').mask('00/00/0000');
    }

    if ($('.td-parametros-input').length) {
        $('#dataResgateParametro').mask('00/00/0000');
        $('.td-parametros-input').mask('###,00', { reverse: true });
    }

    if ($('#dataInvestimento').length) {
        $('#dataInvestimento').mask('00/00/0000');
    }

    if ($('.td-meus-dados-input--ddd').length) {
        $('.td-meus-dados-input--ddd').mask('00');
    }
    if ($('.td-meus-dados-input--phone').length) {
        $('.td-meus-dados-input--phone').mask('00000-0000');
    }

    if ($('#smsDDD').length) {
        $('#smsDDD').mask('00');
    }

    if ($('#smsCel').length) {
        $('#smsCel').mask('0 0000 - 0000', { reverse: true });
    }

    if ($('.td-investir-input--money').length) {
        $('.td-investir-input--money').mask('#.##0,00', { reverse: true });
    }

    if ($('#dataResgateParametro').length) {
        $('#dataResgateParametro').mask('00/00/0000');
    }

    if ($('#btnDesvincular').length) {
        $('#btnDesvincular').click(desvincular_clickHandler)
    }


    if ($('#btnDesvincularMobile').length) {
        $('#btnDesvincularMobile').click(desvincular_clickHandler)
    }

    if ($('#continuar-desvinculo').length) {
        $('#continuar-desvinculo').click(continuarDesvinculo_clickHandler)
    }

});

function openModalSenha() {
    var modal = $(".td-recuperar-senha-modal");
    var btn = $("#btnModalSenha");

    btn.click(function () {
        modal.css("display", "block");
        modal.focus();
    });

    $(document).mouseup(function (e) {
        var container = $(".td-recuperar-senha-modal__content");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            modal.fadeOut(200);
        }
    });
}

openModalSenha()

$(".td-meus-investimentos__ver-valor").click(function () {
    $(".td-meus-investimentos__valor").toggleClass("td-meus-investimentos__valor--oculto");

    if (!$(".td-meus-investimentos__valor").hasClass('td-meus-investimentos__valor--oculto')) {
        $(".td-meus-investimentos__icon").attr('src', '/Content/img/icon/td-eye-green-cut.svg');
    } else {
        $(".td-meus-investimentos__icon").attr('src', '/Content/img/icon/td-eye-green.svg');
    }
});

$(".td-investimentos-charts__tip-trigger").hover(function () {
    $(".td-investimentos-charts__tip").toggleClass("td-investimentos-charts__tip--active");
});

$(".td-tip").hover(function () {
    let contentWithoutSpeces = $(this).find(".td-tip__info").text().trim();
    $(this).find(".td-tip__info").text(contentWithoutSpeces).toggleClass("td-tip__info--active");
});

function mostraFiltroAvancado() {
    $(".td-operacoes-filtro__avancado").click(function () {
        $(".td-operacoes-filtro-avancado").toggleClass("td-operacoes-filtro-avancado--active");
        $(".td-operacoes-filtro__buttons").toggleClass("td-operacoes-filtro__buttons--active");
        $(".td-operacoes-filtro__avancado").toggleClass("td-operacoes-filtro__avancado--active");
    });
}

mostraFiltroAvancado();

function verificaValorInput() {

    var taSelecionado1 = true;
    var taSelecionado2 = true;

    if ($('li[data-value="selecione"]').hasClass("selected")) {
        taSelecionado1 = true;
    } else {
        taSelecionado1 = false;
    };

    if ($('li[data-value="selecione_2"]').hasClass("selected")) {
        taSelecionado2 = true;
    } else {
        taSelecionado2 = false;
    };

    if ($('#operacoesDataFinal').val() !== "" || $('#operacoesDataInicio').val() !== "" || taSelecionado1 == false || taSelecionado2 == false) {
        $('#btnLimparFiltro').removeClass("btn--operacoes-filtro--disabled");
    } else {
        $('#btnLimparFiltro').addClass("btn--operacoes-filtro--disabled");
    }
}

if ($('.btn--operacoes-filtro--disabled').length) {
    $('input').on('input', function (e) {
        verificaValorInput();
    });

    $("body").click(function () {
        verificaValorInput();
    });

    $("div").hover(function () {
        verificaValorInput();
    });
}

$("#btnLimparFiltro").click(function () {
    $('.td-consulta-filtro-form').trigger("reset");
    $(this).addClass("btn--operacoes-filtro--disabled");
    $('select').niceSelect('update');
});

function abreFiltroMobile() {
    $(".td-consulta-filtro-form").addClass("td-consulta-filtro-form--modal");
    $(".td-filtro-avancado-topo-mobile").addClass("td-filtro-avancado-topo-mobile--active");
    $("body").addClass("td-body--fixed");
    $("header").addClass("td-hidden-mobile");
    $(".td-operacoes-filtro-avancado").addClass("td-operacoes-filtro-avancado--active");
    $(".td-operacoes-filtro__buttons").addClass("td-operacoes-filtro__buttons--active");
    $(".td-operacoes-filtro__avancado").addClass("td-operacoes-filtro__avancado--active");

    if ($('.td-operacoes-resultado-busca-topo').length) {
        $(".td-operacoes-filtro").removeClass("td-hidden-mobile");
    }
}

function fechaFiltroMobile() {
    $(".td-consulta-filtro-form").removeClass("td-consulta-filtro-form--modal");
    $(".td-filtro-avancado-topo-mobile").removeClass("td-filtro-avancado-topo-mobile--active");
    $("body").removeClass("td-body--fixed");
    $("header").removeClass("td-hidden-mobile");
    $(".td-operacoes-filtro-avancado").removeClass("td-operacoes-filtro-avancado--active");
    $(".td-operacoes-filtro__buttons").removeClass("td-operacoes-filtro__buttons--active");
    $(".td-operacoes-filtro__avancado").removeClass("td-operacoes-filtro__avancado--active");

    if ($('.td-operacoes-resultado-busca-topo').length) {
        $(".td-operacoes-filtro").addClass("td-hidden-mobile");
    }
}

$("#filtroAvancadoMobile").click(function () {
    abreFiltroMobile();
});

$("#fechaFiltroAvancado").click(function () {
    fechaFiltroMobile();
});

carregarClickTabOperacoes();
carregarClickTabGrupo();

if ($('select').length) {
    $(document).ready(function () {
        const isMobileAccess = $('body').data('mobile-access');

        if (isMobileAccess && isMobileAccess == 'True') {
            const selects = $('select');
            for (var i = 0; i < selects.length; i++) {
                const customSelect = $(selects[i]).attr('customselect');

                if (customSelect) {
                    if (customSelect == 'True') {
                        $(selects[i]).niceSelect();
                    }
                } else {
                    $(selects[i]).niceSelect();
                }


            }
        } else {
            $('select').niceSelect();
        }
       
      
    });
}

function carregarClickTabGrupo() {
    $('.td-tab-group > div').hide();
    $('.td-tab-group > div:first-of-type').show();

    $('.td-tabs-links a').click(function (e) {
        e.preventDefault();
        var $this = $(this),
            tabgroup = '#' + $this.parents('.td-tabs-links').data('tabgroup'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();
    });
}

var tipoinvestimento = $("#tipo-meusinvestimento").val();
if (tipoinvestimento != "" && tipoinvestimento != null) {
    var target = $('#tab-' + tipoinvestimento + '').attr('href');
    $('.td-tab-group > div').hide();
    $('#tab-' + tipoinvestimento + '').show();
    $('.td-tabs-links__link').removeClass("active").attr('aria-selected', false);
    $('#tab-' + tipoinvestimento + '').addClass("active").attr('aria-selected', true);
    $(target).show();
}

function carregarClickTabOperacoes() {
    $('.td-tab-operacoes-group > div').hide();
    $('.td-tab-operacoes-group > div:first-of-type').show();
    $('.td-tabs-operacoes-links a').click(function (e) {
        e.preventDefault();
        var $this = $(this),
            tabgroup = '#' + $this.parents('.td-tabs-operacoes-links').data('tabgroup'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();
    });
}

if ($('.td-detalhe-grafico-info').length) {
    var colocaNomeInstituicaoAfterGrafico = function colocaNomeInstituicaoAfterGrafico() {
        $(".td-meus-investimentos-deatlhe-instituicao").insertAfter(".td-ver-grafico-link");
    };

    var colocaNomeInstituicaoBeforerGrafico = function colocaNomeInstituicaoBeforerGrafico() {
        $(".td-meus-investimentos-deatlhe-instituicao").insertAfter("#topoGraficoDesk");
    };

    if ($(window).width() <= 1024) {
        colocaNomeInstituicaoAfterGrafico();
    } else {
        colocaNomeInstituicaoBeforerGrafico();
    }

    $(window).on('resize', function () {
        var win = $(this);
        if (win.width() <= 1024) {
            colocaNomeInstituicaoAfterGrafico();
        }
        if (win.width() >= 1024) {
            colocaNomeInstituicaoBeforerGrafico();
        }
    });
}

$("#verGrafico").click(function () {
    $(".td-div-grafico-mobile").css("display", "block");
    $(".td-detalhe-grafico-info").css("display", "none");
});

$("#voltarGrafico").click(function () {
    $(".td-div-grafico-mobile").fadeOut(200);
    $(".td-detalhe-grafico-info").css("display", "block");
});

$(".td-card-resgatar__adicionar").click(function () {
    $(this).closest('.td-card-resgatar').addClass("td-card-resgatar--aberto");
});

$(".td-resgatar-remover").click(function () {
    $(this).closest('.td-card-resgatar').removeClass("td-card-resgatar--aberto");
    $(this).closest('.td-card-resgatar').find('input').val('0,00');
});

var cardAtualCarrinho = '';
$(".td-carrinho-card-remover").click(function () {
    cardAtualCarrinho = $(this).parents('.td-carrinho-card');
    var modal = $("#modalRemoverCarrinho");
    var body = $("body");

    function closeModal() {
        modal.fadeOut(200);
        body.removeClass("td-body--fixed");
    }

    modal.css("display", "block");
    modal.focus();
    body.addClass("td-body--fixed");

    $('.btn').on('click', function () {
        closeModal();
    });

    $('#simRemoverCarinho').on('click', function () {
        cardAtualCarrinho.one().fadeOut();
    });

    $(document).mouseup(function (e) {
        var container = $(".td-modal-remover-carrinho__content");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            closeModal();
        }
    });
});

function formatMil(value, casasDecimais) {

    if (casasDecimais == null) {
        casasDecimais = 2;
    }

    var stringResp = "";
    var valueAsString = value.toFixed(casasDecimais);
    var centsValue = valueAsString.split('.')[1];
    var integerValue = valueAsString.split('.')[0];

    for (var i = 1; i <= integerValue.length; i++) {
        if ((i - 1) % 3 == 0 && i - 1 != 0) {
            stringResp += "." + integerValue[integerValue.length - i];
        } else {
            stringResp += integerValue[integerValue.length - i];
        }
    }
    centsValue == undefined ? centsValue = "00" : centsValue = centsValue;
    stringResp = stringResp.split('').reverse().join('') + "," + centsValue;
    return stringResp;
}

if ($('.td-resgatar-resumo').length) {
    var asideResgatarMobile = function asideResgatarMobile() {
        $(".td-resgatar-small").insertAfter(".td-resgatar-radios");
        $(".td-resgatar-resumo").insertAfter(".td-resgatar-data-agendamento");
    };

    var asideResgatarDesk = function asideResgatarDesk() {
        $(".td-resgatar-resumo").insertAfter(".td-resgatar-aside__titulo");
        $(".td-resgatar-small").insertAfter(".td-resgatar-data-agendamento");
    };

    if ($(window).width() <= 1024) {
        asideResgatarMobile();
    } else {
        asideResgatarDesk();
    }

    $(window).on('resize', function () {
        var win = $(this);
        if (win.width() <= 1024) {
            asideResgatarMobile();
        }
        if (win.width() >= 1024) {
            asideResgatarDesk();
        }
    });
}

function verificaValorInputExtrato() {

    var taSelecionadoInstituicao = true;
    var taSelecionadoAno = true;
    var taSelecionadoMes = true;

    if ($('li[data-value="selecione"]').hasClass("selected")) {
        taSelecionadoInstituicao = true;
    } else {
        taSelecionadoInstituicao = false;
    };

    if ($('li[data-value="ano"]').hasClass("selected")) {
        taSelecionadoAno = true;
    } else {
        taSelecionadoAno = false;
    };

    if ($('li[data-value="mes"]').hasClass("selected")) {
        taSelecionadoMes = true;
    } else {
        taSelecionadoMes = false;
    };

    if (taSelecionadoInstituicao === false || taSelecionadoAno === false || taSelecionadoMes === false) {
        $('#btnLimparFiltroExtrato').removeClass("btn--extrato--disabled");
        $('#btnLimparFiltroExtrato').attr("aria-disabled", false);

        $('#btnAplicarFiltroExtrato').attr("aria-disabled", false);

        $("#btnLimparFiltroExtrato").one("click", function () {
            $('#resultados').css("display", "none");
            $("#instituicao").val('selecione');
            $("#mes").val('mes');
            $("#ano").val('ano');
            $(this).addClass("btn--extrato--disabled");
            $('#btnLimparFiltroExtrato').attr("aria-disabled", true);

            $(".td-extrato-buttons").attr("aria-live", "assertive");

            $("#btnLimparFiltroExtrato").text("Filtros limpos");

            setTimeout(function () {
                $(".td-extrato-buttons").attr("aria-live", "off");
                $("#btnLimparFiltroExtrato").text("Limpar filtros");
            }, 1000);

            setTimeout(function () {
                $(".td-extrato-buttons").attr("aria-live", "polite");
            }, 1200);

            $(".list li").removeClass("selected").removeClass("focus").attr("aria-pressed", false);
            $(".td-extrato-form__select--instituicao").find("span").text('selecione');
            $(".td-extrato-form__select--mes").find("span").text('mes');
            $(".td-extrato-form__select--ano").find("span").text('ano');

        });

        $("#btnAplicarFiltroExtrato").one("click", function () {

            $(".td-extrato-buttons").attr("aria-live", "polite");
            $("#btnAplicarFiltroExtrato").text("Filtro aplicado");

            setTimeout(function () {
                $(".td-extrato-buttons").attr("aria-live", "off");
                $("#btnAplicarFiltroExtrato").text("Aplicar");
            }, 1000);

            setTimeout(function () {
                $(".td-extrato-buttons").attr("aria-live", "polite");
            }, 1200);

        });

    } else {
        $('#btnLimparFiltroExtrato').addClass("btn--extrato--disabled");
        $('#btnLimparFiltroExtrato').attr("aria-disabled", true);
    }
}

if ($('.btn--extrato').length) {

    $("body").click(function () {
        verificaValorInputExtrato();
    });

    $("div").hover(function () {
        verificaValorInputExtrato();
    });
}

$("#filtroExtratoMobile").click(function () {
    $('.td-extrato-busca--resultado').css("display", "block");
    $('.td-busca-resultado').css("display", "none");
});

$(".td-extrato-busca-topo-mobile").click(function () {
    $('.td-extrato-busca--resultado').css("display", "none");
    $('.td-busca-resultado').css("display", "block");
});

$(".td-reinvestir-titulos-trigger").click(function () {
    $(this).next('div').toggleClass("td-reinvestir-titulos-box--active");
    $(this).toggleClass("td-reinvestir-titulos-trigger--active");
});

function abreSnackBar(btn, snackbar, investirAgora) {
    var btn, snackbar, investirAgora;

    btn.click(function () {
        snackbar.css("display", "block");

        if ($(window).width() <= 1024) {
            investirAgora.css("display", "block");
        } else {
            investirAgora.css("display", "none");
        }

        $(window).on('resize', function () {
            var win = $(this);
            if (win.width() <= 1024) {
                investirAgora.css("display", "block");
            }
            if (win.width() >= 1024) {
                investirAgora.css("display", "none");
            }
        });

        $(document).mouseup(function (e) {
            var container = snackbar;
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                snackbar.fadeOut(200);
            }
        });
    });

    $('.td-investir-snackbar__close').click(function () {
        snackbar.fadeOut(300);
    });
}

$(document).mouseup(function (e) {
    var container = $(".td-investir-snackbar");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        $(".td-carrinho-snackbar").fadeOut(200);
    }
});

$('.td-carrinho-snackbar__close').click(function () {
    $(".td-carrinho-snackbar").fadeOut(300);
});

function openModal(modal, btn, btnClose) {
    btn.click(function () {
        modal.css("display", "block");
        $("body").addClass("td-body--fixed");
    });

    function closeModal() {
        modal.fadeOut(200);
        $("body").removeClass("td-body--fixed");
        modal.find('input').val('');
    }

    btnClose.click(function () {
        closeModal();
    });
}

function openModalInternoSimulador(modal, btn, btnClose) {
    btn.click(function () {
        modal.css("display", "block");
        modal.focus();
        $("body").addClass("td-body--fixed");
    });

    function closeModal() {
        modal.fadeOut(200);
        modal.find('input').val('');
    }

    btnClose.click(function () {
        closeModal();
    });

    if ($(window).width() <= 1024) {
        $(document).mouseup(function (e) {
            var container = $(".td-modal-investir-conteudo");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                modal.fadeOut(200);
            }
        });
    }
}

if ($('.td-carrinho-radios__label').length) {
    $('input').on('input', 'change', function (e) {
        verificaSeAgendaMensal();
    });

    $("body").click(function () {
        verificaSeAgendaMensal();
    });

    $("div").hover(function () {
        verificaSeAgendaMensal();
    });
}

function verificaSeAgendaMensal() {
    var taSelecionado = true;

    if ($('li[data-value="agendamento_mensal"]').hasClass("selected")) {
        taSelecionado = true;
    } else {
        taSelecionado = false;
    };

    if (taSelecionado == true) {
        $('#quantidadeMeses').fadeIn(200);
    } else {
        $('#quantidadeMeses').fadeOut(200);
    }
}

$(document).ready(function () {
    var oneAtTime = 1;
    var inDesignMode = 0;
    if (inDesignMode !== "1") {
        $('.td-accordion__content').hide();
        $('.td-accordion__active .td-accordion__content').show();
        if (oneAtTime == 1) {
            $('.td-accordion__trigger__title, .td-accordion__trigger__header__arrow').click(function () {
                var openVariable = $(this).parent();
                if ($('.td-accordion').hasClass("td-precosTaxas-accordion")) {
                    openVariable = $(this).parent().parent();
                }
                if ($(openVariable).hasClass("td-accordion__active")) {
                    $(openVariable).removeClass('td-accordion__active');
                    $(openVariable).children('.td-accordion__content').slideUp(200);
                } else {
                    if ($('.td-accordion').hasClass("td-precosTaxas-accordion")) {
                        $(openVariable).removeClass('td-accordion__active');
                        $(openVariable).children('.td-accordion__content').slideUp(200);
                    } else {
                        $('.td-accordion__trigger').removeClass('td-accordion__active');
                        $('.td-accordion__content').slideUp(200);
                    }
                    $(openVariable).addClass('td-accordion__active');
                    $(openVariable).children().slideDown(200);
                }
                return false;
            });
        } else {
            $('.td-accordion__trigger__title').click(function () {
                var openVariable = $(this).parent();
                if ($('.td-accordion').hasClass("td-precosTaxas-accordion")) {
                    openVariable = $(this).parent().parent();
                }
                if ($(openVariable).hasClass("td-accordion__active")) {
                    $(openVariable).removeClass('td-accordion__active');
                    $(openVariable).children().slideUp(200);
                } else {
                    $(openVariable).addClass('td-accordion__active');
                    $(openVariable).children().slideDown(200);
                }
                return false;
            });
        }
    } else {
        $('.td-accordion__content').show();
    }
});

var initCarouselSubAjuda = (_initCarouselSubAjuda = {
    centerMode: true,
    arrows: false,
    infinite: false
}, _defineProperty(_initCarouselSubAjuda, 'centerMode', false), _defineProperty(_initCarouselSubAjuda, 'slidesToScroll', 1), _defineProperty(_initCarouselSubAjuda, 'slidesToShow', 1.5), _defineProperty(_initCarouselSubAjuda, 'centerPadding', '3rem'), _defineProperty(_initCarouselSubAjuda, 'draggable', false), _defineProperty(_initCarouselSubAjuda, 'swipeToSlide', false), _defineProperty(_initCarouselSubAjuda, 'touchMove', false), _initCarouselSubAjuda);

$(function () {
    var winCarousel = $(window);
    var carouselGoals = $(".td-ajuda-categorias");

    winCarousel.on("load resize", function () {
        if (winCarousel.width() < 540) {
            carouselGoals.not(".slick-initialized").slick(initCarouselSubAjuda);
        } else if (carouselGoals.hasClass("slick-initialized")) {
            carouselGoals.slick("unslick");
        }
    });
});

$('.td-meus-dados-show__data__link').click(function () {
    if ($(this).next(".td-meus-dados-box-change").length) {
        if ($(this).next(".td-meus-dados-box-change").css("display") != "none") {
            $(this).next(".td-meus-dados-box-change").slideUp(200);
            if ($(window).width() <= 860) {
                $("body").removeAttr("style");
            }
        } else {
            $(".td-meus-dados-box-change").slideUp(200);
            $(this).next(".td-meus-dados-box-change").slideDown(200);
            if ($(window).width() <= 860) {
                $("body").css("overflow", "hidden");
            }
        }
    }
});

$('.td-meus-dados-box-change__header__back-link').not(".td-meus-dados-box-change__header__back-link--cd_verificacao").click(function () {
    if ($(this).parent().parent().parent(".td-meus-dados-box-change").length) {
        $(this).parent().parent().parent(".td-meus-dados-box-change").slideUp(200);
        if ($(window).width() <= 860) {
            $("body").removeAttr("style");
        }
    }
});
$(window).on("resize load", function (e) {
    if ($(".td-meus-dados-box-change:visible").length > 0) {
        if ($(window).width() > 860) {
            $("body").removeAttr("style");
        }
    }
});

$(document).on("input", "#contatoMensagem", function () {
    var limite = 1000;
    var informativo = "caracteres restantes.";
    var caracteresDigitados = $(this).val().length;
    var caracteresRestantes = limite - caracteresDigitados;

    if (caracteresRestantes <= 0) {
        var comentario = $("textarea[name=contatoMensagem]").val();
        $("textarea[name=contatoMensagem]").val(comentario.substr(0, limite));
        $(".td-contato-caracteres").text("0 " + informativo);
    } else {
        $(".td-contato-caracteres").text(caracteresRestantes + " " + informativo);
    }
});

$(window).scroll(function () {
    $('.td-carrinho-aisde-box').toggleClass('td-carrinho-aisde-box--sticky', $(this).scrollTop() > 100);
});

$('.td-carrinho-aisde-box').toggleClass('td-carrinho-aisde-box--sticky', $(undefined).scrollTop() > 100);

$(window).scroll(function () {
    $('.td-resgatar-aisde-box').toggleClass('td-resgatar-aisde-box--sticky', $(this).scrollTop() > 100);
});

$('.td-resgatar-aisde-box').toggleClass('td-resgatar-aisde-box--sticky', $(undefined).scrollTop() > 100);

$('#dataResgateParametro').focus(function () {
    $(".td-form-tooltip__content--datepicker").addClass('td-form-tooltip__content--datepicker--active');
});

$('#dataResgateParametro').blur(function () {
    $(".td-form-tooltip__content--datepicker").removeClass('td-form-tooltip__content--datepicker--active');
});

$(".td-acompanhar-lista__link").click(function () {
    $(this).parent("li").toggleClass("td-acompanhar-lista__item--active");
});


if ($(window).width() <= 1024) {
    $(".td-nav-list").insertAfter(".td-header");

} else {
    $(".td-nav-list").insertBefore(".td-nav-cart");
}

$(window).on('resize', function () {
    var win = $(this);
    if (win.width() <= 1024) {
        $(".td-nav-list").insertAfter(".td-header");
    }
    if (win.width() > 1024) {
        $(".td-nav-list").insertBefore(".td-nav-cart");
    }
});

$(function () {

    function asideAcompanharSticky() {
        var $nav = $(".td-header");
        var $aside = $(".td-acompanhar-aside");
        var $menu = $(".td-acompanhar-menu");
        if ($('.td-avisos-box').length) {
            $aside.addClass('td-acompanhar-aside--sticky', $(this).scrollTop() > $nav.height());
        } else {
            $menu.addClass('td-acompanhar-menu--sticky', $(this).scrollTop() > $nav.height());
            $aside.addClass('td-acompanhar-aside--sticky', $(this).scrollTop() > $nav.height());
        }
    }

    asideAcompanharSticky();
    $(document).scroll(function () {
        asideAcompanharSticky();
    });

});

function gravaCookieOlho(visualizar) {

    var url = "/MeusInvestimentos/GravaCookieOlho";
    var token = getToken();

    $.ajax({
        dataType: "json",
        type: "POST",
        url: url,
        data: { visualiza: visualizar },
        headers: {
            "__RequestVerificationToken": token
        }
    });
}

//gerenciamento de botoes dentro da pagina de Acompanhar ou MeusInvestimentos
function openCards(numTab) {
    document.getElementById('cards-container_' + numTab).style.display = "block";
    document.getElementById('table-container_' + numTab).style.display = "none";
}

function openTable(numTab) {
    document.getElementById('table-container_' + numTab).style.display = "block";
    document.getElementById('cards-container_' + numTab).style.display = "none";
}

//Replicando o código do plugin nice-select, mas com as alterações necessárias para acessibilidade

!function (e) { e.fn.niceSelect = function (t) { function s(t) { t.after(e("<div></div>").addClass("nice-select").addClass(t.attr("class") || "").addClass(t.attr("disabled") ? "disabled" : "").attr("tabindex", t.attr("disabled") ? null : "0").html('<span class="current"></span><ul class="list"></ul>')); var s = t.next(), n = t.find("option"), i = t.find("option:selected"); s.find(".current").html(i.data("display") || i.text()), n.each(function (t) { var n = e(this), i = n.data("display"); s.find("ul").append(e("<li></li>").attr("data-value", n.val()).attr("data-display", i || null).addClass("option" + (n.is(":selected") ? " selected" : "") + (n.is(":disabled") ? " disabled" : "")).html(n.text())) }) } if ("string" == typeof t) return "update" == t ? this.each(function () { var t = e(this), n = e(this).next(".nice-select"), i = n.hasClass("open"); n.length && (n.remove(), s(t), i && t.next().trigger("click")) }) : "destroy" == t ? (this.each(function () { var t = e(this), s = e(this).next(".nice-select"); s.length && (s.remove(), t.css("display", "")) }), 0 == e(".nice-select").length && e(document).off(".nice_select")) : console.log('Method "' + t + '" does not exist.'), this; this.hide(), this.each(function () { var t = e(this); t.next().hasClass("nice-select") || s(t) }), e(document).off(".nice_select"), e(document).on("click.nice_select", ".nice-select", function (t) { var s = e(this); e(".nice-select").not(s).removeClass("open"), s.toggleClass("open"), s.hasClass("open") ? (s.find(".option"), s.find(".focus").removeClass("focus"), s.find(".selected").addClass("focus").attr("aria-pressed", true)) : s.focusin() }), e(document).on("click.nice_select", function (t) { 0 === e(t.target).closest(".nice-select").length && e(".nice-select").removeClass("open").find(".option") }), e(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function (t) { var s = e(this), n = s.closest(".nice-select"); n.find(".selected").removeClass("selected"), s.addClass("selected"); var i = s.data("display") || s.text(); n.find(".current").text(i), n.prev("select").val(s.data("value")).trigger("change") }), e(document).on("keydown.nice_select", ".nice-select", function (t) { var s = e(this), n = e(s.find(".focus") || s.find(".list .option.selected")); if (32 == t.keyCode || 13 == t.keyCode) return s.hasClass("open") ? n.trigger("click") : s.trigger("click"), !1; if (40 == t.keyCode) { if (s.hasClass("open")) { var i = n.nextAll(".option:not(.disabled)").first(); i.length > 0 && (s.find(".focus").removeClass("focus"), i.addClass("focus")) } else s.trigger("click"); return !1 } if (38 == t.keyCode) { if (s.hasClass("open")) { var l = n.prevAll(".option:not(.disabled)").first(); l.length > 0 && (s.find(".focus").removeClass("focus"), l.addClass("focus")) } else s.trigger("click"); return !1 } if (27 == t.keyCode) s.hasClass("open"); else if (169 == t.keyCode && s.hasClass("open")) return1 }); var n = document.createElement("a").style; return n.cssText = "pointer-events:auto", "auto" !== n.pointerEvents && e("html").addClass("no-csspointerevents"), this } }(jQuery);

//Transformando a listbox em accordions acessíveis

function depoisQueCarrega() {

    if ($(".nice-select").hasClass("open")) {
        $(".nice-select").attr("tabindex", "-1");
        $(".current").attr("tabindex", "0").attr("role", "button").attr("aria-expanded", true);
        $(".list").attr("aria-hidden", false).removeAttr("hidden");
    } else {
        $(".nice-select").attr("tabindex", "0");
        $(".current").attr("tabindex", "-1").attr("role", "button").attr("aria-expanded", false);
        $(".list").attr("aria-hidden", true).removeAttr("tabindex");
    }

    $(".nice-select").focusin(function () {
        $(this).css("border", "2px solid black").css("box-sizing", "border-box");
    });
    $(".nice-select").focusout(function () {
        $(this).css("border", "1px solid #ccc");
    });
    $(".list li").focusin(function () {
        $(this).css("border", "2px solid black").css("box-sizing", "border-box");
    });
    $(".list li").focusout(function () {
        $(this).css("border", "1px solid #ccc");
    });

    $(".current").click(function () {

        let tabulado = $(this).attr("tabindex");
        let oculta = $(this).next(".list").attr("aria-hidden");

        if (tabulado == "-1") {

            $(this).attr("tabindex", "0");
            $(this).parent().attr("tabindex", "-1");
            $(this).focus();

            let _this = $(this);

            setTimeout(function () {
                $(_this).attr("aria-expanded", true);
            }, 100);

        } else {

            $(this).attr("aria-expanded", false).attr("tabindex", "-1");
            $(this).parent().attr("role", "button");
            $(this).parent().attr("tabindex", "0");
            $(this).parent().focus();

            let _this = $(this);

            setTimeout(function (event) {
                $(_this).parent().removeAttr("role").removeAttr("aria-expanded");
            }, 100);

        }

        if (oculta == "true") {

            $(this).next(".list").attr("aria-hidden", false);
            $(this).next(".list").children().attr("tabindex", "0").attr("role", "button");

        } else {

            $(this).next(".list").attr("aria-hidden", true);
            $(this).next(".list").children().attr("tabindex", "-1");

        }

    });

    $(".option.disabled").attr("hidden", true);
    $('[data-value="selecione"]').attr("hidden", true);
    $(".option").attr("tabindex", "-1").attr("role", "button").attr("aria-pressed", false);
    $(".option.seleted").attr("role", "button").attr("tabindex", "-1");
    $(".option.seleted.focus").attr("role", "button").attr("tabindex", "-1");
    $(".list li").css("border", "1px solid #ccc");

}

//Permitindo que apenas uma opção do accordion seja marcada como verdadeira

function depoisQueClica() {

    $(".list li").on("click", function listaVerdadeira() {

        let verdadeiro = $(this).attr("aria-pressed", true);
        let contarVerdadeiros = verdadeiro;

        if (contarVerdadeiros.length > 0) {
            $(this).prevAll().attr("aria-pressed", false);
            $(this).nextAll().attr("aria-pressed", false);
            $(this).parent().parent().attr("tabindex", "0");
            $(this).parent().prev().attr("tabindex", "-1").attr("aria-expanded", false);
            $(this).parent().attr("aria-hidden", true);
            $(this).parent().find("li").attr("tabindex", "-1").removeAttr("role");
            $(this).attr("hidden", true);

            let _this = $(this);

            setTimeout(function () {
                $(_this).parent().parent().focus()
                $(_this).attr("hidden", false);
            }, 500);
        }

    });

}

//Iniciando a função para todos accordions

$(function () {
    depoisQueCarrega();
    depoisQueClica();
    $("div.disabled").attr("aria-disabled", true);
    $("div.disabled").attr("tabindex", "-1");
    $("div.disabled").find("span").attr("tabindex", "-1");
    $("div.disabled").off();
    $("div.disabled").find("span").off();
    $("div.disabled").find(".current").off();
    $("div.disabled").find(".list").attr("hidden", true);

});

//Alternando o status de pressionado dos botões da tela de acompanhar

$("li .selected").attr("aria-pressed", true);

$(".switcher-icon").on("click", function () {

    let verdadeiro = $(this).attr("aria-pressed", true);
    let contarVerdadeiros = verdadeiro;

    if (contarVerdadeiros.length > 0) {
        $(this).parent().prev().children().attr("aria-pressed", false);
        $(this).parent().next().children().attr("aria-pressed", false);
    }

});

//Anúncio de filtro limpo e filtro aplicado para a tela de consulta de operações

$(function () {

    $("#btnLimparFiltroOperacoes").click(function () {

        $(".td-operacoes-filtro__buttons--active").attr("aria-live", "off");

        setTimeout(function () {
            $(".td-operacoes-filtro__buttons--active").attr("aria-live", "polite");
            $("#btnLimparFiltroOperacoes").text("Filtros limpos");
        }, 100);

        setTimeout(function () {
            $(".td-operacoes-filtro__buttons--active").attr("aria-live", "off");
            $("#btnLimparFiltroOperacoes").text("Limpar filtro");
        }, 1000);

        setTimeout(function () {
            $(".td-operacoes-filtro__buttons--active").attr("aria-live", "polite");
        }, 1200);

    });

    $("#btnAplicarFiltroConsulta").off();

    setTimeout(function () {
        $("#btnAplicarFiltroConsulta").click(function () {

            $(".td-operacoes-filtro__buttons--active").attr("aria-live", "off");

            setTimeout(function () {
                $(".td-operacoes-filtro__buttons--active").attr("aria-live", "polite");
                $("#btnAplicarFiltroConsulta").text("Filtro aplicado");
            }, 100);

            setTimeout(function () {
                $(".td-operacoes-filtro__buttons--active").attr("aria-live", "off");
                $("#btnAplicarFiltroConsulta").text("Aplicar");
            }, 1000);

            setTimeout(function () {
                $(".td-operacoes-filtro__buttons--active").attr("aria-live", "polite");
            }, 1200);

        });
    }, 1000);
});

//Anúncio de parâmetros aplicados e parâmetros restaurados para a modal de alterar parâmetros

$(function () {

    $("#aplicarParametros").click(function () {

        let _this = $(this);

        setTimeout(function () {
            $(".td-modal-parametros-botao-rodape").attr("aria-live", "polite");
            $(_this).text("Parâmetros aplicados");
        }, 100);

        setTimeout(function () {
            $(".td-modal-parametros-botao-rodape").attr("aria-live", "off");
            $("#aplicarParametros").text("Aplicar parâmetros");
        }, 1000);

        setTimeout(function () {
            $(".td-modal-parametros-botao-rodape").attr("aria-live", "polite");
        }, 1200);

    });

    $("#restaurarParametros").click(function () {

        let _this = $(this);

        setTimeout(function () {
            $(".td-modal-parametros-botao-rodape").attr("aria-live", "polite");
            $(_this).text("Padrões restaurados");
        }, 100);

        setTimeout(function () {
            $(".td-modal-parametros-botao-rodape").attr("aria-live", "off");
            $("#restaurarParametros").text("Restaurar padrões");
        }, 1000);

        setTimeout(function () {
            $(".td-modal-parametros-botao-rodape").attr("aria-live", "polite");
        }, 1200);

    });

});


//Botões exportar para excel e aplicar filtro habilitados por padrão

$(function () {

    $("#btnExportarExtratoExcel").attr("aria-disabled", false);
    $("#btnAplicarFiltroExtrato").attr("aria-disabled", false);

});

//Foco visual no menu do usuário e itens

$("#botaoMeusDados").focusin(function () {
    $(this).css("box-sizing", "border-box").css("border", "2px solid black");
});
$("#botaoMeusDados").focusout(function () {
    $(this).css("border", "1px solid #ccc");
})

$("#botaoSair").focusin(function () {
    $(this).css("box-sizing", "border-box").css("border", "2px solid black");
});

$("#botaoSair").focusout(function () {
    $(this).css("border", "1px solid #ccc");
});

$("a#botaoSair").click(function () {
    window.sessionStorage.removeItem('banner-fechado');
});

let btnConsulta = document.querySelector("#btnConsulta");

if (btnConsulta) {
    btnConsulta.addEventListener("click", function (event) {
        let value = event.target.getAttribute("aria-expanded");
        event.target.setAttribute("aria-expanded", (value == "false") ? "true" : "false");
    });
}


//escondendo o calendário do leitor de telas

$(function () {

    $("#datepickers-container").attr("aria-hidden", true);

    $("title").text($("h1").text() + " - Tesouro Direto");

    desabilitarControles();


});

//Foco dos botões do calendário

$(".prev-year").add(".prev-month").add(".next-year").add(".next-month").focusin(function () {

    $(this).css("border", "2px solid black");
    $(this).css("box-sizing", "border-box");
    $(this).css("padding", "0px");

});

$(".prev-year").add(".prev-month").add(".next-year").add(".next-month").focusout(function () {

    $(this).css("border", "none");
    $(this).css("padding", "0px");

});

function desabilitarControles() {

    let itensParaDesativar = document.querySelectorAll('.disabled');

    if (itensParaDesativar.length == 0) return;

    itensParaDesativar.forEach((item) => {
        item.setAttribute("disabled", "disabled");
    });

}

new TesouroMenuHambuguerMobile().Init();;
const CLASS_NAMES = {
    expanded: 'expanded',
    collapsed: 'collapsed',
    active: 'active',
    hidden: 'hidden',
    w100: 'w-100'
};

class ListaTitulos {
    constructor(expanded = false) {
        this.#initializeElements();
        this.#addEventListeners();
        this.#setActiveTabItem('todos');
        this.#handleEmptyState();

        if (expanded) {
            this.#expandAllBoxes();
        }
    }

    #expandAllBoxes() {
        this.corretoraCards.forEach(x => this.#toggleExpandedClass(x))
    }

    #initializeElements() {
        this.corretoraCards = document.querySelectorAll('#corretora-card');
        this.corretoraBoxes = document.querySelectorAll('#corretora-box');
        this.tituloCards = document.querySelectorAll('.titulo-card');
        this.tabItems = document.querySelectorAll('.lista-titulos-body__tabs__item');
        this.emptyTitulosCard = document.querySelectorAll('#empty-titulos-card');
    }

    #addEventListeners() {
        this.#addClickEvent(this.corretoraCards, this.#toggleExpandedClass.bind(this));
        this.#addClickEvent(this.tabItems, this.#toggleTab.bind(this));
    }

    #addClickEvent(elements, handler) {
        elements.forEach(element => {
            element.addEventListener('click', (event) => {
                if (!event.target.dataset['nonClickExpand']) {
                    handler(element);
                }
                
            });
        });
    }

    #toggleExpandedClass(card) {
        card.className = card.classList.contains(CLASS_NAMES.expanded) ? CLASS_NAMES.collapsed + ' ' + CLASS_NAMES.w100 : CLASS_NAMES.expanded ;
    }

    #toggleTab(tab) {
        const category = tab.dataset.category;
        this.#setActiveTabItem(category);
        this.#filterTitulosByCategory(category);
        this.#handleEmptyState();
    }

    #setActiveTabItem(category) {
        this.tabItems.forEach(tab => {
            tab.dataset.category === category ? tab.classList.add(CLASS_NAMES.active) : tab.classList.remove(CLASS_NAMES.active);
        });
    }

    #filterTitulosByCategory(category) {
        $(".valor-investido")?.addClass("display-none");
        $(".valor-bruto-lista")?.addClass("display-none");
        $(`.valor-bruto-${category}`)?.removeClass("display-none");
        $(`.valor-investido-${category}`)?.removeClass("display-none");
        this.corretoraBoxes.forEach(box => {
            if (category != 'todos' && !this.#shouldShowBox(box, category)) this.#hideBox(box);
            else {
                box.dataset.category = category;
                box.classList.remove(CLASS_NAMES.hidden);
            }
        });
    }

    #shouldShowBox(box, category) {
        const visibleTitulos = box.querySelectorAll(`[data-category='${category}']`);
        return visibleTitulos.length;
    }

    #hideBox(box) {
        const corretoraCard = box.querySelector('#corretora-card');

        corretoraCard.classList.remove(CLASS_NAMES.collapsed);
        box.classList.add(CLASS_NAMES.hidden);
    }

    #handleEmptyState() {
        this.#isEmptyState() ? this.#removeClass(this.emptyTitulosCard, CLASS_NAMES.hidden) : this.#addClass(this.emptyTitulosCard, CLASS_NAMES.hidden);
     }

    #isEmptyState() {
        if (!this.corretoraBoxes.length) return true;
        let isEmptyState = true;

        this.corretoraBoxes.forEach(box => {
            if (!box.classList.length) {
                isEmptyState = false;
                return;
            }
        });

        return isEmptyState;
    }

    #addClass(elements, className) {
        elements.forEach(element => {
            element.classList.add(className);
        });
    }

    #removeClass(elements, className) {
        elements.forEach(element => {
            element.classList.remove(className);
        });
    }
};
class TdExtratoCard {
    constructor() {
        this.initComponents();
    }

    initComponents() {
        this.metaRendaDisclaimer = document.querySelectorAll(".meta-renda-disclaimer");
        this.rendaConquistadaDisclaimer = document.querySelectorAll(".renda-conquistada-disclaimer");
        this.modalMetaRenda = new TdModalDisclaimer("meta-renda-modal", "Meta de renda", "Aqui você vê a meta de renda que você cadastrou. Não se preocupe fixamos a quantidade de títulos de forma que sua renda extra seja sempre corrigida pela inflação. O valor exibido aqui é bruto de impostos e taxas da B3.");
        this.modalRendaConquistada = new TdModalDisclaimer("renda-conquistada-modal", "Renda conquistada", "Aqui você vê o quanto você já conquistou de renda. O valor exibido aqui é bruto de impostos e taxas da B3.");

        this.metaRendaDisclaimer.forEach((ele) => this.createClickEvent(ele, () => this.modalMetaRenda.Open()))
        this.rendaConquistadaDisclaimer.forEach((ele) => this.createClickEvent(ele, () => this.modalRendaConquistada.Open()))

    }


    createClickEvent(element, event) {
        element.addEventListener("click", event);
    }

};
