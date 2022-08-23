var AFFILIATE_ID = localStorage.AFFILIATE_ID
var MASTER_ID = localStorage.MASTER_ID
var mainHost = 'https://api-smartcomerci.com.br:9090'


let OBJETO_MODEL = {
    main: {
        active: false,
        isCupom: false,
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
        url: mainHost + '/insertNew',
        data: {
            tableName: "promocoes_cupons",
            masterId: MASTER_ID,  
            idName: 'master_id'

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


        },
        error: function (data) {
            console.log('getByTableName', data)
        },
        complete: function () { },
    });
}

async function setObject(element) {
    console.log('antes de alterar =>', OBJETO_MODEL)
    console.log(
        `OBJETO_MODEL[${area}][${detalhe}]`
    )
    let area = element.attr("are")
    let detalhe = element.attr("detalhe")
    let valor = element.attr("type") === "checkbox" ? element[0].checked : element.val()
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

