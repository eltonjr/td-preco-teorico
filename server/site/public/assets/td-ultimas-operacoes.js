const initUltimasOperacoes = () => {

    $('#combo-tipo-operacao').on('change', function () {
        carregarListaUltimasOperacoes()
    });
   
    carregarListaUltimasOperacoes();
}

const carregarListaUltimasOperacoes = () => {
    var dataInitial = `<ul id='id_principal-listaultimasoperacoes_skeleton' class='principal-listaultimasoperacoes_skeleton'>
            <li data-tipo-operacao="2">
                        <span class="icone placeholder placeholder-glow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <mask id="mask0_10483_1890" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="2" width="16" height="21">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2002 6.5V6.3H12.0002C8.6002 6.3 5.8002 9.1 5.8002 12.5C5.8002 13.5 6.0002 14.4 6.5002 15.2L5.3002 16.4C4.6002 15.2 4.2002 13.9 4.2002 12.5C4.2002 8.2 7.7002 4.7 12.0002 4.7H12.2002V4.5V2L15.7002 5.5L12.2002 9V6.5ZM17.4998 9.8001L18.6998 8.6001C19.3998 9.8001 19.7998 11.1001 19.7998 12.5001C19.7998 16.8001 16.2998 20.3001 11.9998 20.3001H11.7998V20.5001V23.0001L8.2998 19.5001L11.7998 16.0001V18.5001V18.8001H11.9998C15.3998 18.8001 18.1998 16.0001 18.1998 12.6001C18.1998 11.6001 17.8998 10.7001 17.4998 9.8001Z" fill="black" />
                                </mask>
                                <g mask="url(#mask0_10483_1890)">
                                    <rect y="0.5" width="24" height="24" fill="#237131" />
                                </g>
                            </svg>
                        </span>


                <div class="informacoes">
                    <h5 class="informacoes-titulo placeholder placeholder-glow">XXXXXXX</h5>
                    <p class="informacoes-descricao-titulos placeholder placeholder-glow" title="XXXXX XXXX">XXXXX XXXX</p>
                    <p class="informacoes-descricao-agente-custodia placeholder placeholder-glow" title="XXXXX XXXXXXX XX X/X">XXXXX XXXXXXX XX X/X</p>
                    <p class="informacoes-descricao-dataHora placeholder placeholder-glow" title="XX XX XXX XXXX">XX XX XXX XXXX</p>
                </div>

                <span class="valor-operacao placeholder placeholder-glow">
                    R$ 42,93
                    <div class="card-investimento-box__arrow placeholder placeholder-glow">
                        <img src="/Content/img/icon/td-arrow-up.svg" alt="seta" />
                    </div>
                </span>

            </li>
            <li data-tipo-operacao="1">
                        <span class="icone placeholder placeholder-glow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <mask id="mask0_10473_1911" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="5" y="5" width="14" height="15">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9996 5.90039H11.0996V19.0004H12.9996V5.90039ZM7.50039 10.2007H5.40039V19.1007H7.50039V10.2007ZM16.7002 13.9004H18.6002V19.0004H16.7002V13.9004Z" fill="black" />
                                </mask>
                                <g mask="url(#mask0_10473_1911)">
                                    <rect y="0.5" width="24" height="24" fill="#237131" />
                                </g>
                            </svg>
                        </span>


                <div class="informacoes">
                    <h5 class="informacoes-titulo placeholder placeholder-glow">XXXXXXXXXXXX</h5>
                    <p class="informacoes-descricao-titulos placeholder placeholder-glow" title="XXXXXXX XXXXX XXXX">XXXXXXX XXXXX XXXX</p>
                    <p class="informacoes-descricao-agente-custodia placeholder placeholder-glow" title="XXXXX XXXXX X.X.">XXXXX XXXXX X.X.</p>
                    <p class="informacoes-descricao-dataHora placeholder placeholder-glow" title="XX XX XXX XXXX">XX XX XXX XXXX</p>
                </div>

                <span class="valor-operacao placeholder placeholder-glow">
                    R$ 147,74
                    <div class="card-investimento-box__arrow placeholder placeholder-glow">
                        <img src="/Content/img/icon/td-arrow-up.svg" alt="seta" />
                    </div>
                </span>

            </li>
            <li data-tipo-operacao="1">
                        <span class="icone placeholder placeholder-glow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <mask id="mask0_10473_1911" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="5" y="5" width="14" height="15">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9996 5.90039H11.0996V19.0004H12.9996V5.90039ZM7.50039 10.2007H5.40039V19.1007H7.50039V10.2007ZM16.7002 13.9004H18.6002V19.0004H16.7002V13.9004Z" fill="black" />
                                </mask>
                                <g mask="url(#mask0_10473_1911)">
                                    <rect y="0.5" width="24" height="24" fill="#237131" />
                                </g>
                            </svg>
                        </span>


                <div class="informacoes">
                    <h5 class="informacoes-titulo placeholder placeholder-glow">XXXXXXXXXXXX</h5>
                    <p class="informacoes-descricao-titulos placeholder placeholder-glow" title="XXXXXXX XXXXX XXXX">XXXXXXX XXXXX XXXX</p>
                    <p class="informacoes-descricao-agente-custodia placeholder placeholder-glow" title="XXXXX XXXXX X.X.">XXXXX XXXXX X.X.</p>
                    <p class="informacoes-descricao-dataHora placeholder placeholder-glow" title="XX XX XXX XXXX">XX XX XXX XXXX</p>
                </div>

                <span class="valor-operacao placeholder placeholder-glow">
                    R$ 147,74
                    <div class="card-investimento-box__arrow placeholder placeholder-glow">
                        <img src="/Content/img/icon/td-arrow-up.svg" alt="seta" />
                    </div>
                </span>

            </li>
    </ul >
    `
    $('#containerListaOperacoes').empty();
    $('#containerListaOperacoes').append(dataInitial);
    $.ajax({
        method: "POST",
        dataType: "Html",
        url: "/MeusInvestimentos/ListLastOperations",
        contentType: "application/json; charset=utf-8",
        cache: false,
        async: true,
        data: JSON.stringify({
            tipoOperacao: $('#combo-tipo-operacao').val(),
            codigoAgenteCustodia: $('#ddl_instituicaoFinanceira').val()
        }),
        success: function (data) {
            $('#containerListaOperacoes').append(data);
            $('.principal-listaultimasoperacoes').addClass('display-none');
            afterLoad();
        },
        error: function (err) {
            console.log('Failed to get data' + err);

        }
    });
}

$(document).ready(function () { initUltimasOperacoes(); });

