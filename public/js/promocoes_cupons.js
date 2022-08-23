var AFFILIATE_ID = localStorage.AFFILIATE_ID
var MASTER_ID = localStorage.MASTER_ID
var mainHost = 'https://api-smartcomerci.com.br:9090'

let TAGS = []

$.ajax({
    type: "POST",
    url: "https://api-smartcomerci.com.br:9090/getCategories",
    headers: {
        "x-access-token": localStorage.token,
    },
    data: {
        "affiliate_id": localStorage.AFFILIATE_ID,
        "master_id": localStorage.MASTER_ID,
    },
    success: function (categories) {
        CATEGORIES = categories.results;
        var CATEGORIES_SHOW = [];
        var breakPoint = 100,
            count = 0;
        var myCategories = getCategorias(CATEGORIES)
        MY_CATEGORIES = myCategories
    },
    error: function (data2) {
        console.log('data2 catgosss');
    },
    complete: function () { },
});

$.ajax({
    type: "POST",
    url: "https://api-smartcomerci.com.br:9090/getTagsLists",
    headers: {
        "x-access-token": localStorage.token,
    },
    data: {
        "affiliate_id": localStorage.AFFILIATE_ID
    },
    success: function (categories) {
        console.log("tags", categories)
        TAGS = categories.tags;
    },
    error: function (data2) {
        console.log('data2 catgosss');
    },
    complete: function () { },
});


let OBJETO_MODEL = {
    main: {
        active: false,
        type: "",
        name: "",
        description: "",
        allAffiliates: false,
        affiliates: "all"
    },
    cupom: {
        cupomCode: "",
        fromCPF: false,
        toCPF: "",
    },
    type: {
        valueActive: false,
        value: 0,
        percentActive: false,
        percent: 0
    },
    requires: {
        withoutRequires: false,
        totalFromCartActive: false,
        totalFromCart: 0,
        totalInCartActive: false,
        totalInCart: 0

    },
    applicability: {
        allProducts: false,
        especificCategories: false,
        especificCategoriesValue: [],
        especificTags: false,
        especificTagsValue: []
    },
    validate: {
        withoutTimeLimits: false,
        especificDate: false,
        dateStart: '',
        dateEnd: ''
    },
    marketLimits: {
        withoutLimits: false,
        byTotalsActive: false,
        byTotals: 0
    },
    clientLimits: {
        withoutLimits: false,
        onFirstPurchase: false,
        byTotalsActive: false,
        byTotals: 0
    },
    accumulation: {
        grantAccumulation: false,
        denyAccumulation: false
    }
}

let OBJETO_DEFAULT = {
    main: {
        active: false,
        type: "",
        name: "",
        description: "",
        allAffiliates: false,
        affiliates: "all"
    },
    cupom: {
        cupomCode: "",
        fromCPF: false,
        toCPF: "",
    },
    type: {
        valueActive: false,
        value: 0,
        percentActive: false,
        percent: 0
    },
    requires: {
        withoutRequires: false,
        totalFromCartActive: false,
        totalFromCart: 0,
        totalInCartActive: false,
        totalInCart: 0

    },
    applicability: {
        allProducts: false,
        especificCategories: false,
        especificCategoriesValue: [],
        especificTags: false,
        especificTagsValue: []
    },
    validate: {
        withoutTimeLimits: false,
        especificDate: false,
        dateStart: '',
        dateEnd: ''
    },
    marketLimits: {
        withoutLimits: false,
        byTotalsActive: false,
        byTotals: 0
    },
    clientLimits: {
        withoutLimits: false,
        onFirstPurchase: false,
        byTotalsActive: false,
        byTotals: 0
    },
    accumulation: {
        grantAccumulation: false,
        denyAccumulation: false
    }
}


let OBJECT_LIST = []

async function getObjects(element) {
    $.ajax({
        type: "POST",
        url: mainHost + '/getById',
        data: {
            table: "promocoes_cupons",
            id_name: 'master_id',
            id_value: MASTER_ID

        },
        headers: {
            "x-access-token": localStorage.token,
        },
        success: function (data) {
            console.log('getByTableName', data)
            OBJECT_LIST = []
            OBJETO_MODEL = OBJETO_DEFAULT
            for (const k in data) {
                const { id, createdAt, updatedAt, content } = data[k]
                OBJECT_LIST.push({
                    id: id,
                    createdAt: createdAt,
                    updatedAt: updatedAt,
                    content: JSON.parse(content)
                })
            }

            console.log('OBJECT_LIST', OBJECT_LIST)

            const cupons = OBJECT_LIST.find((obj) => obj.content.main.type === 'Cupom')
            const fretes = OBJECT_LIST.find((obj) => obj.content.main.type === 'Frete Grátis')
            const descontos = OBJECT_LIST.find((obj) => obj.content.main.type === 'Desconto')
            $(".listaDePromocoes").html("")
            $(".listaDeCupons").html("")
            $(".listaDeFretes").html("")
            if (Array.isArray(cupons)) {
                for (const k in cupons) {
                    $(".listaDeCupons").append(
                        getCupom(cupons[k], 'Cupom')
                    )
                }
            } else {
                if (cupons) {
                    $(".listaDeCupons").append(
                        getCupom(cupons, 'Cupom')
                    )
                }
            }

            if (Array.isArray(fretes)) {
                for (const k in fretes) {
                    $(".listaDeFretes").append(
                        getCupom(fretes[k], 'Frete Grátis')
                    )
                }
            } else {
                if (fretes) {
                    $(".listaDeFretes").append(
                        getCupom(fretes, 'Frete Grátis')
                    )
                }
            }

            if (Array.isArray(descontos)) {
                for (const k in descontos) {
                    $(".listaDePromocoes").append(
                        getCupom(descontos[k], 'Desconto')
                    )
                }
            } else {
                if (descontos) {
                    $(".listaDePromocoes").append(
                        getCupom(descontos, 'Desconto')
                    )
                }
            }




        },
        error: function (data) {
            console.log('getByTableName', data)
        },
        complete: function () { },
    });
}

async function setObject(element) {
    console.log(element)
    console.log('antes de alterar =>', OBJETO_MODEL)

    let area = element.attr("area")
    let detalhe = element.attr("detalhe")
    let valor = element.attr("type") === "checkbox" ? element[0].checked : element.val()

    console.log(
        `OBJETO_MODEL[${area}][${detalhe}]`
    )
    OBJETO_MODEL[area][detalhe] = valor
    console.log('alterado =>', OBJETO_MODEL)

}

async function insertNew(myObject) {
    $.ajax({
        type: "POST",
        url: mainHost + '/insertNew',
        data: {
            table: "promocoes_cupons",
            fields: [
                { column: "affiliate_id", value: AFFILIATE_ID },
                { column: "master_id", value: MASTER_ID },
                { column: "content", value: JSON.stringify(myObject) }
            ]

        },
        headers: {
            "x-access-token": localStorage.token,
        },
        success: function (data) {
            console.log('insertNew', data)
            getObjects()

        },
        error: function (data) {
            console.log('insertNew', data)
        },
        complete: function () { },
    });
}

async function deleteObject(ID) {
    $.ajax({
        type: "POST",
        url: mainHost + '/deleteById',
        data: {
            table: "promocoes_cupons",
            item_id: ID

        },
        headers: {
            "x-access-token": localStorage.token,
        },
        success: function (data) {
            console.log('deleteObject', data)
            getObjects()

        },
        error: function (data) {
            console.log('deleteObject', data)
        },
        complete: function () { },
    });
}


async function updateObject(myObject, ID) {

    $.ajax({
        type: "POST",
        url: mainHost + '/updateById',
        data: {
            table: "promocoes_cupons",
            name_id: "id",
            value_id: ID,
            fields: [
                { column: "affiliate_id", value: AFFILIATE_ID },
                { column: "master_id", value: MASTER_ID },
                { column: "content", value: JSON.stringify(myObject) }
            ]
        },
        headers: {
            "x-access-token": localStorage.token,
        },
        success: function (data) {
            console.log('updateById', data)
            getObjects()

        },
        error: function (data) {
            console.log('updateById', data)
        },
        complete: function () { },
    });
}

async function CLOSE_AND_SAVE(type, ID) {
    console.log(type, ID)

    if (type === 'insert') {
        await insertNew(OBJETO_MODEL)
        OBJETO_MODEL = OBJETO_DEFAULT
    }
    if (type === 'update') {
        if (ID) {
            await updateObject(OBJETO_MODEL, ID)
            OBJETO_MODEL = OBJETO_DEFAULT
        } else {
            console.log("ID not provided", ID)
        }

    }

    $(".close").click()

}

async function CLOSE_AND_DELETE(ID) {
    if (ID) {
        await deleteObject(ID)
    }

    $(".close").click()
}

async function CLOSE_AND_CANCEL(type, ID) {
    OBJETO_MODEL = OBJETO_DEFAULT

    $(".close").click()
}



getObjects()


//===================================

function getCategoriesAndSubPromocoes(MY_CATEGORIES, listaSelecionada) {
    
    var html3 = '',
        nova = '<li class="novaLI"></li>';

        function getActive(text,listaSelecionada){
            console.log(text,listaSelecionada)
            
                let eu = listaSelecionada.find((l) => l === text)
                if(eu){
                    return 'checked="true"'
                }else{
                    ''
                }
            
            
        } 


    for (const k in MY_CATEGORIES) {
        var content = '<ul class="listInner listInner2 sub-listInner2 animate__animated ">';
        html3 += '<li    class="list-item sub-list-item animate__animated ">' + arrowDown4 + '<label style="max-width: 70%; float: left;    margin: 5px 15px ;" class=" subSmart subCheck animate__animated animate__"> <img   src="' + MY_CATEGORIES[k].categorie_icon + '" style="width: 30px; height: 30px; margin-top -10%"/> ';
        content += nova
        if (MY_CATEGORIES[k].subCategorias != "?") {

            var txtCategories = MY_CATEGORIES[k].subCategorias.split(",");
            for (let a = 0; a < txtCategories.length; a++) {
                if (txtCategories[a].length > 0 && txtCategories[a] != '' && txtCategories[a] != 'null' && txtCategories[a] != 'undefined' && txtCategories[a] != null && txtCategories[a] != undefined) {

                    content += '<li   class="list-sub-item "><div class="row"><span style="border-top: 5px dotted silver !important;" class="trilha">..........</span><label class="subSmart  animate__animated animate__"><input '+getActive(txtCategories[a],listaSelecionada)+' class="marcar catPromocao"  myValue="'+txtCategories[a]+'"  onchange="subTagInput($(this),\'listaCategoriasFilter\',\'' + txtCategories[a] + '\')" type="checkbox"><span class="checkmark"></span>' + txtCategories[a] + '</label></div></li> ';
                }

                ////////////console.log(content)
            }
        }
        content += '</ul>';
        html3 += MY_CATEGORIES[k].categoria + ' <input '+getActive(MY_CATEGORIES[k].categoria,listaSelecionada)+' class="marcar catPromocao"  myValue="'+MY_CATEGORIES[k].categoria+'" onchange="subTagInput($(this),\'listaCategoriasFilter\',\'' + MY_CATEGORIES[k].categoria + '\')" type="checkbox"><span class="checkmark subCheck"></span></label>';
        html3 += content + '</li> ';
    }

    return html3
}

function getTags(MY_TAGS, listaSelecionada) {
    var html3 = '',
        nova = '<li class="novaLI"></li>';

        function getActive(text,listaSelecionada){
            console.log(text,listaSelecionada)
            let eu = listaSelecionada.find((l) => l === text)
            if(eu){
                return 'checked="true"'
            }else{
                ''
            }
        }   

    for (const k in MY_TAGS) {
        if (MY_TAGS[k] !== "") {
            var content = '<ul class="listInner listInner2 sub-listInner2 animate__animated ">';
            html3 += '<li    class="list-item sub-list-item animate__animated ">' + arrowDown4 + '<label style="max-width: 70%; float: left;    margin: 5px 15px ;" class=" subSmart subCheck animate__animated animate__">  ';

            html3 += MY_TAGS[k] + ' <input '+getActive(MY_TAGS[k],listaSelecionada)+' class="marcar tagPromocao" myValue="'+MY_TAGS[k]+'"  onchange="subTagInputTAG($(this),\'listaTagsFilter\',\'' + MY_TAGS[k] + '\')" type="checkbox"><span class="checkmark subCheck"></span></label>';
            html3 += '</li> ';
        }

    }

    return html3
}



var arrowDown4 = '<div onclick="dropaCategoriasInner($(this).parent()) " class=" deleteThis3 dropCategoriaButton ">' +
    '<svg xmlns="http://www.w3.org/2000/svg" style="fill: #fcfcfd; stroke: silver;" width="36" height="36" viewBox="0 0 36 36">' +
    '<g transform="translate(36 36) rotate(180)">' +

    '<g transform="translate(28 28) rotate(180)">' +
    '<g class="b">' +
    '<g class="c">' +
    '<circle class="e" cx="10" cy="10" r="10" />' +
    '<circle class="f" cx="10" cy="10" r="9.5" />' +
    '</g>' +
    '<path class="d" d="M581.273,789.774a.82.82,0,0,1-.081-1.079l.081-.092,3.685-3.593-3.685-3.593a.82.82,0,0,1-.081-1.079l.081-.093a.849.849,0,0,1,1.094-.081l.094.081,4.279,4.179a.82.82,0,0,1,.081,1.079l-.081.093-4.279,4.179A.849.849,0,0,1,581.273,789.774Z"' +
    ' transform="translate(795.009 -573.615) rotate(90)"/>' +
    '</g>' +
    '</g>' +
    '</g>' +
    '</svg>' +
    '</div>';

function removePROMOCAO(element) {

    var txt = element.parent().text()
    element.parent().remove()

    console.log('antes ->', OBJETO_MODEL)

    if (txt) {
        if (Array.isArray(OBJETO_MODEL.applicability.especificCategoriesValue)) {
            const findIndex = OBJETO_MODEL.applicability.especificCategoriesValue.findIndex(object => {
                return object === txt;
            });
            OBJETO_MODEL.applicability.especificCategoriesValue = OBJETO_MODEL.applicability.especificCategoriesValue.splice(findIndex, 1);
        }
    }


    console.log('depois ->', OBJETO_MODEL)
}

function removePROMOCAOTAG(element) {

    var txt = element.parent().text()
    element.parent().remove()

    console.log('antes ->', OBJETO_MODEL)

    if (txt) {
        if (Array.isArray(OBJETO_MODEL.applicability.especificTagsValue)) {
            const findIndex = OBJETO_MODEL.applicability.especificTagsValue.findIndex(object => {
                return object === txt;
            });
            OBJETO_MODEL.applicability.especificTagsValue = OBJETO_MODEL.applicability.especificTagsValue.splice(findIndex, 1);
        }
    }


    console.log('depois ->', OBJETO_MODEL)
}

function removePROMOCAOTXT(texto) {
    console.log('removendo  ->', texto)
    var txt = texto
    console.log('antes ->', OBJETO_MODEL)
    let MEU_ARRAY = OBJETO_MODEL.applicability.especificCategoriesValue

    const findIndex = MEU_ARRAY.findIndex(object => {
        return object === txt;
    });
    let lista = MEU_ARRAY.splice(findIndex, 1);
    console.log('lista e idnex', findIndex, lista, MEU_ARRAY)
    OBJETO_MODEL.applicability.especificCategoriesValue = MEU_ARRAY



    console.log('depois ->', OBJETO_MODEL)
}

function removePROMOCAOTXTTAG(texto) {
    console.log('removendo  ->', texto)
    var txt = texto
    console.log('antes ->', OBJETO_MODEL)
    let MEU_ARRAY = OBJETO_MODEL.applicability.especificTagsValue

    const findIndex = MEU_ARRAY.findIndex(object => {
        return object === txt;
    });
    let lista = MEU_ARRAY.splice(findIndex, 1);
    console.log('lista e idnex', findIndex, lista, MEU_ARRAY)
    OBJETO_MODEL.applicability.especificTagsValue = MEU_ARRAY



    console.log('depois ->', OBJETO_MODEL)
}

function subTagInput(ele, elemento, texto) {
    console.log('antes ->', OBJETO_MODEL)

    if (texto) {
        if (Array.isArray(OBJETO_MODEL.applicability.especificCategoriesValue)) {
            OBJETO_MODEL.applicability.especificCategoriesValue.push(texto)
            let lista = [...new Set(OBJETO_MODEL.applicability.especificCategoriesValue)]
            OBJETO_MODEL.applicability.especificCategoriesValue = lista
        }
    }

    var listaTags = '', listaMarcas = ''

    console.log('depois ->', OBJETO_MODEL)


    //////console.log(elemento,texto)
    var html = '<div  class="input-group categoriaLabel  "><label  >' + texto + '</label><label action="' + elemento + '" onclick="removePROMOCAO($(this))"  style="max-width: 20%"  class="iconClose"><i class="far fa-times-circle"></i></label></div>';
    //////console.log("vou mostrar " ,ele[0].checked )
    if (ele[0].checked == true) {
        // $("."+elemento).append(html)
        //////console.log("elemento tal",$("."+elemento))
        insereCategoriaPromocao($("." + elemento), ele, texto)

    } else {
        $("." + elemento).find(".categoriaLabel").each(function () {
            if ($(this).text() == texto) { $(this).remove() }
        })

        removePROMOCAOTXT(texto)

    }






}

function subTagInputTAG(ele, elemento, texto) {
    console.log('antes ->', OBJETO_MODEL)

    if (texto) {
        if (Array.isArray(OBJETO_MODEL.applicability.especificTagsValue)) {
            OBJETO_MODEL.applicability.especificTagsValue.push(texto)
            let lista = [...new Set(OBJETO_MODEL.applicability.especificTagsValue)]
            OBJETO_MODEL.applicability.especificTagsValue = lista
        }
    }

    var listaTags = '', listaMarcas = ''

    console.log('depois ->', OBJETO_MODEL)


    //////console.log(elemento,texto)
    var html = '<div  class="input-group categoriaLabel  "><label  >' + texto + '</label><label action="' + elemento + '" onclick="removePROMOCAOTAG($(this))"  style="max-width: 20%"  class="iconClose"><i class="far fa-times-circle"></i></label></div>';
    //////console.log("vou mostrar " ,ele[0].checked )
    if (ele[0].checked == true) {
        // $("."+elemento).append(html)
        //////console.log("elemento tal",$("."+elemento))
        insereTagPromocao($("." + elemento), ele, texto)

    } else {
        $("." + elemento).find(".categoriaLabel").each(function () {
            if ($(this).text() == texto) { $(this).remove() }
        })

        removePROMOCAOTXTTAG(texto)

    }






}



function dropaCategorias(element) {
    console.log('Dropando')
    if (element.find(".drop").attr("dropei") === '1') {
        element.find(".drop").attr("dropei", "0")
        element.find(".drop").hide()
    } else {
        element.find(".drop").attr("dropei", "1")
        element.find(".drop").show()
    }

}

function dropaCategoriasInner(element) {
    console.log('Dropando')
    if (element.find(".listInner2 ").attr("dropei") === '1') {
        element.find(".listInner2 ").attr("dropei", "0")
        element.find(".listInner2 ").hide()
    } else {
        element.find(".listInner2 ").attr("dropei", "1")
        element.find(".listInner2 ").show()
    }

}


function insereCategoriaPromocao(elemento, outroElemento, texto) {

    outroElemento.attr("id", "desmarcaInput" + contadorIds)
    var newID = "desmarcaInput" + contadorIds
    if (texto.split(",").length == 0) {
        var html = '<div  class="input-group categoriaLabel">' + "<label  >" + texto + "</label>" + '<label onclick="removereiPromocao($(this),\'' + texto + '\',\'categoria\')"  class="iconClose  "><i class="far fa-times-circle"></i></label>' + "</div>";
        elemento.append(html);
    } else {
        var lista = texto.split(",");
        for (const k in lista) {
            var html = '<div  class="input-group categoriaLabel">' + "<label  >" + lista[k] + "</label>" + '<label  onclick="removereiPromocao($(this),\'' + lista[k] + '\',\'categoria\')"  class="iconClose  "><i class="far fa-times-circle"></i></label>' + "</div>";
            elemento.append(html);
        }
    }
    contadorIds++
}


function insereTagPromocao(elemento, outroElemento, texto) {

    outroElemento.attr("id", "desmarcaInput" + contadorIds)
    var newID = "desmarcaInput" + contadorIds
    if (texto.split(",").length == 0) {
        var html = '<div  class="input-group categoriaLabel">' + "<label  >" + texto + "</label>" + '<label onclick="removereiPromocao($(this),\'' + texto + '\',\'tag\')"  class="iconClose  "><i class="far fa-times-circle"></i></label>' + "</div>";
        elemento.append(html);
    } else {
        var lista = texto.split(",");
        for (const k in lista) {
            var html = '<div  class="input-group categoriaLabel">' + "<label  >" + lista[k] + "</label>" + '<label  onclick="removereiPromocao($(this),\'' + lista[k] + '\',\'tag\')"  class="iconClose  "><i class="far fa-times-circle"></i></label>' + "</div>";
            elemento.append(html);
        }
    }
    contadorIds++
}




function getLabelTag(dado) {
    let fullHtml = ''
    for (const k in dado) {
        fullHtml += `
         <div class="input-group categoriaLabel"><label>${dado[k]}</label><label onclick="removereiPromocao($(this),'${dado[k]}','tag')" class="iconClose  "><i class="far fa-times-circle"></i></label></div>
        `
    }
    
    return fullHtml

}

function getLabelCategoria(dado) {
    let fullHtml = ''
    for (const k in dado) {
        fullHtml += `
         <div class="input-group categoriaLabel"><label>${dado[k]}</label><label onclick="removereiPromocao($(this),'${dado[k]}','categoria')" class="iconClose  "><i class="far fa-times-circle"></i></label></div>
        `
    }

    return fullHtml

}

function removereiPromocao(elemento,texto, tipo){
    if(tipo === 'tag'){
        $(".tagPromocao").each(function(){
            if($(this).attr("myValue").trim() === texto.trim()){
                $(this).click()
                
            }
        })
    }

    if(tipo === 'categoria'){
        $(".catPromocao").each(function(){
            if($(this).attr("myValue").trim() === texto.trim()){
                $(this).click()
             
            }
        })
    }
}

 