var AFFILIATE_ID = localStorage.AFFILIATE_ID
var MASTER_ID = localStorage.MASTER_ID
var mainHost = 'https://api-smartcomerci.com.br:9090'


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
        especificTags: false
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
        especificTags: false
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

            for(const k in data){
                const { id, createdAt, updatedAt, content } = data[k]
                OBJECT_LIST.push({
                    id: id,
                    createdAt: createdAt,
                    updatedAt: updatedAt,
                    content: JSON.parse(content)
                })
            }

            console.log('OBJECT_LIST', OBJECT_LIST)

            const cupons = OBJECT_LIST.find( (obj) => obj.main.type === 'Cupom')
            const fretes = OBJECT_LIST.find( (obj) => obj.main.type === 'Frete Grátis')
            const descontos = OBJECT_LIST.find( (obj) => obj.main.type === 'Desconto')

            if(Array.isArray(cupons)){
                for(const k in cupons){
                    $(".listaDeCupons").append(
                        getCupom(cupons[k])
                    )
                }
            }else{
                if(cupons){
                    $(".listaDeCupons").append(
                        getCupom(cupons)
                    )
                } 
            }

            if(Array.isArray(fretes)){
                for(const k in fretes){
                    $(".listaDeFretes").append(
                        getCupom(fretes[k])
                    )
                }
            }else{
                if(fretes){
                    $(".listaDeFretes").append(
                        getCupom(fretes)
                    )
                } 
            }

            if(Array.isArray(descontos)){
                for(const k in descontos){
                    $(".listaDePromocoes").append(
                        getCupom(descontos[k])
                    )
                }
            }else{
                if(descontos){
                    $(".listaDePromocoes").append(
                        getCupom(descontos)
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

        },
        error: function (data) {
            console.log('updateById', data)
        },
        complete: function () { },
    });
}

async function CLOSE_AND_SAVE(type, ID){

    if(type === 'insert'){
        await insertNew(OBJETO_MODEL)
        OBJETO_MODEL = OBJETO_DEFAULT
    }
    if(type === 'update'){
        if(ID){
            await updateObject(OBJETO_MODEL, ID)
            OBJETO_MODEL = OBJETO_DEFAULT
        }else{
            console.log("ID not provided", ID)
        }
        
    }

    $(".close").click()

}

async function CLOSE_AND_DELETE(ID){
    if(ID){
        await deleteObject(ID)
    }
    $(".close").click()
}

async function CLOSE_AND_CANCEL(type, ID){
    OBJETO_MODEL = OBJETO_DEFAULT
    $(".close").click()
}

