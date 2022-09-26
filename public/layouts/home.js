let notFound =
  "https://api-smartcomerci.com.br/images/default/produto-sem-imagem.jpg";

let homePage = {
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
    firstColumn: [
      {
        text: "",
        link: "",
      },
    ],
    secondColumn: [
      {
        text: "",
        link: "",
      },
    ],
    thirdColumn: [
      {
        text: "",
        link: "",
      },
    ],
    fourtyColumn: [
      {
        text: "",
        link: "",
      },
    ],
  },
  footerLogo: {
    url: "",
    link: "",
  },
  footerText: "",
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
  legalText: "",
};

//================================NEWS UPDATES==============================
$(".dropzone").click(function (e) {
  e = window.event;
  e.stopPropagation();
  let origin = $(this).attr("origin");
  $("#modalChangePicture").attr("origin", origin);
  $("#modalChangePicture").find("input").attr("origin", origin);
  if ($(this).attr("src")) {
    $("#modalChangePicture").find("img").attr("src", $(this).attr("src"));
  }

  $("#modalMudaLink").attr("origin", origin);

  $("fundoModal").show();
  if ($(this).attr("origin") === "aside") {
    $(this).parent().parent().addClass("index9");
  } else {
    $(this).parent().addClass("index9");
  }

  $(this).parent().find(".dropzone-prev").show();
});

function showMyPrev(element) {
  let origin = element.attr("origin");
  $("#modalChangePicture").attr("origin", origin);
  $("#modalChangePicture").find("input").attr("origin", origin);
  if (element.attr("src")) {
    $("#modalChangePicture").find("img").attr("src", element.attr("src"));
  }

  $("#modalMudaLink").attr("origin", origin);
  element.parent().parent().find("label").addClass("index9");
  element.parent().parent().find("label").addClass("index9");
  element.parent().parent().addClass("index9");
  //element.parent().parent().parent().addClass("index9");
  element.parent().addClass("borderSelected");

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

function getProductCard() {
  const card = `<div class="card-color-preview">
                      <div   >
                        <span     class="card-color-preview_tag" style=" z-index: 2 ;background: var(--color-primary);">
                          Tag
                        </span>
                      </div>

                      <div style="  background: url(${notFound}); background-size: cover;     width: 80px;    height: 80px;    margin: -5px auto; " class="card-color-preview_icon">
                      ${
                        ""
                        //  <img  style="z-index: 0" src="" class="imgProductCard"/>
                      }
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
const dropzoneHtml = div.firstElementChild;
const dropzoneHtml2 = div2.firstElementChild;

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
