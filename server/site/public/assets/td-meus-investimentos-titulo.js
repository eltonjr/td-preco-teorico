$(document).ready(function () {
    $(".td-acompanhar-lista li.td-acompanhar-lista__item:nth-child(2)").addClass("td-acompanhar-lista__item--active");
    $(".td-header").addClass("td-header--hidden-mobile");
    $("main").removeClass("td-main--acompanhar");
    $("main").addClass("td-main--mobile-sem-submenu");
    $(".td-header + ul.td-nav-list").addClass("td-nav-list--hidden-mobile");

    function completeHandler() {
        $(".td-sms-loading").fadeOut();

        if ($("#snackBar").is(":visible")) {
            setTimeout(function () {
                $("#snackBar").fadeOut();
            }, 7000);
        }

    }

    $("#salvarExcel").click(function (e) {
        var codigoInstituicaoFinanceira = $(this).attr("data-party");
        var code = $(this).attr("data-code");
        var anoConsulta = $(this).attr("data-year");
        var mesConsulta = $(this).attr("data-month");

        var url = "/MeusInvestimentos/ExportarExcel/" + anoConsulta + '/' + mesConsulta + '/' + codigoInstituicaoFinanceira + '/' + code;
        document.location.href = url;
    });

    $("#salvarExcelExtrato").click(function (e) {
        var codigoInstituicaoFinanceira = $(this).attr("data-party");
        var code = $(this).attr("data-code");
        var treasuryName = $(this).attr("data-treasury-name");
        var url = `/MeusInvestimentos/ExportarExcelMovimentacao/${codigoInstituicaoFinanceira}/${code}/${treasuryName}`;
        document.location.href = url;
    });

    $("#btnResgatar").click(function (event) {
        event.preventDefault();

        $(".td-sms-loading").css("display", "flex");

        var code = $(this).attr("data-code");
        var codigoInstituicaoFinanceira = $(this).attr("data-party");
        var url = "/MeusInvestimentos/ResgatarTitulo";
        var obj = { codigoTitulo: Number(code) };

        $.ajax({
            type: "POST",
            url: url,
            data: { codigoTitulo: code, codigoInstituicaoFinanceira: codigoInstituicaoFinanceira },
            complete: completeHandler,
            success: function (dados) {
                if (dados.CodeMessageReturn == 0) {
                    document.location.href = '/Resgatar';
                }
                else {
                    $(".td-investir-snackbar__msg > span").html(dados.MessageReturn);
                    $(".td-investir-snackbar__msg").css("background-color", "#e4572e");
                    $("#snackBar").show();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
                if (XMLHttpRequest.status != 401) {
                    $(".td-investir-snackbar__msg > span").html("Ocorreu um erro");
                    $(".td-investir-snackbar__msg").css("background-color", "#e4572e");
                    $("#snackBar").show();
                }
            }
        });
    });

    $("#btnResgatarMobile").click(function (event) {
        event.preventDefault();

        $(".td-sms-loading").css("display", "flex");

        var code = $(this).attr("data-code");
        var codigoInstituicaoFinanceira = $(this).attr("data-party");
        var url = "/MeusInvestimentos/ResgatarTitulo";
        var obj = { codigoTitulo: Number(code) };

        $.ajax({
            type: "POST",
            url: url,
            data: { codigoTitulo: code, codigoInstituicaoFinanceira: codigoInstituicaoFinanceira },
            complete: completeHandler,
            success: function (dados) {
                if (dados.CodeMessageReturn == 0) {
                    document.location.href = '/Resgatar';
                }
                else {
                    $(".td-investir-snackbar__msg > span").html(dados.MessageReturn);
                    $(".td-investir-snackbar__msg").css("background-color", "#e4572e");
                    $("#snackBar").show();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
                if (XMLHttpRequest.status != 401) {
                    $(".td-investir-snackbar__msg > span").html("Ocorreu um erro");
                    $(".td-investir-snackbar__msg").css("background-color", "#e4572e");
                    $("#snackBar").show();
                }
            }
        });
    });
});