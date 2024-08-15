/* Minification failed. Returning unminified contents.
(309,10-11): run-time error JS1005: Expected '(': ;
(309,10-11): run-time error JS1008: Expected '{': ;
(313,5-6): run-time error JS1014: Invalid character: #
(313,22): run-time error JS1004: Expected ';'
(338,8): run-time error JS1004: Expected ';'
(338,20): run-time error JS1004: Expected ';'
(340,14-15): run-time error JS1014: Invalid character: #
(349,21): run-time error JS1004: Expected ';'
(351,14-15): run-time error JS1014: Invalid character: #
(359,17): run-time error JS1004: Expected ';'
(361,14-15): run-time error JS1014: Invalid character: #
(370,1-6): run-time error JS1010: Expected identifier: class
(375,64): run-time error JS1004: Expected ';'
(381,49): run-time error JS1004: Expected ';'
(389,18): run-time error JS1004: Expected ';'
(418,11): run-time error JS1004: Expected ';'
(422,12): run-time error JS1004: Expected ';'
(426,24): run-time error JS1004: Expected ';'
(453,1-9): run-time error JS1010: Expected identifier: function
(466,1-9): run-time error JS1010: Expected identifier: function
(483,23-24): run-time error JS1008: Expected '{': ;
(483,1): run-time error JS1301: End of file encountered before function is properly closed
(717,1): run-time error JS1107: Expecting more source characters
(717,1): run-time error JS1009: Expected '}'
(311,5-14): run-time error JS1300: Strict-mode does not allow assignment to undefined variables: _avaiable
(375,21-26): run-time error JS1300: Strict-mode does not allow assignment to undefined variables: title
(375,33-44): run-time error JS1300: Strict-mode does not allow assignment to undefined variables: description
(375,51-58): run-time error JS1300: Strict-mode does not allow assignment to undefined variables: content
(373,5-14): run-time error JS1300: Strict-mode does not allow assignment to undefined variables: _modalRef
(372,5-32): run-time error JS1300: Strict-mode does not allow assignment to undefined variables: URL_UTLILS_MODAL_DISCLAIMER
 */
function addZero(str, max) {
    str = str.toString();
    return str.length < max ? addZero("0" + str, max) : str;
}

function numberToView(value, decimalPlaces) {

    if (decimalPlaces == undefined) {
        decimalPlaces = 2;
    }

    let stringResp = "";
    let valueAsString = value.toFixed(decimalPlaces);
    let centsValue = valueAsString.split('.')[1];
    let integerValue = valueAsString.split('.')[0];

    for (let i = 1; i <= integerValue.length; i++) {
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

function numberFromView(text, decimalPlaces) {

    let resp = 0.00;

    if (!text || text.length == 0) {
        return resp;
    }

    if (decimalPlaces == undefined) {
        decimalPlaces = 2;
    }

    let local = text.replace(/\./g, '').replace(/\,/g, '.');

    resp = (parseFloat(local)).toFixed(decimalPlaces);

    return parseFloat(resp);

}

function toViewDate(value, format) {

    if (format == undefined || format == "") {
        format = "DD/MM/YYYY";
    }

    return moment(value).format(format);

}

function toViewDateTime(date) {
    return moment(date).format("DD/MM/YYYY HH:mm");
}

function toViewDateTimeWithSeconds(date) {
    return moment(date).format("DD/MM/YYYY HH:mm:ss");
}

function fromViewDate(value, format) {

    if (format == undefined || format == "") {
        format = "DD/MM/YYYY";
    }

    return moment(value, format);

}

function fromViewDateTime(value) {
    return moment(value, "DD/MM/YYYY HH:mm");
}

function fromViewDateTimeWithSeconds(value) {
    return moment(value, "DD/MM/YYYY HH:mm:ss");
}

function findParameterInQueryString(key) {

    let query = window.location.search;

    let searcher = new URLSearchParams(query);

    return !searcher.has(key)
        ? undefined
        : searcher.get(key);

}

function trunc(value) {
    return Math.floor(value * 100.0) / 100.0;
}

function round(value, decimals) {
    return Number(Math.round(parseFloat(value + 'e' + decimals)) + 'e-' + decimals);
}

function CalculateFromValue(bondValue, value) {

    if (bondValue == 0) {
        return 0;
    }
    //  Calcula a razão (pura) entre o "Valor a investir" e o "PU Compra"
    let _razaoQuantidade = value / bondValue;

    //  Calcula a "Quantidade  ajustada" inicialmente por ARREDONDAMENTO
    let _quantidadeAjustada = this.round(_razaoQuantidade, 2);

    //  Testa a viabilidade do cálculo a partir da Razão ARREDONDADA, se não, deve utilizar a Razão TRUNCADA
    if (value < this.trunc(((100.00 * bondValue) * _quantidadeAjustada) / 100.00)) {
        return this.trunc((100.00 * _razaoQuantidade) / 100.00);
    }

    return _quantidadeAjustada;

}

function calculateFromQuantity(bondValue, quantity) {

    let valorInvestir = bondValue * quantity;

    let result = this.trunc((100.00 * valorInvestir) / 100.00);

    return result;

}

function showConfirmationModal(selector, headerText, action) {

    let container = $(selector).first();

    if (container.length == 0) {
        console.log("Não foi possível localizar o container do modal.");
        return;
    }

    let headerContainer = container.find("h2").first();

    let bodyContainer = container.find("div").first();

    let linkYesContainer = bodyContainer.find("a.btn--primary").first();

    let linkNoContainer = bodyContainer.find("a.btn--secundary").first();

    if (headerContainer.length > 0) {
        headerContainer.text(headerText);
    }

    if (linkYesContainer.length > 0) {
        linkYesContainer.unbind().click(function () {
            action();
        });
    }

    if (linkNoContainer.length > 0) {

        linkNoContainer.unbind().click(function () {
            hideConfirmationModal(selector);
        });

    }

    container.show();

}

function hideConfirmationModal(selector) {

    let container = $(selector).first();

    if (container.length == 0) {
        console.log("Não foi possível localizar o container do modal.");
        return;
    }

    container.fadeOut('fast');

}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function saveLocalInformation(name, value) {
    window.localStorage.setItem(name, value);
}

function getLocalInformation(name) {
    return window.localStorage.getItem(name);
}

function clearLocalInformation(name) {
    window.localStorage.removeItem(name);
}

function IsAcessoControleParental() {
    return new Promise((resolve) => {
        $.ajax({
            method: "GET",
            url: "/GestaoParental/IsAcessoControleParental",
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true,
            success: function (data) {
                if (!data) {
                    resolve(false);
                }

                resolve(data['IsAcessoControleParental']);

            },
            error: function (err) {
                console.log('Failed to get data' + err);
                resolve(false);
            }
        });
    })
   
};
function SnackBarUtil() {

    let snackBarContainer;

    function FindContainers() {

        if (snackBarContainer == null) {
            snackBarContainer = $("div#snackBar").first();
        }

    }

    this.ShowSnackBar = function (text, isError = false) {

        FindContainers();

        if (snackBarContainer.is(":visible")) {
            snackBarContainer.hide();
        }

        snackBarContainer
            .empty()
            .removeAttr("class")
            .removeProp("class")
            .unbind()
            .click(function () { $(this).fadeOut(); });

        let baseClasses = isError ? "carrinho" : "investir";

        let snackBarRootClass = `td-${baseClasses}-snackbar`;
        snackBarContainer.addClass(snackBarRootClass);

        let classContentContainer = `td-${baseClasses}-snackbar__conteudo`;
        let contentContainer = $(`<div class=\"${classContentContainer}\"></div>`);
        snackBarContainer.append(contentContainer);

        let classMessageContainer = `td-${baseClasses}-snackbar__msg`;
        let messageContainer = $(`<div class=\"${classMessageContainer}\"></div>`);
        contentContainer.append(messageContainer);

        if (isError) {

            let attentionIcon = $("<img id=\"snackbarWarningIcon\" src=\"/Content/img/icon/td-attention.svg\" alt=\"Atenção\" class=\"td-carrinho-snackbar__icon\" />");
            messageContainer.append(attentionIcon);

            let paragraph = $("<p id=\"snackBarWarningMessage\"></p>").html(text);
            messageContainer.append(paragraph);

        } else {

            let spanInfo = $("<span id=\"snackBarMessage\"></span>").html(text);
            messageContainer.append(spanInfo);

        }

        let closeIcon = $(`<img id="btnFecharSnackBar" src="/Content/img/icon/td-x-white.svg" title="Fechar" class="td-${baseClasses}-snackbar__close" role="button" tabindex="0"/>`).css("cursor", "pointer");

        messageContainer.append(closeIcon);

        snackBarContainer.show();

    }

    this.HideSnackBar = function () {

        FindContainers();

        if (snackBarContainer.is(":visible")) {
            snackBarContainer.fadeOut('fast');
        }

    }

};
class LoaderUtil {

    _body;
    _loader;
    _avaiable = true;

    #FindContainers() {

        let bodyFounded = true;
        let loaderContainerFounded = true;

        if (this._body == null || this._body.length == 0) {
            this._body = $("body");
            if (this._body == null || this._body.length == 0) {
                console.log("Não foi possível encontrar a tag body!");
                bodyFounded = false;
            }
        }

        if (this._loader == null || this._loader.length == 0) {
            this._loader = $("div.td-sms-loading");
            if (this._loader == null || this._loader.length == 0) {
                console.log("Loader container não encontrado!");
                loaderContainerFounded = false;
            }
        }

        this._avaiable = bodyFounded && loaderContainerFounded;

    }

    get IsVisible() {

        this.#FindContainers();

        return this._avaiable &&
            this._loader != null &&
            this._loader.length > 0 &&
            this._loader.is(":visible");

    }

    ShowLoader(next) {

        this.#FindContainers();
        if (!this._avaiable) return;

        this._loader.show();
        this._body.css("overflow", "hidden");

    }

    HideLoader() {

        this.#FindContainers();
        if (!this._avaiable) return;

        this._loader.hide();
        this._body.css("overflow", "auto");

    }

};
class TdModalDisclaimer {

    URL_UTLILS_MODAL_DISCLAIMER = '/utils/modal/modal-disclaimer';
    _modalRef = null;

    constructor(id, title = '', description = '', content = '') {
        this.BindingData(id, title, description, content);

        this.AppendModalToBody();
    }

    BindingData(id, title, description, content) {
        this.content = content;
        this.title = title;
        this.description = description;
        this.id = id;
    }


    CreateModal() {
        
        this.modal = document.getElementById(this.id);
        this.modalTitulo = $(this.modal).find("#modal-td-titulo");
        this.modalContent = $(this.modal).find("#modal-td-content");
        this.modalDescricao = $(this.modal).find("#modal-td-descricao");
        this.modal.click(() => this.Close());
        this.modalContent.click((event) => event.stopPropagation());
        this.okButton = $(this.modal).find("#modal-ok-button")

        this._modalRef = document.getElementById(this.id);

        if (this.modalTitulo && this.title) {
            this.modalTitulo.text(this.title);
        }

        if (this.modalDescricao && this.description) {
            this.modalDescricao.text(this.description);
        }

        if (this.modalContent && this.content) {
            this.modalContent.text(this.description);
        }

        if (this.okButton) {
            this.okButton.click(() => this.Close())
        }
    }

    Open() {
        this.modal.style.display = "block";
    }

    Close() {
        this.modal.style.display = "none";
    }

    AppendModalToBody() {
        var self = this;
        $.ajax({
            url: this.URL_UTLILS_MODAL_DISCLAIMER,
            contentType: "application/json",
            type: 'POST',
            dataType: 'html',
            data: JSON.stringify({
                Id: self.id,
                Titulo: self.title,
                Descricao: self.description,
                Content: self.content
            }),
            success: function (result) {
                if (!document.getElementById(this.id)) {
                    $('body').append(result);
                    self.CreateModal();
                }

            },
            error: function (xhr, status) {
                console.log(xhr, status)
            }
        })           
    }
};

function updateCartBadge(cartItensCount) {

    var badgeContainer = $("span[data-valor-carrinho]");

    if (cartItensCount == null || parseInt(cartItensCount) === NaN) {
        cartItensCount = "?";
        $(badgeContainer).attr("title", "Falha ao obter quantidade de itens do carrinho");
    }

    $(badgeContainer).prop("data-valor-carrinho", cartItensCount).attr("data-valor-carrinho", cartItensCount);

}

function decreaseCartBadge() {

    var badgeContainer = $("span[data-valor-carrinho]");

    var badgeValue = $(badgeContainer).prop("data-valor-carrinho");

    if ((badgeValue = parseInt(badgeValue)) === NaN) {
        badgeValue = 0;
    }

    badgeValue = badgeValue > 1 ? badgeValue - 1 : 0;

    $(badgeContainer).prop("data-valor-carrinho", badgeValue).attr("data-valor-carrinho", badgeValue);

};

// PROGRESS BAR
let barStatusWidth = 0;

function extractProgressValueFromElement(element) {

    let dataValueAttribute = element.closest('div.progress-bar').attributes["data-value"];

    if (dataValueAttribute == null) {
        return 0;
    }

    let progressValueString = dataValueAttribute.value;

    if (progressValueString == null || progressValueString.length == 0) {
        return 0;
    }

    return parseFloat(progressValueString.replace(/\./g, "").replace(/,/g, "."));

}

function increaseCurrentVal(currentVal, limit) {

    let localValue = Math.round(currentVal);

    if (localValue > limit) {
        return limit;
    }

    localValue++;

    return localValue < limit ? localValue : limit;

}

function setElementProperties(element, width) {
    if (width <= 100) {
        element.style.width = `${width.toFixed(2)}%`;
    }
    element.closest('div.progress-container').querySelector('span.progressValue').innerText = `${parseInt(width)}%`;
}

function animateProgressBarElement(element, value) {

    if (value == 0) {
        setElementProperties(element, value);
        return;
    }

    let currentVal = 0;

    let interval = setInterval(function () {

        currentVal = increaseCurrentVal(currentVal, value);

        setElementProperties(element, currentVal);

        if (currentVal >= value) {
            clearInterval(interval);
        }

    }, 10);

}

function progressBarMove() {

    let elem = document.querySelectorAll(".bar-status");

    if (elem.length <= 0) {
        return;
    }

    elem.forEach((element, number) => {

        let progressValue = extractProgressValueFromElement(element);

        animateProgressBarElement(element, progressValue);

    });

}

progressBarMove();;
function getToken() {

    let form = $('#__AjaxAntiForgeryForm');
    let token = $('input[name="__RequestVerificationToken"]', form).val();

    return token;
}

$.ajaxSetup({
    cache: false,
    statusCode: {
        404: function () {
            alert('Página não encontrada!');
        },
        401: function () {

            $("#modalLoginExpired").css("display", "block");

            $("#btnRecoverContinue").on("click", function () {
                document.location.reload();
            }).trigger("focus");

        }
    }
});

function TesouroAjaxRequests() {

    let validateUrl = function (url) {

        if (url === undefined || typeof url != 'string') {
            throw new Error('Invalid Url');
        }

        return true;

    };

    let validateHandler = function (handler) {

        if (handler !== undefined && typeof handler !== "function") {
            throw new Error('Invalid ajax call configuration: some handler is invalid');
        }

        return true;

    }

    this.ExecutePost = function (url, data, beforeSend, success, error, complete, isAsync) {

        if (!validateUrl(url) || !validateHandler(beforeSend) || !validateHandler(success) || !validateHandler(error) || !validateHandler(complete)) return;

        if (isAsync == null) {
            isAsync = true;
        }

        $.ajax({
            dataType: "Json",
            type: "POST",
            async: isAsync,
            url: url,
            data: data,
            beforeSend: beforeSend,
            success: success,
            error: error,
            complete: complete,
            contentType: "application/json",
            headers: {
                "__RequestVerificationToken": getToken()
            }
        });

    }

    this.ExecutePostFormData = function (url, data, beforeSend, success, error, isAsync) {

        if (!validateUrl(url) || !validateHandler(beforeSend) || !validateHandler(success) || !validateHandler(error)) return;

        if (isAsync == null) {
            isAsync = true;
        }

        if (data.__RequestVerificationToken == null) {
            data.__RequestVerificationToken = $("input[type='hidden'][name='__RequestVerificationToken']")[0].value;
        }

        $.ajax({
            dataType: "JSON",
            type: "POST",
            async: isAsync,
            url: url,
            data: data,
            beforeSend: beforeSend,
            success: success,
            error: error,
            contentType: "application/x-www-form-urlencoded"
        });

    }

    this.ExecuteGet = function (url, beforeSend, success, error, complete, isAsync) {

        if (!validateUrl(url) || !validateHandler(beforeSend) || !validateHandler(success) || !validateHandler(error) || !validateHandler(complete)) return;

        if (isAsync == null) {
            isAsync = true;
        }

        $.ajax({
            type: "GET",
            async: isAsync,
            url: url,
            headers: {
                "__RequestVerificationToken": getToken()
            },
            beforeSend: beforeSend,
            success: success,
            error: error,
            complete: complete
        });

    }

    this.ExecuteDelete = function (url, data, beforeSend, success, error, complete, isAsync) {

        if (!validateUrl(url) || !validateHandler(beforeSend) || !validateHandler(success) || !validateHandler(error) || !validateHandler(complete)) return;

        if (isAsync == null) {
            isAsync = true;
        }

        $.ajax({
            dataType: "Json",
            type: "DELETE",
            async: isAsync,
            url: url,
            data: data,
            beforeSend: beforeSend,
            success: success,
            error: error,
            complete: complete,
            contentType: "application/json",
            headers: {
                "__RequestVerificationToken": getToken()
            }
        });

    }
}

;
