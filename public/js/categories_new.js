const api_host = "https://api-smartcomerci.com.br:7070";
let currentCategoryId = null,
  currentSubcategoryId = null;
getCategories();
let categoriesObject = {
  affiliateId: Number(localStorage.AFFILIATE_ID),
  masterId: Number(localStorage.MASTER_ID),
  limitToShow: 8,
  categories: [],
};

class Category {
  id = 0;
  title = "";
  keywords = [];
  description = "";
  icon = "";
  active = true;
  banners = {
    default: [],
    asideMenu: [],
  };
  subcategories = [];
  constructor(id) {
    this.id = id;
  }
}
function editCategoryField(
  cat,
  id,
  field,
  newValue,
  idSub,
  subField,
  newValueSub
) {
  if (cat) {
    if (field !== "banners" && field !== "subcategories") {
      let currCategory = categoriesObject.categories.find((dt) => dt.id === id);
      if (field === "keywors") {
        let exists = currCategory[field].find((a) => a === newValue);
        if (!exists) {
          currCategory[field].push(newValue);
        } else {
          console.log("Value '" + newValue + "' alread exists!");
        }
      } else {
        currCategory[field] = newValue;
      }
      for (const k in categoriesObject.categories) {
        if (categoriesObject.categories[k].id === id) {
          categoriesObject.categories[k] = currCategory;
        }
      }
    } else {
      console.log("Not changes this from here...");
    }
  } else {
    if (subField !== "banners" && subField !== "subcategories") {
      let currCategory = categoriesObject.categories.find((dt) => dt.id === id);
      let currSubCategory = currCategory.subcategories.find(
        (dt) => dt.id === idSub
      );
      if (subField === "keywors") {
        let exists = currSubCategory[subField].find((a) => a === newValueSub);
        if (!exists) {
          currSubCategory[subField].push(newValueSub);
        } else {
          console.log("Value '" + newValueSub + "' alread exists!");
        }
      } else {
        currSubCategory[subField] = newValueSub;
      }
      for (const k in categoriesObject.categories) {
        if (categoriesObject.categories[k].id === id) {
          for (const a in categoriesObject.categories[k].subcategories) {
            if (categoriesObject.categories[k].subcategories[a].id === idSub) {
              categoriesObject.categories[k].subcategories[a] = currSubCategory;
            }
          }
        }
      }
    } else {
      console.log("Not changes this from here...");
    }
  }
}
function setBanners(cat, id, newValue, idSub, newValueSub) {
  if (cat) {
    let currCategory = categoriesObject.categories.find((dt) => dt.id === id);
    let exists = currCategory[field].find((dt) => dt.url === newValue);
    if (!exists) {
      currCategory[field].push({
        id: currCategory[field].length,
        url: newValue,
      });
    } else {
      for (const k in currCategory[field]) {
        if (currCategory[field].id === id) {
          currCategory[field].url = newValue;
        }
      }
    }
    for (const k in categoriesObject.categories) {
      if (categoriesObject.categories[k].id === id) {
        categoriesObject.categories[k] = currCategory;
      }
    }
  } else {
    let currCategory = categoriesObject.categories.find((dt) => dt.id === id);
    let currSubCategory = currCategory.subcategories.find(
      (dt) => dt.id === idSub
    );
    let exists = currSubCategory[field].find((dt) => dt.url === newValueSub);
    if (!exists) {
      currSubCategory[field].push({
        id: currSubCategory[field].length,
        url: newValueSub,
      });
    } else {
      for (const k in currSubCategory[field]) {
        if (currSubCategory[field].id === idSub) {
          currSubCategory[field].url = newValueSub;
        }
      }
    }
    for (const k in categoriesObject.categories) {
      if (categoriesObject.categories[k].id === id) {
        for (const a in categoriesObject.categories[k].subcategories) {
          if (categoriesObject.categories[k].subcategories[a].id === idSub) {
            categoriesObject.categories[k].subcategories[a] = currSubCategory;
          }
        }
      }
    }
  }
}
class Subcategory {
  id = 0;
  title = "";
  keywords = [];
  description = "";
  icon = "";
  active = true;
  banners = {
    default: [],
    asideMenu: [],
  };
  subcategories = [];
  priorization = {
    smart: false,
    bestSellers: false,
    offers: false,
    personal: false,
    products: [],
  };
  constructor(id) {
    this.id = id;
  }
}
function addCategory(id) {
  if (id) {
    let currCategory = categoriesObject.categories.find(
      (dt) => Number(dt.id) === Number(id)
    );
    if (!currCategory.subcategories) {
      currCategory.subcategories = [];
    }
    console.log("currCat", currCategory);
    let subcategoria = new Subcategory(currCategory.subcategories.length);
    currCategory.subcategories.push(subcategoria);
    for (const k in categoriesObject.categories) {
      if (categoriesObject.categories[k].id === id) {
        categoriesObject.categories[k] = currCategory;
      }
    }
    console.log(categoriesObject);

    setTimeout(() => {
      $(".itemSortable2").each(function () {
        console.log("encontrando", $(this).attr("idCat"), id);
        if (Number($(this).attr("idCat")) === Number(id)) {
          $(this).find(".dropCategoriaContent2").click();
        }
      });
    }, 2000);
    showCategories();
  } else {
    let categoria = new Category(categoriesObject.categories.length);
    categoriesObject.categories.push(categoria);
    console.log(categoriesObject);
    showCategories();
  }
}

function showCategories() {
  $("#listaCategoriasLoja").html("");
  categoriesObject.categories.forEach((cat) => {
    console.log(cat);
    $("#listaCategoriasLoja").append(categoryElementLi(cat));
    console.log(cat.id, categoriesObject.limitToShow - 1);
    if (Number(cat.id) === categoriesObject.limitToShow - 1) {
      $("#listaCategoriasLoja").append(
        `<br><br><h1 class="hiperTitle">Outras Categorias <span class="hiperTitleSub">(Exibe em "todas as categorias" no menu)</h1><hr>`
      );
    }
  });
}
async function getCategories() {
  const resultado = await $.ajax({
    type: "GET",
    url: api_host + "/categorie_find/" + localStorage.AFFILIATE_ID,
    headers: {
      "x-access-token": localStorage.token,
    },
    data: "",
  });
  console.log("O RESULTADO", resultado);
  if (!resultado || resultado.data.length === 0) {
    const criaPrimeiroAcesso = await criarPrimeiroAcesso();
    console.log("Primeiro acesso", criaPrimeiroAcesso);
  } else {
    if (Array.isArray(resultado.data)) {
      categoriesObject = resultado.data.find(
        (dt) => dt.affiliateId === Number(localStorage.AFFILIATE_ID)
      );
    } else {
      categoriesObject = resultado.data;
    }
  }
  console.log(resultado, categoriesObject);
  showCategories();
}
async function criarPrimeiroAcesso() {
  const resultado = await $.ajax({
    type: "POST",
    url: api_host + "/categorie_create",
    headers: {
      "x-access-token": localStorage.token,
    },
    data: categoriesObject,
  });
  console.log(resultado);
}
async function publicarAlteracoes() {
  repareObj();
  const resultado = await $.ajax({
    type: "POST",
    url: api_host + "/categorie_update/" + localStorage.AFFILIATE_ID,
    headers: {
      "x-access-token": localStorage.token,
    },
    data: categoriesObject,
  });
  console.log(resultado);
}

function subcategoryElementLi(dado, mainId) {
  let html = "";
  if (!dado || dado.length === 0) {
    return html;
  }
  for (const k in dado) {
    html += `
  <li idCat="${mainId}" idSub="${dado[k].id}" draggable="true" class="list-sub-item nova_sub newSub itemSortable ui-sortable-handle" >
                            <div class="row"
                                style="display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: -15px;margin-left: -15px;">
                                <span class="trilha2" style="opacity: 1;">.....</span>
                                <div class="row radius20 subCabecalho"
                                    style="margin-left: 0.2%; border: 1px solid rgb(239, 239, 239); margin-top: 1%; padding-right: 15px; min-width: 100%; background: white !important; opacity: 1;">
                                    <div style="max-width: 100px; opacity: 1; margin: 1% auto;" "showContent($(this))"
                                        class="col-sm dropCategoriaContent2">
                                        <div class="row" style="padding: 5%;">
                                            <div onclick="showContent($(this))" class="col-sm dropCategoriaContent2" style="opacity: 1;"><svg
                                                    class="iconGrid" xmlns="http://www.w3.org/2000/svg"
                                                    style="fill: #687c97;" width="13.5" height="23" viewBox="0 0 9 16">
                                                    <defs></defs>
                                                    <path class="a"
                                                        d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z">
                                                    </path>
                                                    <path class="a"
                                                        d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z"
                                                        transform="translate(5)"></path>
                                                </svg></div>
                                            <div class="col-sm  numberCat" style="opacity: 1;">
                                                <sp class="posicaoSubCategoriaNew">${dado[k].id}</sp>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm" style="opacity: 1;"><label  
                                            class="label nomeCategoria SUB_CATEGORIA">${dado[k].title}</label></div>
                                    <div class="col-sm opacity0" style="opacity: 1;"><label
                                            class="label totalSubCategorias">00 Subcategorias</label></div>
                                    <div class="col-sm" style="opacity: 1;">
                                        <div class="row">
                                            <div class="switch__container ATIVA_SUB_CATEGORIA"
                                                style="opacity: 1;margin-top: 5%;"><input  
                                                    checked="checked" id="switch-shadow01234019"
                                                    class="switch switch--shadow ativa-me2" type="checkbox"><label
                                                    for="switch-shadow01234019"></label></div><label
                                                class="label catAtiva" style="opacity: 1;">Subcategoria ativa</label>
                                        </div>
                                    </div>
                                    <div class="col-sm" style="opacity: 1;">
                                        <div  class="input-group catEdit"><label
                                                style="margin: auto; color: #f6b504">Editar Subcategoria</label></div>
                                    </div>
                                    <div style="max-width: 70px; opacity: 1;" class="col-sm ">
                                        <div class=" duplicate"><svg xmlns="http://www.w3.org/2000/svg"
                                                style=" fill: #f6b504;   margin: 12px;" width="12" height="14"
                                                viewBox="0 0 12 14">
                                                <path id="duplicate"
                                                    d="M7.125,14H1.875A1.913,1.913,0,0,1,0,12.055v-7A1.913,1.913,0,0,1,1.875,3.111H3V1.945A1.913,1.913,0,0,1,4.874,0h4.5A.364.364,0,0,1,9.64.114l2.25,2.334a.391.391,0,0,1,.109.3v6.2a1.913,1.913,0,0,1-1.875,1.945H9v1.165A1.913,1.913,0,0,1,7.125,14ZM1.875,3.889A1.148,1.148,0,0,0,.75,5.055v7a1.148,1.148,0,0,0,1.125,1.167h5.25a1.148,1.148,0,0,0,1.124-1.167V10.89H6.374a.389.389,0,0,1,0-.778h3.75a1.148,1.148,0,0,0,1.125-1.167V3.112H9.374A.383.383,0,0,1,9,2.723V.778H4.874A1.148,1.148,0,0,0,3.75,1.945V5.833a.376.376,0,1,1-.751,0V3.889ZM9.749,1.329V2.334h.97ZM3.375,10.112A.365.365,0,0,1,3.109,10a.4.4,0,0,1,0-.55l3.86-4H5.624a.389.389,0,0,1,0-.778h2.25a.382.382,0,0,1,.375.388V7.389a.375.375,0,1,1-.75,0v-1.4L3.64,10A.365.365,0,0,1,3.375,10.112Z"
                                                    fill="#f6b504"></path>
                                            </svg></div>
                                    </div>
                                    <div style="max-width: 70px; opacity: 1;" class="col-sm">
                                        <div  class=" deleteThis"><svg
                                                xmlns="http://www.w3.org/2000/svg" width="19" height="19"
                                                viewBox="0 0 21 21" style="fill: #f6b504;margin: 9px;">&gt;<defs></defs>
                                                <path class="a"
                                                    d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z"
                                                    transform="translate(4 3)"></path>
                                            </svg></div>
                                    </div>
                                </div>
                            </div>
                        </li>
  `;
  }
  return html;
}
function categoryElementLi(dado) {
  return `
 <li idCat="${dado.id}" class="itemSortable2 ui-sortable-handle">
    <div title="'null'" description="'null'" draggable="true" class="categorie vouClonar">
        <div class="row radius20 cabecalho" style="border: 1px solid #efefef; margin-top: 1%; padding-right: 2%">
            <div  onclick="showContent($(this))" style="max-width: 100px; opacity: 1; margin: 1% auto;" class="col-sm dropCategoriaContent2">
                <div class="row" style="padding: 5%;">
                    <div class="col-sm dropCategoriaContent" style="opacity: 1;"><svg class="iconGrid"
                            xmlns="http://www.w3.org/2000/svg" style="fill: #687c97;" width="13.5" height="23"
                            viewBox="0 0 9 16">
                            <defs></defs>
                            <path class="a"
                                d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z">
                            </path>
                            <path class="a"
                                d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z"
                                transform="translate(5)"></path>
                        </svg></div>
                    <div class="col-sm posicaoCategoriaNew numberCat" style="opacity: 1;">${
                      dado.id
                    }</div>
                </div>
            </div>
            <div style="max-width: 70px; margin: 7px auto; opacity: 1;" class="col-sm">
                <div style="max-width: 120px;" class="iconCategorie"><img style="    max-width: 30px !important;"
                        src="https://api-smartcomerci.com.br/assets/icons/cliente_Icone Embalagens.png"></div>
            </div>
            <div class="col-sm" style="opacity: 1;"><label
                    class="label nomeCategoria CATEGORIA_PRINCIPAL">${
                      dado.title
                    }</label></div>
            <div class="col-sm" style="opacity: 1;"><label class="label totalSubCategorias">11 Subcategorias</label>
            </div>
            <div class="col-sm" style="opacity: 1;">
                <div class="row">
                    <div class="switch__container ATIVA_CATEGORIA" style="opacity: 1;margin-top: 5%;"><input
                            checked="checked" id="switch-shadow03101"
                            class="switch switch--shadow ativa-me CHECK_PRINCIPAL" type="checkbox"><label
                            for="switch-shadow03101"></label></div><label class="label catAtiva"
                        style="opacity: 1;">Categoria ativa</label>
                </div>
            </div>
            <div class="col-sm" style="opacity: 1;">
                <div   class="input-group catEdit"><label
                        style="margin: auto; color: #f6b504">Editar Categoria</label></div>
            </div>
            <div style="max-width: 70px; opacity: 1;" class="col-sm ">
                <div class=" duplicate"><svg xmlns="http://www.w3.org/2000/svg"
                        style=" fill: #f6b504;  cursor: pointer;  margin:auto;" width="12" height="14"
                        viewBox="0 0 12 14">
                        <path id="duplicate"
                            d="M7.125,14H1.875A1.913,1.913,0,0,1,0,12.055v-7A1.913,1.913,0,0,1,1.875,3.111H3V1.945A1.913,1.913,0,0,1,4.874,0h4.5A.364.364,0,0,1,9.64.114l2.25,2.334a.391.391,0,0,1,.109.3v6.2a1.913,1.913,0,0,1-1.875,1.945H9v1.165A1.913,1.913,0,0,1,7.125,14ZM1.875,3.889A1.148,1.148,0,0,0,.75,5.055v7a1.148,1.148,0,0,0,1.125,1.167h5.25a1.148,1.148,0,0,0,1.124-1.167V10.89H6.374a.389.389,0,0,1,0-.778h3.75a1.148,1.148,0,0,0,1.125-1.167V3.112H9.374A.383.383,0,0,1,9,2.723V.778H4.874A1.148,1.148,0,0,0,3.75,1.945V5.833a.376.376,0,1,1-.751,0V3.889ZM9.749,1.329V2.334h.97ZM3.375,10.112A.365.365,0,0,1,3.109,10a.4.4,0,0,1,0-.55l3.86-4H5.624a.389.389,0,0,1,0-.778h2.25a.382.382,0,0,1,.375.388V7.389a.375.375,0,1,1-.75,0v-1.4L3.64,10A.365.365,0,0,1,3.375,10.112Z"
                            fill="#f6b504"></path>
                    </svg></div>
            </div>
            <div style="max-width: 70px; opacity: 1;" class="col-sm">
                <div   class=" deleteThis"><svg xmlns="http://www.w3.org/2000/svg"
                        width="19" height="19" viewBox="0 0 21 21" style="fill: #f6b504;margin: 9px;">&gt;<defs></defs>
                        <path class="a"
                            d="M10.937,16H3.063A2.208,2.208,0,0,1,.875,13.778V2.666H.438a.444.444,0,0,1,0-.889H4.375V1.334A1.324,1.324,0,0,1,5.687,0H8.313A1.324,1.324,0,0,1,9.625,1.334v.444h3.937a.444.444,0,0,1,0,.889h-.437V13.778A2.208,2.208,0,0,1,10.937,16ZM1.75,2.666V13.778a1.325,1.325,0,0,0,1.313,1.334h7.875a1.325,1.325,0,0,0,1.313-1.334V2.666ZM5.687.889a.441.441,0,0,0-.437.445v.444h3.5V1.334A.441.441,0,0,0,8.313.889Zm3.5,11.556A.442.442,0,0,1,8.75,12V5.778a.437.437,0,1,1,.875,0V12A.441.441,0,0,1,9.188,12.445Zm-4.375,0A.441.441,0,0,1,4.375,12V5.778a.437.437,0,1,1,.875,0V12A.442.442,0,0,1,4.812,12.445Z"
                            transform="translate(4 3)"></path>
                    </svg></div>
            </div>
            <div style="max-width: 70px; opacity: 1;" class="col-sm dropCategoriaContent">
                <div class=" deleteThis dropCategoriaButton "><svg class="seta" xmlns="http://www.w3.org/2000/svg"
                        style="fill: #fcfcfd; stroke: silver;" width="36" height="36" viewBox="0 0 36 36">
                        <g transform="translate(36 36) rotate(180)">
                            <g transform="translate(28 28) rotate(180)">
                                <g class="b">
                                    <g class="c">
                                        <circle class="e" cx="10" cy="10" r="10"></circle>
                                        <circle class="f" cx="10" cy="10" r="9.5"></circle>
                                    </g>
                                    <path class="d"
                                        d="M581.273,789.774a.82.82,0,0,1-.081-1.079l.081-.092,3.685-3.593-3.685-3.593a.82.82,0,0,1-.081-1.079l.081-.093a.849.849,0,0,1,1.094-.081l.094.081,4.279,4.179a.82.82,0,0,1,.081,1.079l-.081.093-4.279,4.179A.849.849,0,0,1,581.273,789.774Z"
                                        transform="translate(795.009 -573.615) rotate(90)"></path>
                                </g>
                            </g>
                        </g>
                    </svg></div>
            </div>
        </div>
        <div class="row radius20Bottom dropCategoria bordaDourada"
            style=" border: 1px solid #efefef; margin-top: -2px; padding-right: 2%; display:none;    background-color: #f8f9ff; max-height: 80vh">
            <div style="margin-top: 1%; width: 100%; opacity: 1;" class="row">
                <div class="col-md-12" style="opacity: 1;">
                    <div   onclick="addCategory(${dado.id})"
                        style="    z-index: 999;;cursor:pointer;border-left: 5px dotted silver;margin-left: 7%;cursor: pointer; border-radius: 20px; font: bold 1rem Roboto; background-color: rgb(246, 181, 4); max-width: 200px; height: 40px; border: 2px solid rgb(246, 181, 4); float: left; opacity: 1;"
                        class="input-group outraSubCat">
                        <div style="border: none; margin: auto;" class="input-group-append">
                            <div style="border: none; margin: auto; padding: 2%;" class="input-group-text"><svg
                                    xmlns="http://www.w3.org/2000/svg" style="margin: -20% auto 0 0; fill: white;"
                                    width="24" height="24" viewBox="0 0 24 24">
                                    <defs></defs>
                                    <path class="a"
                                        d="M10.5,21A10.5,10.5,0,0,1,3.075,3.075,10.5,10.5,0,1,1,10.5,21Zm0-20A9.5,9.5,0,1,0,20,10.5,9.511,9.511,0,0,0,10.5,1Zm0,14a.5.5,0,0,1-.5-.5V11H6.5a.5.5,0,0,1,0-1H10V6.5a.5.5,0,0,1,1,0V10h3.5a.5.5,0,1,1,0,1H11v3.5A.5.5,0,0,1,10.5,15Z"
                                        transform="translate(2 2)"></path>
                                </svg></div>
                        </div><label style="margin: -1% auto; min-width: 60%; color: white !important; cursor:pointer"
                            class="label">Nova Subcategoria</label>
                    </div>
                    <div style="border-left: 5px dotted silver;margin-left: 35px; margin-top: 1%; padding: 1%;    margin-bottom: 15px;"
                        class="col-md-12">
                        <h4 class="label" style="text-align: left ;font-size: 20px; margin-left: 1%; ">A ordem abaixo
                            reflete na ordem do menu e na página de categoria</h4>
                    </div>
                </div>
                <div class="col-md-12 verticalScroll"
                    style="max-height: 550px;margin-bottom: 20px;opacity: 1;margin-top: -12px;margin-left: 1px;">
                    <ul id="sortable" class="listInner3 dropCategoria superSortable ui-sortable" style=""> 
                     ${subcategoryElementLi(dado.subcategories, dado.id)}
                    </ul>
                </div>
            </div>
        </div>
    </div>
</li>
  `;
}
function OrdenaJson(lista, chave, ordem) {
  return lista.sort(function (a, b) {
    var x = a[chave];
    var y = b[chave];
    if (ordem === "ASC") {
      return x < y ? -1 : x > y ? 1 : 0;
    }
    if (ordem === "DESC") {
      return x > y ? -1 : x < y ? 1 : 0;
    }
  });
}
function reordenaListas3() {
  $(".superSortable").each(function () {
    var items = $(this).find(".itemSortable");
    var index = 1;
    items.each(function () {
      $(this).find(".posicaoSubCategoria").text(index);
      index++;
    });
  });

  $(".fullSortable").each(function () {
    var items = $(this).find(".itemSortable2");
    var index = 1;
    items.each(function () {
      $(this).find(".posicaoCategoria").text(index);
      index++;
    });
  });
}

function repareObj() {
  try {
    $(".superSortable").each(function () {
      let categories = categoriesObject.categories;
      var items = $(this).find(".itemSortable");
      var index = 1;
      var subs = [];

      items.each(function () {
        let idCat = $(this).attr("idCat");
        let subcategories = categories.find(
          (dt) => Number(dt.id) === Number(idCat)
        ).subcategories;
        let idSub = $(this).attr("idSub");
        console.log("ID ", Number(idSub));
        let thisSub = subcategories.find(
          (dt) => Number(dt.id) === Number(idSub)
        );
        console.log(subcategories, thisSub);
        if (thisSub) {
          thisSub.id = (index - 1).toString();
          subs.push(thisSub);
        }

        $(this).find(".posicaoSubCategoriaNew").text(index);
        index++;
        for (const k in categoriesObject.categories) {
          if (Number(categoriesObject.categories[k].id) === Number(idCat)) {
            categoriesObject.categories[k].subcategories = subs;
          }
        }
      });
    });

    $(".fullSortable").each(function () {
      var items = $(this).find(".itemSortable2");
      let categories = categoriesObject.categories;
      var index = 1;
      let cats = [];
      items.each(function () {
        let idCat = $(this).attr("idCat");
        let thisCat = categories.find((dt) => Number(dt.id) === Number(idCat));
        thisCat.id = (index - 1).toString();
        cats.push(thisCat);
        $(this).find(".posicaoCategoriaNew").text(index);
        index++;
      });
      categoriesObject.categories = cats;
    });

    categoriesObject.categories = OrdenaJson(
      categoriesObject.categories,
      "id",
      "ASC"
    );
    for (const k in categoriesObject.categories) {
      categoriesObject.categories[k].subcategories = OrdenaJson(
        categoriesObject.categories[k].subcategories,
        "id",
        "ASC"
      );
    }
  } catch (er) {
    console.log("ERRO => ", er);
  }
}

setInterval(() => {
  try {
    reordenaListas3();
  } catch (err) {
    console.log(err);
  }
}, 1000);

function showContent(element) {
  if (
    element.attr("dropado") == "nao" ||
    element.attr("dropado") == undefined
  ) {
    element.parent().parent().find(".cabecalho").removeClass("radius20");
    element.parent().parent().find(".cabecalho").addClass("radius20Top");
    element.parent().parent().find(".cabecalho").addClass("bordaDourada");
    $(".seta").removeClass("rotate180");
    element.parent().parent().find(".seta").addClass("rotate180");

    element.attr("dropado", "sim");
    element.parent().parent().find(".dropCategoria").show();
  } else {
    element.parent().parent().find(".cabecalho").removeClass("radius20Top");
    element.parent().parent().find(".cabecalho").addClass("radius20");
    element.parent().parent().find(".cabecalho").removeClass("bordaDourada");
    element.attr("dropado", "nao");
    element.parent().parent().find(".dropCategoria").hide();
    element.parent().parent().find(".seta").removeClass("rotate180");
  }
}
