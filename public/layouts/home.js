let notFound =
  "https://api-smartcomerci.com.br/images/default/produto-sem-imagem.jpg";

let homePage = {
  logotipo: {
    url: "",
    link: "",
  },
  mainColors: {
    first: "",
    second: "",
    third: "",
    fourty: "",
  },
  asideBanner: {
    url: "",
    link: "",
  },
  header: {
    mainBanner: {
      url: "",
      link: "",
    },
    footerBanners: {
      first: {
        url: "",
        link: "",
      },
      second: {
        url: "",
        link: "",
      },
      third: {
        url: "",
        link: "",
      },
      fourty: {
        url: "",
        link: "",
      },
    },
    asideBanner: {
      url: "",
      link: "",
    },
  },
  body: [
    {
      type: "vitrine",
      title: {
        text: "",
        link: "",
      },
      categories: [],
      smart: false,
      bestSellers: false,
      offers: false,
      personal: false,
      products: [],
    },
    {
      type: "revenues",
      title: {
        text: "",
        link: "",
      },
      categories: [],
      smart: false,
      personal: false,
      revenues: [],
    },
    {
      type: "banners",
      first: {
        url: "",
        link: "",
      },
      second: {
        url: "",
        link: "",
      },
    },
  ],
  newsletter: {
    text: "",
    link: "",
  },
  whatsapp: {
    text: "",
    url: "",
    link: "",
  },
  footerLinks: {
    firstColumnTittle: {
      text: "",
      link: "",
    },
    secondColumnTittle: {
      text: "",
      link: "",
    },
    thirdColumnTittle: {
      text: "",
      link: "",
    },
    firstColumn: [],
    secondColumn: [],
    thirdColumn: [],
    contactData: {
      text: "",
      link: "",
    },
  },
  footerLogo: {
    url: "",
    link: "",
  },
  footerText: {
    text: "",
    link: "",
  },
  socialMidia: {
    facebook: {
      status: false,
      link: "",
    },
    instagram: {
      status: false,
      link: "",
    },
    youTube: {
      status: false,
      link: "",
    },
  },
  legalText: {
    url: "",
    link: "",
  },
};

//================================NEWS UPDATES==============================

function setOrigins(origin) {
  console.log("ORIGIN in function", origin);
  $(".modal")
    .find("input")
    .each(function () {
      $(this).removeAttr("origin");
    });

  $(".modal")
    .find("textarea")
    .each(function () {
      $(this).removeAttr("origin");
    });

  $(".modal")
    .find("button")
    .each(function () {
      $(this).removeAttr("origin");
    });

  if (origin) {
    $(".modal")
      .find("input")
      .each(function () {
        $(this).attr("origin");
      });

    $(".modal")
      .find("textarea")
      .each(function () {
        $(this).attr("origin", origin);
      });

    $(".modal")
      .find("button")
      .each(function () {
        $(this).attr("origin", origin);
      });

    $(".switch").each(function () {
      $(this).attr("origin", origin);
    });
  }
}
var GLOBAL_ELEMENT_EDIT = null;
$(".dropzone").click(function (e) {
  e = window.event;
  GLOBAL_ELEMENT_EDIT = $(this);
  e.stopPropagation();
  let origin = $(this).attr("origin");
  console.log("ORIGIN", origin);
  $("#modalChangePicture").attr("origin", origin);
  $("#modalChangePicture").find("input").attr("origin", origin);
  if ($(this).attr("src")) {
    $("#modalChangePicture").find("img").attr("src", $(this).attr("src"));
  }

  setOrigins(origin);

  $("#modalMudaLink").attr("origin", origin);

  $("fundoModal").show();
  if ($(this).attr("origin") === "asideBanner") {
    $(this).parent().parent().addClass("index9");
  } else {
    $(this).parent().addClass("index9");
  }

  $(this).parent().find(".dropzone-prev").show();
});

function newLink3(element) {
  if (element.parent().find(".novoLink3").css("display") === "none") {
    element.parent().find(".novoLink3").show();
  } else {
    element.parent().find(".novoLink3").hide();
  }
}

function showMyPrev(element) {
  GLOBAL_ELEMENT_EDIT = element;
  let origin = element.attr("origin");
  $("#modalChangePicture").attr("origin", origin);
  $("#modalChangePicture").find("input").attr("origin", origin);

  setOrigins(origin);

  if (element.attr("src")) {
    $("#modalChangePicture").find("img").attr("src", element.attr("src"));
  }
  console.log("the id", element, element.attr("id"));

  if (element.attr("id") && element.attr("id").split("_")[0] === "produto") {
    $("#modalVitrine").attr("origin", element.attr("id"));
  } else {
    $("#modalReceitas").attr("origin", element.attr("id"));
  }

  $("#modalMudaLink").attr("origin", origin);
  // element.parent().parent().find("label").addClass("index9");
  // element.parent().parent().find("label").addClass("index9");
  // element.parent().addClass("index9");
  // element.parent().parent().parent().addClass("index9");
  element.parent().parent().addClass("index9");
  element.parent().addClass("borderSelected index9");

  $("fundoModal").show();

  element.parent().find(".dropzone-prev").show();
  element.parent().find(".dropzone-prev").addClass("borderSelected2");
}

$("fundoModal").click(function () {
  $(this).hide();
  $(".dropzone-prev").hide();
  $(".content-dynamic").removeClass("index9");
  $(".content-dynamic").removeClass("borderSelected");

  $(".dropzone").each(function () {
    $(this).parent().parent().removeClass("index9");
    $(this).parent().removeClass("index9");
  });
});

window.onbeforeunload = async function () {
  if ([].length > 0) {
    $("#modalNaoSalvou").click();
    setTimeout(() => {
      return confirm("Necessário salvar");
    }, 2000);
  }
};

function showMe(element) {
  if (element[0].checked === true) {
    element.parent().parent().parent().find(".contentAfter").show();
  } else {
    element.parent().parent().parent().find(".contentAfter").hide();
  }

  let apply = element.attr("id");
  $(".disable-me").each(function () {
    if ($(this).attr("id") !== apply) {
      $(this)[0].checked = false;
    }
  });
}

function showMe2(element) {
  if (element[0].checked === true) {
    element.parent().parent().find(".contentAfter").show();
  } else {
    element.parent().parent().find(".contentAfter").hide();
  }

  let apply = element.attr("id");
  $(".disable-me").each(function () {
    if ($(this).attr("id") !== apply) {
      $(this)[0].checked = false;
    }
  });
}

function uploadAndUpdateFile(element) {
  const loadPictureInner = (picture) => URL && URL.createObjectURL(picture);
  let src = loadPictureInner(element[0].files[0]);
  console.log("SRC", src);
  $("#modalChangePicture").find("img").attr("src", src);
  $("#" + element.attr("origin"))
    .find("img")
    .attr("src", src);

  $("#" + element.attr("origin")).attr("src", src);

  $("#" + element.attr("origin"))
    .find("img")
    .show();
  $("#" + element.attr("origin"))
    .find("img")
    .css("zoom", "90%");
  $("#" + element.attr("origin"))
    .parent()
    .find(".rounded-icon")
    .css("opacity", "0");
}

//==========================================================================
const dropzones = document.querySelectorAll(".dropzone");

const loadPicture = (picture) => URL && URL.createObjectURL(picture);

const handleDragOver = (e) => {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
};

const handleDragDrop = (input, image) => (e) => {
  e.stopPropagation();
  e.preventDefault();

  const { files } = e.dataTransfer;
  const src = loadPicture(files[0]);
  image.src = src;
  input.files = files;

  e.target.classList.add("dropped");
};

const handleSelectFile = (dropzone, image) => (e) => {
  const { files } = e.target;
  const src = loadPicture(files[0]);
  image.src = src;

  dropzone.classList.add("dropped");
};

dropzones.forEach((dropzone) => {
  const [input, image] = dropzone.children;

  dropzone.addEventListener("dragover", handleDragOver);
  dropzone.addEventListener("drop", handleDragDrop(input, image));
  //   input.addEventListener("change", handleSelectFile(dropzone, image));
});

const dropdown = document.querySelector(".styled-dropdown");

dropdown.previousElementSibling.addEventListener("click", () => {
  dropdown.classList.toggle("show");
});

const content = document.querySelector(".preview-home_content");
const content2 = document.querySelector(".listaHOME");
const div = document.createElement("div");
div.innerHTML = `
      <label class="dropzone">
        <input type="file" disabled/>
        <img src="" />
        <span  class="rounded-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/>
          </svg>
        </span>
      </label> 
    `;

const div2 = document.createElement("div");
div2.innerHTML = `

       
 
      <label onclick="showMyPrev($(this))" style="display: contents; " class="dropzone ">
    <h1 style="position: absolute;margin-top: -25px;" class="labelSwitch">Confira estas ótimas ofertas</h1>
        
        ${getProductCard()}
        ${getProductCard()}
        ${getProductCard()}
        ${getProductCard()}
        ${getProductCard()}
        ${getProductCard()} 
 
      </label> 
    `;

const div3 = document.createElement("div");
div3.innerHTML = ` 
      <label onclick="showMyPrev($(this))" style="display: contents; " class="dropzone ">
        <h1 style="position: absolute;margin-top: -25px;" class="labelSwitch">Receitas</h1> 
        ${getRevenueCard()}
        ${getRevenueCard()}
        ${getRevenueCard()}  
      </label> 
    `;

function getProductCard() {
  const card = `<div class="card-color-preview">
                      <div   >
                        <span     class="card-color-preview_tag" style=" z-index: 2 ;background: var(--color-primary);">
                          Tag
                        </span>
                      </div>

                      <div style="  background: url(${notFound}); background-size: cover;     width: 80px;    height: 80px;    margin: -5px auto; " class="card-color-preview_icon">
                      
                      </div>

                      <div class="card-color-preview_mark">
                        Marca
                      </div>

                      <div class="card-color-preview_title">
                        Card de teste lorem Ipsum sit amet
                      </div>

                      <div class="card-color-preview_units ">
                        1 unidade
                      </div>

                      <div class="card-color-preview_stars">
                        ★★★★★
                      </div>

                      <div class="card-color-preview_price">
                        R$ 2,50
                      </div>

                      <div class="card-color-preview_button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                          <path d="M112 112C112 50.14 162.1 0 224 0C285.9 0 336 50.14 336 112V160H400C426.5 160 448 181.5 448 208V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V208C0 181.5 21.49 160 48 160H112V112zM160 160H288V112C288 76.65 259.3 48 224 48C188.7 48 160 76.65 160 112V160zM136 256C149.3 256 160 245.3 160 232C160 218.7 149.3 208 136 208C122.7 208 112 218.7 112 232C112 245.3 122.7 256 136 256zM312 208C298.7 208 288 218.7 288 232C288 245.3 298.7 256 312 256C325.3 256 336 245.3 336 232C336 218.7 325.3 208 312 208z"></path>
                        </svg>

                        Adicionar
                      </div>
                </div> `;
  return card;
}

function getRevenueCard() {
  const card = `<div class="card-color-preview2">
                     
                      <div style="  background: url(${notFound}); background-size: cover; background-position: center;    width: 100%;    height: 150px;    margin: -5px auto; " class="card-color-preview_icon"></div>
                      
                      <div style="display: block; width: 90%; margin: auto" class="card-color-preview_button">
                      <div class="lineContents">
                       <h1 style="text-align: left;font-size: 14px;width: 90%;margin: auto;" class="titulo8">Nome da Receita Caseira</h1> 
                      </div>
                       <br>
                       <br>
                   
                        <div class="lineContents">
                          <div style="text-align: center; width: 30%" class="col-md-3">
                            <p>+- 0mins</p>
                          </div>
                          <div style="text-align: center; width: 40%" class="col-md-6">
                            <p> &#183; 0 Ingredientes</p>
                          </div>
                          <div style="text-align: center; width: 30%" class="col-md-3">
                            <p> &#183; 0 porção</p>
                          </div> 
                        </div> 
                 
                      </div>
                </div> `;
  return card;
}
const dropzoneHtml = div.firstElementChild;
const dropzoneHtml2 = div2.firstElementChild;
const dropzoneHtml3 = div3.firstElementChild;

const dynamicContent = {
  produtos: () => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("content-dynamic");
    $("#dropdown-content-dynamic").click();

    const dropzone = dropzoneHtml2.cloneNode(1);
    const [input, image] = dropzone.children;

    wrapper.prepend(dropzone);
    const prev =
      createElementFromHTML(`<div style="display: none;position: absolute;margin: 300px;" class="dropzone-prev  justify-content-center">
      <button
        data-bs-toggle="modal"
        data-bs-target="#modalVitrine"
        class="dropzone-prev-button  backGold"
      >
        <text class="dropzone-prev-text">Editar Vitrine</text>
      </button>
      <button
        data-bs-toggle="modal"
        data-bs-target="#modalDeletaVitrine"
        class="dropzone-prev-button"
      >
        <text class="dropzone-prev-text">Excluir Vitrine</text>
      </button>
    </div>`);
    wrapper.setAttribute(
      "id",
      "produto_" + Math.random().toFixed(5).replace(".", "")
    );
    wrapper.appendChild(prev);
    content2.prepend(wrapper);
  },
  banners: () => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("content-dynamic", "content-dynamic_small");
    $("#dropdown-content-dynamic").click();

    for (let i = 0; i < 2; i++) {
      const dropzone = dropzoneHtml.cloneNode(1);
      const [input, image] = dropzone.children;

      dropzone.addEventListener("dragover", handleDragOver);
      dropzone.addEventListener("drop", handleDragDrop(input, image));
      input.addEventListener("change", handleSelectFile(dropzone, image));
      wrapper.appendChild(dropzone);
    }

    content2.prepend(wrapper);
  },
  receitas: () => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("content-dynamic");
    $("#dropdown-content-dynamic").click();

    const dropzone = dropzoneHtml3.cloneNode(1);
    // dropzone.addEventListener("dragover", handleDragOver);
    // dropzone.addEventListener("drop", handleDragDrop(input, image));
    // input.addEventListener("change", handleSelectFile(dropzone, image));
    wrapper.appendChild(dropzone);

    const prev =
      createElementFromHTML(`<div style="display: none;position: absolute;margin: 300px;" class="dropzone-prev  justify-content-center">
      <button
        data-bs-toggle="modal"
        data-bs-target="#modalReceitas"
        class="dropzone-prev-button  backGold"
      >
        <text class="dropzone-prev-text">Editar Vitrine</text>
      </button>
      <button
        data-bs-toggle="modal"
        data-bs-target="#modalDeletaVitrine"
        class="dropzone-prev-button"
      >
        <text class="dropzone-prev-text">Excluir Vitrine</text>
      </button>
    </div>`);
    wrapper.appendChild(prev);
    wrapper.setAttribute(
      "id",
      "revenue_" + Math.random().toFixed(5).replace(".", "")
    );
    content2.prepend(wrapper);
  },
};

document
  .querySelector("#content-dynamic-produtos")
  .addEventListener("click", dynamicContent.produtos);
document
  .querySelector("#content-dynamic-banners")
  .addEventListener("click", dynamicContent.banners);
document
  .querySelector("#content-dynamic-receitas")
  .addEventListener("click", dynamicContent.receitas);

const changeColor = (cssVar, value) => {
  console.log(cssVar, value);
  if (cssVar === "--color-primary") {
    homePage["mainColors"].first = value;
  } else if (cssVar === "--color-secondary") {
    homePage["mainColors"].second = value;
  } else if (cssVar === "--color-actions") {
    homePage["mainColors"].third = value;
  }
  document.querySelector(":root").style.setProperty(cssVar, value);
};

const handleChangeColor = (cssVar, label) => (e) => {
  changeColor(cssVar, e.target.value);
  label.innerHTML = e.target.value;
};

const inputColorPrimary = document.querySelector("#color-badge_input-primary");
const inputColorSecondary = document.querySelector(
  "#color-badge_input-secondary"
);
const inputColorActions = document.querySelector("#color-badge_input-actions");
const labelColorPrimary = document.querySelector("#color-badge_label-primary");
const labelColorSecondary = document.querySelector(
  "#color-badge_label-secondary"
);
const labelColorActions = document.querySelector("#color-badge_label-actions");

inputColorPrimary.addEventListener(
  "change",
  handleChangeColor("--color-temp-primary", labelColorPrimary)
);
inputColorSecondary.addEventListener(
  "change",
  handleChangeColor("--color-temp-secondary", labelColorSecondary)
);
inputColorActions.addEventListener(
  "change",
  handleChangeColor("--color-temp-actions", labelColorActions)
);

document
  .querySelector("#confirm-change-color")
  .addEventListener("click", () => {
    changeColor("--color-primary", inputColorPrimary.value);
    changeColor("--color-secondary", inputColorSecondary.value);
    changeColor("--color-actions", inputColorActions.value);
  });

const menu = document.querySelector("#menu");
const navMenu = document.querySelector("#nav-menu");

menu.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target)) {
    navMenu.classList.toggle("open");
  }
});

document.body.addEventListener("click", (e) => {
  e.target.contains(menu);
  e.target.contains(navMenu);

  if (!menu.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove("open");
  }
});

function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

//=========================== Área de CRUD =====================
let host = `https://api-smartcomerci.com.br:9090`;
async function uploadAndUpdateFile(element) {
  element
    .parent()
    .parent()
    .parent()
    .parent()
    .find("button")
    .each(function () {
      $(this).removeAttr("url");
    });

  element
    .parent()
    .parent()
    .parent()
    .parent()
    .find("input")
    .each(function () {
      $(this).removeAttr("url");
    });

  console.log(element);
  let files = element[0].files;
  var data = new FormData();
  data.append("fileimagem", files[0]);
  await $.ajax({
    url: host + "/uploadBanners",
    headers: {
      "x-access-token": localStorage.token,
      master_id: localStorage.MASTER_ID,
    },
    data: data,
    processData: false,
    contentType: false,
    type: "POST",
    success: function (data) {
      console.log(data);
      let URL = data.path.replace(`./public`, host);
      console.log(`URL`, URL);

      if (URL) {
        element
          .parent()
          .parent()
          .parent()
          .parent()
          .find("button")
          .each(function () {
            $(this).attr("url", URL);
          });

        element
          .parent()
          .parent()
          .parent()
          .parent()
          .find("input")
          .each(function () {
            $(this).attr("url", URL);
          });
      }
    },
    error: function (data) {},
  });
}

async function changePicture(element) {
  let origin = element.attr("origin");
  if (origin) {
    let thisURL = element.attr("url");
    if (thisURL) {
      console.log(origin.split("-"));
      if (origin.split("-").length === 1) {
        homePage[origin].url = thisURL;
      } else if (origin.split("-").length === 2) {
        homePage[origin.split("-")[0]][origin.split("-")[1]].url = thisURL;
      } else if (origin.split("-").length === 3) {
        homePage[origin.split("-")[0]][origin.split("-")[1]][
          origin.split("-")[2]
        ].url = thisURL;
      }
      if (origin === `newsletter` || origin === `whatsapp`) {
        GLOBAL_ELEMENT_EDIT.find(`.conteudoSalvo`).css(
          `background`,
          `url(${thisURL})`
        );
        GLOBAL_ELEMENT_EDIT.find(`.conteudoSalvo`).css(
          `background-position`,
          `center`
        );
        GLOBAL_ELEMENT_EDIT.find(`.conteudoSalvo`).css(
          `background-size`,
          `cover`
        );
        GLOBAL_ELEMENT_EDIT.find(`.conteudoSalvo`).css(`zoom`, `90%`);
      }

      GLOBAL_ELEMENT_EDIT.find(`img`).attr(`src`, thisURL);
      GLOBAL_ELEMENT_EDIT.addClass(`dropped`);
      console.log(homePage);
    } else {
      console.log("url ausente");
    }
  } else {
    console.log("origin ausente");
  }
  $(".btn-close").click();
}

async function changeLink(element) {
  let origin = element.attr("origin");
  if (origin) {
    let thisURL = element.attr("url");
    if (thisURL) {
      console.log(origin.split("-"));
      if (origin.split("-").length === 1) {
        homePage[origin].link = thisURL;
      } else if (origin.split("-").length === 2) {
        homePage[origin.split("-")[0]][origin.split("-")[1]].link = thisURL;
      } else if (origin.split("-").length === 3) {
        homePage[origin.split("-")[0]][origin.split("-")[1]][
          origin.split("-")[2]
        ].link = thisURL;
      }
      console.log(homePage);
    } else {
      console.log("url ausente");
    }
  } else {
    console.log("origin ausente");
  }
  $(".btn-close").click();
}

function nl2br(str) {
  var breakTag = "<br>";
  let ret = (str + "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, breakTag);

  return ret;
}

async function changeText(element) {
  let origin = element.attr("origin");
  if (origin) {
    let thisURL = element.attr("texto");
    if (thisURL) {
      console.log(origin.split("-"));
      if (origin.split("-").length === 1) {
        homePage[origin].text = thisURL;
      } else if (origin.split("-").length === 2) {
        homePage[origin.split("-")[0]][origin.split("-")[1]].text = thisURL;
      } else if (origin.split("-").length === 3) {
        homePage[origin.split("-")[0]][origin.split("-")[1]][
          origin.split("-")[2]
        ].text = thisURL;
      }
      thisURL = nl2br(thisURL);
      console.log(`thisURL`, thisURL);
      GLOBAL_ELEMENT_EDIT.find(`.textDemo`).html(thisURL);
      GLOBAL_ELEMENT_EDIT.addClass("dropped");
      GLOBAL_ELEMENT_EDIT.find(".contentP").css("padding", "25px");
      GLOBAL_ELEMENT_EDIT.find(".contentP").html(nl2br(thisURL));
      GLOBAL_ELEMENT_EDIT.css("background", "white");

      console.log(homePage);
    } else {
      console.log("texto ausente");
    }
  } else {
    console.log("origin ausente");
  }
  $(".btn-close").click();

  GLOBAL_ELEMENT_EDIT.addClass("dropped");
}

function setUrlButton(element, e) {
  element
    .parent()
    .parent()
    .parent()
    .parent()
    .find(".rounded-pill")
    .attr("url", element.val());
}
function setTxtButton(element, e) {
  element
    .parent()
    .parent()
    .parent()
    .parent()
    .find(".rounded-pill")
    .attr("texto", element.val());
}

function setMeSocialMidia(element, target) {
  let destiny = element.attr("destiny");
  if (destiny) {
    if (target === "active") {
      let active = element[0].checked;
      homePage["socialMidia"][destiny]["status"] = active;
    } else {
      let link = element.val();
      homePage["socialMidia"][destiny]["link"] = link;
    }
    GLOBAL_ELEMENT_EDIT.addClass("dropped");
    GLOBAL_ELEMENT_EDIT.css("background", "white");
    GLOBAL_ELEMENT_EDIT.find(".midiasSociais").show();
    setMidiasSociais();
    console.log(homePage);
  } else {
    console.log("destiny ausente");
  }
}

function setMeFooterMenu(element, contatctData) {
  if (!contatctData) {
    let destiny = element.attr("destiny");
    let link = element.attr("link");
    let description = element.attr("description");

    if (destiny) {
      homePage["footerLinks"][destiny].push({
        text: description,
        link: link,
      });

      console.log(homePage);
    } else {
      console.log("destiny ausente");
    }
  } else {
    let destiny = "contactData";
    let text = element.val();

    if (destiny) {
      homePage["footerLinks"][destiny].text = text;
      console.log(homePage);
    } else {
      console.log("destiny ausente");
    }
  }
  setLinksFooterElements();
}

function removeMeFooterMenu(element) {
  let destiny = element.attr("destiny");
  let link = element.attr("link");
  let description = element.attr("description");
  if (destiny) {
    let thisObject = homePage["footerLinks"][destiny];
    let newObject = [];
    for (const k in thisObject) {
      console.log(thisObject[k], description, link);
      if (thisObject[k].text !== description || thisObject[k].link !== link) {
        newObject.push({
          text: thisObject[k].text,
          link: thisObject[k].link,
        });
      }
    }
    console.log(newObject);
    homePage["footerLinks"][destiny] = newObject;
    console.log(homePage);
  } else {
    console.log("destiny ausente");
  }
  element.parent().parent().remove();
}

function addLink(element, destiny) {
  let link = element.parent().find(".linkContact").val();
  let text = element.parent().find(".textContact").val();

  GLOBAL_ELEMENT_EDIT.find(`.linksFooter`).show();
  GLOBAL_ELEMENT_EDIT.find(`.linksFooter`).css(`display`, `inline-flex`);
  GLOBAL_ELEMENT_EDIT.css(`background`, `white`);
  GLOBAL_ELEMENT_EDIT.addClass(`dropped`);

  if (link && text && link != "" && text != "") {
    element.attr("destiny", destiny);
    element.attr("link", link);
    element.attr("description", text);
    setMeFooterMenu(element);
    let HTML = `
                        <div class="cardSearch"> 
                          <div class="itemSearch" style="padding-top: 15px;">
                            <svg xmlns="http://www.w3.org/2000/svg" style="fill: #687c97;" width="13.5" height="23" viewBox="0 0 9 16">
                              <defs></defs>
                              <path class="a"
                                d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z">
                              </path>
                              <path class="a"
                                d="M2.5,16h-1A1.5,1.5,0,0,1,0,14.5v-1A1.5,1.5,0,0,1,1.5,12h1A1.5,1.5,0,0,1,4,13.5v1A1.5,1.5,0,0,1,2.5,16Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1a.5.5,0,0,0-.5-.5Zm1-3h-1A1.5,1.5,0,0,1,0,8.5v-1A1.5,1.5,0,0,1,1.5,6h1A1.5,1.5,0,0,1,4,7.5v1A1.5,1.5,0,0,1,2.5,10Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,8.5v-1A.5.5,0,0,0,2.5,7Zm1-3h-1A1.5,1.5,0,0,1,0,2.5v-1A1.5,1.5,0,0,1,1.5,0h1A1.5,1.5,0,0,1,4,1.5v1A1.5,1.5,0,0,1,2.5,4Zm-1-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1A.5.5,0,0,0,3,2.5v-1A.5.5,0,0,0,2.5,1Z"
                                transform="translate(5)"></path>
                            </svg> 
                          </div>
                          <div class="itemSearch" style="padding-top: 15px;width: 60%;">
                            <p class="cardText">${text}</p>
                          </div> 
                          <div class="itemSearch" style=" width: 300px;">
                            <button onclick="removeMeFooterMenu($(this))" link="${link}" description="${text}" destiny="${destiny}" style="zoom: 80%;background-color: white; border: 1px solid #f6b504; color: #f6b504; margin-right: 15px;"
                              type="button" id="picture-save-button" tabindex="6"  
                              class="btn btn-save rounded-pill">Remover da coluna</button>
                          </div>
                        </div>
                        `;
    element.parent().parent().parent().find(".areaMenus").append(HTML);
  }
}

function setColumnTitle(element) {
  let destiny = element.attr("destiny");
  if (destiny) {
    homePage["footerLinks"][destiny].text = element.val();
    console.log(homePage);
  } else {
    console.log("destiny ausente");
  }
}

function setLinksFooterElements() {
  $(`.linksInternosPrimeira`).html("");
  $(`.linksInternosSegunda`).html("");
  $(`.linksInternosTerceira`).html("");

  $(`.tituloLinkFooterPrimeira`).text(
    homePage.footerLinks.firstColumnTittle.text
  );
  homePage.footerLinks.firstColumn.forEach((element) => {
    $(`.linksInternosPrimeira`).append(
      `<a class="linkInterno" href="${element.link}"> ${element.text} <a>`
    );
  });
  $(`.tituloLinkFooterSegunda`).text(
    homePage.footerLinks.secondColumnTittle.text
  );
  homePage.footerLinks.secondColumn.forEach((element) => {
    $(`.linksInternosSegunda`).append(
      `<a class="linkInterno" href="${element.link}"> ${element.text} <a>`
    );
  });
  $(`.tituloLinkFooterTerceira`).text(
    homePage.footerLinks.thirdColumnTittle.text
  );
  homePage.footerLinks.thirdColumn.forEach((element) => {
    $(`.linksInternosTerceira`).append(
      `<a class="linkInterno" href="${element.link}"> ${element.text} <a>`
    );
  });
  $(`.contato`)
    .find(`.linksInternos`)
    .html(homePage.footerLinks.contactData.text);
}

function setMidiasSociais() {
  $(`.midiasSociais`).html(``);

  let youtube = `<svg  style="margin: 10px;${
    homePage.socialMidia.facebook.active === true ? `` : `display: block`
  } " xmlns="http://www.w3.org/2000/svg" width="22.939" height="16.129"
                  viewBox="0 0 22.939 16.129">
                  <path id="facebook"
                    d="M37.393,66.524a2.882,2.882,0,0,0-2.028-2.041C33.576,64,26.4,64,26.4,64s-7.173,0-8.962.482a2.882,2.882,0,0,0-2.028,2.041,32.453,32.453,0,0,0,0,11.114,2.839,2.839,0,0,0,2.028,2.009c1.789.482,8.962.482,8.962.482s7.173,0,8.962-.482a2.839,2.839,0,0,0,2.028-2.009,32.453,32.453,0,0,0,0-11.114ZM24.057,75.492V68.67l6,3.411Z"
                    transform="translate(-14.933 -64)" fill="#8897ad" />
                </svg><a>`;

  $(`.midiasSociais`).append(youtube);
  $(`.midiasSociais`).append(youtube);
  $(`.midiasSociais`).append(youtube);
}

//====================AREA FOR REQUEST========================

getMyObjectHomeMain();
async function getMyObjectHomeMain() {
  $.ajax({
    type: "POST",
    url: host + "/getById",
    data: {
      affiliate_id: localStorage.AFFILIATE_ID,
      table: "masters",
      id_name: "id",
      id_value: localStorage.MASTER_ID,
    },
    headers: {
      "x-access-token": localStorage.token,
    },
    success: function (data) {
      console.log("data", data);
      try {
        let news = JSON.parse(data[0].home_main_info);
        homePage = news;
        console.log(`home page`, homePage);
        start();
      } catch (err) {
        console.log(err);
      }
    },
    error: function (data) {
      console.log(data);
    },
    complete: function () {},
  });
}
function start() {
  $(`.dropzone`).each(function () {
    let origin = $(this).attr(`origin`);
    console.log(origin, origin.split(`-`).length);
    if (origin.split(`-`).length === 1) {
      $(this).addClass(`dropped`);
      $(this).find(`img`).attr(`src`, homePage[origin]?.url);
    } else if (origin.split(`-`).length === 2) {
      $(this).addClass(`dropped`);
      $(this)
        .find(`img`)
        .attr(`src`, homePage[origin.split(`-`)[0]][origin.split(`-`)[1]]?.url);
    } else if (origin.split(`-`).length === 3) {
      $(this).addClass(`dropped`);
      $(this)
        .find(`img`)
        .attr(
          `src`,
          homePage[origin.split(`-`)[0]][origin.split(`-`)[1]][
            origin.split(`-`)[2]
          ]?.url
        );
    }

    $(this).find(".conteudoSalvo").show();
    $(this)
      .find(".conteudoSalvo")
      .css("background", `url(${homePage[origin]?.url})`);
    $(this).find(".conteudoSalvo").css("background-size", "cover");
    $(this).find(".conteudoSalvo").css("background-position", "center");
    $(this).find(".linksFooter").show();
    if (origin === "footerLinks") {
      $(this).find(".linksFooter").css("display", "inline-flex");
    }
    if (origin === "legalText" || origin === "footerText") {
      $(this).find(".contentP").html(homePage[origin]?.text);
    }
  });
  setLinksFooterElements();
  setMidiasSociais();
}

// logarDev();
// async function logarDev() {
//   $.ajax({
//     type: "POST",
//     url: host + "/login",
//     data: {
//       user: `ronantj@hotmail.com`,
//       table: "users_affiliates",
//       prefix: "users_affiliate",
//       password: `mdt1234@`,
//     },
//     success: function (data) {
//       console.log(data);
//       localStorage.AFFILIATE_ID = data.data.users_affiliate_id;
//       localStorage.MASTER_ID = data.data.users_affiliate_master_id;
//       localStorage.token = data.token;
//     },
//     error: function (data) {
//       //console.log(data);
//       //   alertar("O login falhou!")
//     },
//     complete: function () {},
//   });
// }