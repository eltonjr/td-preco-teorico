class BannerHome {

    parser = new DOMParser();
    urlBaseOrigemBanner = null;
    urlOrigemBanner = null;

    #urlEhCaminhoRelativo(source) {
        return source.substring(0, 1) == "/";
    }

    #setUrlOrigemBanner(source) {

        this.urlBaseOrigemBanner = this.#urlEhCaminhoRelativo(source)
            ? `${document.location.protocol}//${document.location.host}`
            : `${new URL(source).protocol}//${new URL(source).host}`;

        this.urlOrigemBanner = this.#urlEhCaminhoRelativo(source)
            ? `${this.urlBaseOrigemBanner}${source}`
            : source;

    }

    #carregarBanner(source) {

        this.#setUrlOrigemBanner(source);

        return fetch(source)
            .then(data => {

                if (data.status === 404) {
                    throw new Error(`Erro 'Not Found' ao tentar obter o banner no endereço "${source}". Verifique a origem.`);
                }

                if (data.status !== 200) {
                    throw new Error(`Erro ao carregar o banner: ${data.status}`);
                }

                return data.text();

            })
            .then(content => {
                var result = this.parser.parseFromString(content, "text/html");
                return new Promise(resolve => resolve(result));
            });

    }

    #removeSpecialCharactersAndSpaces(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, "").replace(/\s+/g, "_").toLowerCase();
    }

    #obterNomeBanner(data) {

        var headerText = data.querySelector('div.td-modal-info')
            .querySelector('div.td-modal-info__body')
            .querySelector('div.content-container')
            .querySelector('h4')
            .innerText;

        return this.#removeSpecialCharactersAndSpaces(headerText);

    }

    #removerCaminhoPai(source) {
        return /\.\.\//.test(source) ? `/${source.replace(/\.\.\//g, '')}` : source;
    }

    #tratarCaminhoImagem(image) {

        let imageSrc = image.getAttribute('src');

        if (imageSrc == '' || (!imageSrc.substring(0, 1)) == '/') return;

        imageSrc = this.#removerCaminhoPai(imageSrc);

        imageSrc = `${this.urlBaseOrigemBanner}${imageSrc}`;

        image.setAttribute('src', imageSrc);

    }

    #obterCorpoBanner(data) {

        let result = data.querySelector('div.td-modal-info');

        [...result.querySelectorAll('img')].forEach(item => {
            this.#tratarCaminhoImagem(item);
        });

        let imageContainer = result.querySelector('div.img-container');

        let coverImage = imageContainer.querySelector('img');

        coverImage.classList.add('cover');

        let contentContainer = result.querySelector('div.content-container');

        contentContainer.insertBefore(coverImage.cloneNode(true), contentContainer.querySelector('p'));

        return result;

    }

    #obterConteudoBanner(data) {

        let result = {
            name: this.#obterNomeBanner(data),
            content: this.#obterCorpoBanner(data)
        };

        return new Promise(resolve => resolve(result));

    }

    #setarAcoesBanner(bannerVisibilityName, content) {

        let checkBox = content.querySelector('input[type="checkbox"]');

        checkBox.addEventListener("change", function (event) {
            saveLocalInformation(bannerVisibilityName, !event.target.checked);
        }.bind(this));

        let closeButton = content.querySelector('button.close-modal');

        closeButton.addEventListener("click", function () {
            document.getElementsByTagName("main")[0].removeChild(content);
            window.sessionStorage.setItem("banner-fechado", true);
        });

    }

    #exibirBanner(data) {

        let name = data.name;

        let bannerVisibilityName = `must_show_${name}_banner`;

        let mustShowBanner = (getLocalInformation(bannerVisibilityName) ?? 'true') === 'true';

        if (!mustShowBanner) {
            return;
        }

        let content = data.content;

        this.#setarAcoesBanner(bannerVisibilityName, content);

        document.getElementsByTagName("main")[0].appendChild(content);

    }

    init() {

        if (window.sessionStorage.getItem("banner-fechado") === 'true') {
            return;
        }

        let ajax = new TesouroAjaxRequests();

        ajax.ExecuteGet('/api/parameters/get-banner-home-state',
            function () { }, // before
            function (data) {

                if (true === data.data.isActive) {

                    this.#carregarBanner(data.data.source)
                        .then(this.#obterConteudoBanner.bind(this))
                        .then(this.#exibirBanner.bind(this))
                        .catch(error => {
                            console.log('Erro ao carregar o banner: ', error.message);
                        });

                }

            }.bind(this), // success
            function () {
                throw new Error('Falha ao validar se o banner deve ser exibido');
            }, // error 
            function () { }, // complete
            true);

    }

}