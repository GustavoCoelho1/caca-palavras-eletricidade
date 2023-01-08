class CacaPalavras {
    constructor()
    {
        this.palavrasCertas = [];

        this.palavrasEncontradas = [];
        this.coordenadasEncontradas = [];

        this.campoClicado = [];
        this.ctrlPressed = false;
        
        this.terminou = false;

        this.modo = "normal";
    }
}

var cacaPalavras = new CacaPalavras();

$(document).ready(() => { 

    /*Ativar hack 
    
    for (let x = 0; x < cacaPalavras.palavrasCertas.length; x++)
    {
        for(let y = 0; y < cacaPalavras.palavrasCertas[x].coordenadas.length; y++)
        {
            $(`[data-linha=${cacaPalavras.palavrasCertas[x].coordenadas[y].linha}][data-coluna=${cacaPalavras.palavrasCertas[x].coordenadas[y].coluna}]`).css('background', 'red');
        }
    }
    */

    let palavras = [
        "ELETRICIDADE",
        "TENSÃOELÉTRICA",
        "POTÊNCIAELÉTRICA",
        "ATERRAMENTO",
        "RESISTÊNCIAELÉTRICA",
        "CORRENTECONTÍNUA",
        "CORRENTEALTERNADA",
        "VOLTAGEM",
        "AMPERAGEM",
        "ELETRICIDADEESTÁTICA"
    ];

    $.each(palavras, function(idx, palavra) {
        let plv = "";
        
        if (palavra == 'TENSÃOELÉTRICA')
        {
            plv = "TENSÃO ELÉTRICA";
        }

        else if (palavra == 'POTÊNCIAELÉTRICA')
        {
            plv = "POTÊNCIA ELÉTRICA";
        }

        else if (palavra == 'RESISTÊNCIAELÉTRICA')
        {
            plv = "RESISTÊNCIA ELÉTRICA";
        }

        else if (palavra == 'CORRENTECONTÍNUA')
        {
            plv = "CORRENTE CONTÍNUA";
        }

        else if (palavra == 'CORRENTEALTERNADA')
        {
            plv = "CORRENTE ALTERNADA";
        }

        else if (palavra == 'ELETRICIDADEESTÁTICA')
        {
            plv = "ELETRICIDADE ESTÁTICA";
        }

        else{
            plv = palavra;
        }

        $('.dicas').append(`
            <span class="dica">${plv}</span>
            <span class="traco">-</span>
        `)
    })

    $("#btnComecar").on('click', () => {
        $("#btnComecar").css('opacity', '0');

        setTimeout(() => {
            $("#btnComecar").hide();
            
            $(".hackLyt").css('display', 'flex');
            $(".cacaPalavrasLyt").css('display', 'flex');
            setTimeout(() => {
                $(".hackLyt").css('opacity', '1');
                $(".cacaPalavrasLyt").css('opacity', '1');

                setTimeout(() => {

                    $("#mdl_titulo").html("TUTORIAL");

                    $("#mdl_desc").html(`
                        <p> <b>1.</b>  Ache as <b>10 palavras</b> que estão embaralhadas para <b>vencer</b> o jogo </p>
                        <p> <b>2.</b>  Segure <b>CTRL</b> e <b>clique</b> com o mouse para selecionar uma letra </p>
                        <p> <b>3.</b>  Ao soltar <b>CTRL</b>, caso tenha achado a palavra, uma <b>descrição</b> sobre será exibida </p>
                        <p> <b>4.</b>  Pra ficar mais fácil de testar eu adicionei um <b>"ATIVAR O HACK"</b> ali no canto pra você, divirta-se! </p>
                        <p> <b> Agora sabendo de todas as regras, tenha um bom jogo :D </b> </p>`);

                    $("#mdl_DescPalavra").modal('show');
                }, 1000);
            }, 200);
        }, 800);
    })

    $('#chk_hack').on('change', () => {
        for (let x = 0; x < cacaPalavras.palavrasCertas.length; x++)
        {
            for(let y = 0; y < cacaPalavras.palavrasCertas[x].coordenadas.length; y++)
            {
                let thisLetra = $(`[data-linha=${cacaPalavras.palavrasCertas[x].coordenadas[y].linha}][data-coluna=${cacaPalavras.palavrasCertas[x].coordenadas[y].coluna}]`).parent()[0];
                
                if ($('#chk_hack').prop('checked') == true)
                {
                    thisLetra.classList.add('hacked');
                }
                else
                {
                    if (thisLetra.classList.contains('hacked'))
                    {
                        thisLetra.classList.remove('hacked')
                    }
                }
            }
        }
    })
    
    /*Ctrl pressed*/ {
        window.addEventListener('keypress', (e) => {
            if(e.key == "Control")
            {
                cacaPalavras.ctrlPressed = true;
            }
        });
    
        window.addEventListener('keydown', (e) => {
            if(e.key == "Control")
            {
                cacaPalavras.ctrlPressed = true;
            }
        });
    
        window.addEventListener('keyup', (e) => {
            if(e.key == "Control")
            {
                let palavraCriada = "";
                let palavraCoord = [];
                let acertou = false;

                if (cacaPalavras.campoClicado.length > 0)
                {
                    cacaPalavras.campoClicado.forEach(campo => {
                        let thisCoord = {
                            linha: campo.getAttribute('data-linha'),
                            coluna: campo.getAttribute('data-coluna'),
                        }
    
                        palavraCriada += campo.textContent;
                        palavraCoord.push(thisCoord);
                    });
                    
    
                    for(let x = 0; x < cacaPalavras.palavrasCertas.length; x++)
                    {    
                        let validarPalavra = [];
                        let letrasCriadas = palavraCriada.split('');
    
                        letrasCriadas.forEach(function (letraCriada, idx) {
                            let letrasCertas = cacaPalavras.palavrasCertas[x].palavra.split('');
    
                            validarPalavra[idx] = letrasCertas.includes(letraCriada);

                            if (cacaPalavras.palavrasCertas[x].palavra == "ELETRICIDADE")
                            {
                                console.log(letraCriada);
                                validarPalavra[idx];
                            }
                        });

                        if (cacaPalavras.palavrasCertas[x].palavra == "ELETRICIDADE")
                        {
                            console.log(validarPalavra);
                        }
    
                        if (validarPalavra.every(idx => idx == true) && palavraCoord.length == cacaPalavras.palavrasCertas[x].coordenadas.length)
                        {
                            for(let y = 0; y < palavraCoord.length; y++)
                            {
                                for(let z = 0; z < cacaPalavras.palavrasCertas[x].coordenadas.length; z++)
                                {
                                    let coordenada = cacaPalavras.palavrasCertas[x].coordenadas[z];

                                    if (palavraCoord[y].linha == coordenada.linha && palavraCoord[y].coluna == coordenada.coluna)
                                    {
                                        acertou = true;
                                        palavraCriada = cacaPalavras.palavrasCertas[x].palavra;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    
                    if (acertou == true)
                    {
                        cacaPalavras.palavrasEncontradas.push(palavraCriada);
                        
                        palavraCoord.forEach(coordernada => {
                            cacaPalavras.coordenadasEncontradas.push(coordernada);
                        });
    
                        console.log(cacaPalavras.palavrasEncontradas);

                        showDesc(palavraCriada);
                    }
                    else
                    {
                        cacaPalavras.campoClicado.forEach(campo => {
                            campo.parentElement.classList.remove('clicked');
                        });
                    }
    
                    cacaPalavras.campoClicado = [];
    
                    cacaPalavras.ctrlPressed = false;
                }
            }
        });
    }

    comecarJogo(palavras);
});

function comecarJogo(palavras)
{
    for(let x = 1; x <= 30; x++)
    {
        $('#cacaPalavras').append(`<tr linha-id="${x}"></tr>`)

        for(let y = 1; y <= 30; y++)
        {
            $(`tr[linha-id=${x}]`).append(`
                <td class="cp_letra">
                    <span data-linha="${x}" data-coluna="${y}"></span>
                </td>
            `)
        }
    }

    $("td span").on('click', (e) => {
        if (cacaPalavras.ctrlPressed == true)
        {
            if (!e.target.parentElement.classList.contains('clicked'))
            {
                e.target.parentElement.classList.add('clicked');

                cacaPalavras.campoClicado.push(e.target);
            }
        }
    })

    montarCacaPalavras(palavras);
}

function posicionarPalavras(palavras) {
    let orientacoes = ["linha", "coluna", "diagonal"];
    let primeiraPos /*(Posição da primeira letra da palavra)*/ = "";
    let plvCorrompidas = [];

    for (let x = 0; x < palavras.length; x++)
    {
        let dirDiagonal = Math.random();
        let orientacaoAleatoria = Math.floor(Math.random() * orientacoes.length) //Retorna uma ordem aleatória de orientação <- Pode ser qualquer uma das 3 citadas a cima
        let orientacao = orientacoes[orientacaoAleatoria];

        primeiraPos /*(Posição da primeira letra da palavra)*/ = Math.floor(Math.random() * $(".cp_letra").length);
        let posLinha = $(`.cp_letra:eq(${primeiraPos}) span`).data("linha");
        let posColuna = $(`.cp_letra:eq(${primeiraPos}) span`).data("coluna");

        if (orientacao == "linha")
        {
            if ((parseInt(posColuna) + palavras[x].length) > 30)
            {
                do 
                {
                    let posicaoAleatoria = Math.floor(Math.random() * (30 - palavras[x].length));
                    posColuna = (posicaoAleatoria != 0) ? posicaoAleatoria : 1;
                    
                    primeiraPos = $(".cp_letra span").index($(`span[data-linha="${posLinha}"][data-coluna="${posColuna}"]`));
                }
                while((posColuna + palavras[x].length) > 30/* || validarOcupacao == false*/)
            }

            let validarOcupacao = checarOcupacao(palavras[x], orientacao, null, posLinha, posColuna);

            if (validarOcupacao == true)
            {
                preencherPalavra(palavras[x], orientacao, null, posLinha, posColuna, "preencher");
            }
            else
            {
                plvCorrompidas.push(palavras[x]);
            }
        }
        else if (orientacao == "coluna")
        {
            if ((parseInt(posLinha) + palavras[x].length) > 30)
            {
                do 
                {
                    let posicaoAleatoria = Math.floor(Math.random() * (30 - palavras[x].length));
                    posLinha = (posicaoAleatoria != 0) ? posicaoAleatoria : 1;
                    
                    primeiraPos = $(".cp_letra span").index($(`span[data-linha="${posLinha}"][data-coluna="${posColuna}"]`));
                }
                while((posLinha + palavras[x].length) > 30 /*|| validarOcupacao == false*/)
            }

            let validarOcupacao = checarOcupacao(palavras[x], orientacao, null, posLinha, posColuna);

            if (validarOcupacao == true)
            {
                preencherPalavra(palavras[x], orientacao, null, posLinha, posColuna, "preencher");
            }
            else
            {
                plvCorrompidas.push(palavras[x]);
            }
        }
        else if (orientacao == "diagonal")
        {
            if (dirDiagonal <= 0.33)
            {
                if ((parseInt(posColuna) + palavras[x].length) > 30 || (parseInt(posLinha) + palavras[x].length) > 30)
                {
                    let validarEspaco = false;

                    do 
                    {
                        let linhaAleatoria = Math.floor(Math.random() * (30 - palavras[x].length));
                        posLinha = (linhaAleatoria != 0) ? linhaAleatoria : 1;

                        let colunaAleatoria = Math.floor(Math.random() * (30 - palavras[x].length));
                        posColuna = (colunaAleatoria != 0) ? colunaAleatoria : 1;

                        if ((posLinha + palavras[x].length) < 30 || (posColuna + palavras[x].length) < 30)
                        {
                            validarEspaco = true;
                        }
                    } 
                    while (validarEspaco == false /*|| validarOcupacao == false*/);
                }
            }
            else if (dirDiagonal > 0.33 && dirDiagonal <= 0.66)
            {
                if ((posLinha + palavras[x].length) > 30 || (posColuna - palavras[x].length) < 1)
                {
                    let validarEspaco = false;

                    do 
                    {
                        let linhaAleatoria = Math.floor(Math.random() * (30 - palavras[x].length));
                        posLinha = (linhaAleatoria != 0) ? linhaAleatoria : 1;

                        let colunaAleatoria = palavras[x].length + Math.floor(Math.random() * (30 - palavras[x].length));
                        posColuna = (colunaAleatoria != 0) ? colunaAleatoria : 1;

                        if ((posLinha + palavras[x].length) <= 30 || (posColuna - palavras[x].length) >= 1)
                        {
                            validarEspaco = true;
                        }
                    }
                    while (validarEspaco == false/* || validarOcupacao == false*/)
                }
            }
            else if (dirDiagonal > 0.66 && dirDiagonal <= 1)
            {
                if ((posLinha - palavras[x].length) < 1 || (posColuna + palavras[x].length) > 30)
                {
                    let validarEspaco = false;

                    do 
                    {
                        let linhaAleatoria = palavras[x].length + Math.floor(Math.random() * (30 - palavras[x].length));
                        posLinha = (linhaAleatoria != 0) ? linhaAleatoria : 1;

                        let colunaAleatoria = Math.floor(Math.random() * (30 - palavras[x].length));
                        posColuna =  (colunaAleatoria != 0) ? colunaAleatoria : 1;

                        if ((posLinha - palavras[x].length) >= 1 || (posColuna + palavras[x].length) <= 30)
                        {
                            validarEspaco = true;
                        }
                    }
                    while (validarEspaco == false /*|| validarOcupacao == false*/)
                }
            }

            let validarOcupacao = checarOcupacao(palavras[x], orientacao, dirDiagonal, posLinha, posColuna);

            if (validarOcupacao == true)
            {
                preencherPalavra(palavras[x], orientacao, dirDiagonal, posLinha, posColuna, "preencher");
            }
            else
            {
                plvCorrompidas.push(palavras[x]);
            }
        }     
    }

    if (plvCorrompidas.length > 0)
    {
        posicionarPalavras(plvCorrompidas);
    }
}

function preencherPalavra(palavra, orientacao, direcaoDiagonal, posicaoLinha, posicaoColuna, tipo)
{
    let palavraCerta = {
        palavra: palavra,
        coordenadas: []
    };

    let proxPosicao = "";
    let plvLetras = palavra.split('');

    $.each(plvLetras, function(idx, letra) {
        if(orientacao == "linha")
        {
            proxPosicao = $(`.cp_letra span[data-linha=${posicaoLinha}][data-coluna="${posicaoColuna + idx}"]`);
        }
        else if (orientacao == "coluna")
        {
            proxPosicao = $(`.cp_letra span[data-linha=${posicaoLinha + idx}][data-coluna="${posicaoColuna}"]`);
        }
        else if (orientacao == "diagonal")
        {
            if (direcaoDiagonal <= 0.33)
            {
                proxPosicao = $(`.cp_letra span[data-linha=${posicaoLinha + idx}][data-coluna="${posicaoColuna + idx}"]`);
            }
            else if (direcaoDiagonal > 0.33 && direcaoDiagonal <= 0.66)
            {
                proxPosicao = $(`.cp_letra span[data-linha=${posicaoLinha + idx}][data-coluna="${posicaoColuna - idx}"]`);
            }
            else if (direcaoDiagonal > 0.66 && direcaoDiagonal <= 1)
            {
                proxPosicao = $(`.cp_letra span[data-linha=${posicaoLinha - idx}][data-coluna="${posicaoColuna + idx}"]`);
            }
        };

        palavraCerta.coordenadas.push(
            {
                linha: proxPosicao.data('linha'),
                coluna: proxPosicao.data('coluna')
            }
        );

        if (tipo == "preencher")
        {
            proxPosicao.html(letra);
        }
    });

    if (tipo == "preencher")
    {
        cacaPalavras.palavrasCertas.push(palavraCerta);
    }

    if (tipo == "checar")
    {
        return palavraCerta;
    }
}

function checarOcupacao(palavra, orientacao, direcaoDiagonal, posicaoLinha, posicaoColuna)
{
    let proxLetras = preencherPalavra(palavra, orientacao, direcaoDiagonal, posicaoLinha, posicaoColuna, "checar");

    let posVazias = [];

    proxLetras.coordenadas.forEach(coordenada => {
        cacaPalavras.palavrasCertas.forEach(palavraCerta => {
            palavraCerta.coordenadas.forEach(coordenadaCerta => {
                if (coordenada.linha == coordenadaCerta.linha && coordenada.coluna == coordenadaCerta.coluna)
                {
                    posVazias.push(false);
                }
                else
                {
                    posVazias.push(true);
                }
            });
        })
    })

    return (posVazias.every(posicao => posicao == true)) ? true : false;
}

function montarCacaPalavras(palavras) {
    let todosCampos = $('td span');

    todosCampos.each(function(idx, campo) {
        if (campo.textContent == "") 
        {
            let randomLetra = Math.round(65 + Math.random() * 25);

            campo.textContent = String.fromCharCode(randomLetra);
        };
    });

    posicionarPalavras(palavras);
}

function showDesc(palavra) {
    let msgDesc = "";
    let plv = "";

    if (palavra == "ELETRICIDADE")
    {
        $("#mdl_titulo").html("ELETRICIDADE");
        msgDesc = `<b>Eletricidade</b> é o nome dado a um conjunto de fenômenos que ocorre graças ao <b>desequilíbrio</b> ou à <b>movimentação</b> das cargas elétricas, uma propriedade inerente aos prótons e elétrons, assim como também dos corpos eletricamente carregados.`;
    }

    if (palavra == "TENSÃOELÉTRICA")
    {
        $("#mdl_titulo").html("TENSÃO ELÉTRICA");
        msgDesc = `<b>Tensão elétrica</b> é a quantidade de energia armazenada em cada <b>coulomb</b> de <b>carga elétrica</b>, quando esta se encontra em regiões em que há um campo elétrico não nulo. Nessas condições, quando soltas, as cargas podem passar a <b>se mover</b>, devido ao surgimento de uma <b>força elétrica</b> sobre elas.`;
    }

    if (palavra == "TENSÃOELÉTRICA")
    {
        $("#mdl_titulo").html("TENSÃO ELÉTRICA");
        msgDesc = `<b>Tensão elétrica</b> é a quantidade de energia armazenada em cada <b>coulomb</b> de <b>carga elétrica</b>, quando esta se encontra em regiões em que há um campo elétrico não nulo. Nessas condições, quando soltas, as cargas podem passar a <b>se mover</b>, devido ao surgimento de uma <b>força elétrica</b> sobre elas.`;
    }

    if (palavra == "POTÊNCIAELÉTRICA")
    {
        $("#mdl_titulo").html("POTÊNCIA ELÉTRICA");
        msgDesc = `<b>Potência elétrica</b> é a medida da quantidade de energia elétrica fornecida ou consumida por um <b>circuito elétrico</b>. Pode ser calculada por meio de grandezas como <b>tensão</b>, <b>corrente</b> e <b>resistência elétrica</b>, e sua unidade de medida é o <b>watt</b>.`;
    }

    if (palavra == "ATERRAMENTO")
    {
        $("#mdl_titulo").html("ATERRAMENTO");
        msgDesc = `<b>Aterramento</b> é um conceito usado no campo da electricidade como ponto de referência para um <b>potencial elétrico</b> de <b>zero volt</b>. O aterramento é feito quando o <b>fio terra</b> ou uma barra de cobre conectada ao fio são <b>enterrados</b>.`
    }

    if (palavra == "RESISTÊNCIAELÉTRICA")
    {
        $("#mdl_titulo").html("RESISTÊNCIA ELÉTRICA");
        msgDesc = `A <b>resistência elétrica</b> é definida como a capacidade que um corpo tem de opor-se à passagem da <b>corrente elétrica</b>. Isto é conseguido através de <b>resistores</b> que transformam a <b>energia elétrica</b> em <b>energia térmica</b>. A unidade de medida da resistência é o <b>Ohm (Ω)</b>`;
    }

    if (palavra == "CORRENTECONTÍNUA")
    {
        $("#mdl_titulo").html("CORRENTE CONTÍNUA");
        msgDesc = `<b>Corrente contínua</b> é o fluxo ordenado de elétrons num <b>único sentido</b> - ao contrário da corrente alternada - mediante a presença de uma <b>diferença de potencial</b>. Na corrente contínua, todos os elétrons seguem um <b>fluxo direcional</b> único, estabilizando as <b>cargas de energia</b>.`;
    }

    if (palavra == "CORRENTEALTERNADA")
    {
        $("#mdl_titulo").html("CORRENTE ALTERNADA");
        msgDesc = `A <b>corrente alternada</b> é uma corrente elétrica caracterizada por sua intensidade e direção que <b>variam periodicamente</b> – ao contrário da corrente contínua –, sendo capaz de ser transportada por <b>longas distâncias</b>, portanto, sendo a mais utilizada em <b>grandes potências</b>.`;
    }

    if (palavra == "CORRENTEALTERNADA")
    {
        $("#mdl_titulo").html("CORRENTE ALTERNADA");
        msgDesc = `A <b>corrente alternada</b> é uma corrente elétrica caracterizada por sua intensidade e direção que <b>variam periodicamente</b> – ao contrário da corrente contínua –, sendo capaz de ser transportada por <b>longas distâncias</b>, portanto, sendo a mais utilizada em <b>grandes potências</b>.`;
    }

    if (palavra == "VOLTAGEM")
    {
        $("#mdl_titulo").html("VOLTAGEM");
        msgDesc =`<b>Voltagem</b> se trata do <b>potencial</b> de uma corrente elétrica, fundamental para o fazer com que um aparelho elétrico <b>funcione</b>. A voltagem possui sua medida em <b>Volts</b>. Os aparelhos eletrênicos atuais geralmente possuem suas voltagens distribuidas entre <b>110V</b> ou <b>220V</b>`;
    }

    if (palavra == "AMPERAGEM")
    {
        $("#mdl_titulo").html("AMPERAGEM");
        msgDesc = `O <b>ampere</b> é a unidade de medida da corrente elétrica no <b>Sistema Internacional de Unidades</b>. O nome é uma homenagem ao físico francês André-Marie Ampère. Um <b>ampere</b> equivale a um </b>coulomb por segundo<b>`;
    }

    if (palavra == "ELETRICIDADEESTÁTICA")
    {
        $("#mdl_titulo").html("ELETRICIDADE ESTÁTICA");
        msgDesc = `<b>Eletricidade estática</b> é a definição dada ao excesso de <b>cargas elétricas</b> em um corpo, estando essas cargas <b>em repouso</b>.  O acúmulo de cargas permanece até que possa se mover por meio de uma <b>corrente</b> ou <b>descarga elétrica</b>, do qual recebe o nome de <b>eletricidade dinâmica</b>.`;
    }

    $("#mdl_desc").html(msgDesc);

    plv = $("#mdl_titulo").html();

    $('.dicas .dica').each(function(idx, dica) {
        if (dica.innerHTML == plv)
        {
            dica.classList.add('encontrada')
        }
    })
    
    $("#mdl_DescPalavra").modal('show');

    if (cacaPalavras.palavrasEncontradas.length == 10)
    {
        $("#mdl_btnOK")[0].onclick = showTelaFinal;
    }
}

function showTelaFinal() {
    if (cacaPalavras.terminou == false)
    {
        setTimeout(() => {
            $("#mdl_DescPalavra").modal('show');
            $("#mdl_titulo")[0].classList.add('terminou');
            $("#mdl_titulo").html("PARABÉNS");
            $("#mdl_desc").html("Você encontrou todas as <b>10 palavras</b> do jogo, muito bem!");
        }, 1000)

        cacaPalavras.terminou = true;
    }

    $("#mdl_btnOK")[0].onclick = resetGame;
}

function resetGame() {
    $("#mdl_DescPalavra").modal('hide');

    setTimeout(() => {
        $("#titulo").css('opacity', '0');
        $(".hackLyt").css('opacity', '0');
        $(".cacaPalavrasLyt").css('opacity', '0');

        setTimeout(() => {
            $(".hackLyt").hide();
            $(".cacaPalavrasLyt").hide();

            setTimeout(() => {
                $("#titulo").css('opacity', '1');
                $("#btnComecar").show();
                $("#btnComecar").css('opacity', '1');

                let palavras = [
                    "ELETRICIDADE",
                    "TENSÃOELÉTRICA",
                    "POTÊNCIAELÉTRICA",
                    "ATERRAMENTO",
                    "RESISTÊNCIAELÉTRICA",
                    "CORRENTECONTÍNUA",
                    "CORRENTEALTERNADA",
                    "VOLTAGEM",
                    "AMPERAGEM",
                    "ELETRICIDADEESTÁTICA"
                ];
            
                $('#cacaPalavras').html('');
                cacaPalavras = new CacaPalavras();

                $('#chk_hack').prop('checked', 'false');

                $('.dicas .dica').each(function(idx, dica) {
                    dica.classList.remove('encontrada');
                })
            
                $("#mdl_titulo")[0].classList.remove('terminou');
                $("#mdl_btnOK")[0].onclick = "";
            
                comecarJogo(palavras);
            }, 200);
        }, 1000);
    }, 200);
}