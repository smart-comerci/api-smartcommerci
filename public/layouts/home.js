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
$(".dropzone").click(function () {
  let origin = $(this).attr("origin");
  $("#modalChangePicture").attr("origin", origin);
});

window.onbeforeunload = async function () {
  if ([].length > 0) {
    $("#modalNaoSalvou").click();
    setTimeout(() => {
      return confirm("Necessário salvar");
    }, 2000);
  }
};

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
  input.addEventListener("change", handleSelectFile(dropzone, image));
});

const dropdown = document.querySelector(".styled-dropdown");

dropdown.previousElementSibling.addEventListener("click", () => {
  dropdown.classList.toggle("show");
});

const content = document.querySelector(".preview-home_content");
const div = document.createElement("div");
div.innerHTML = `
      <label class="dropzone">
        <input type="file" />
        <img src="" />
        <span class="rounded-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/>
          </svg>
        </span>
      </label>
    `;
const dropzoneHtml = div.firstElementChild;

const dynamicContent = {
  produtos: () => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("content-dynamic");

    for (let i = 0; i < 3; i++) {
      const dropzone = dropzoneHtml.cloneNode(1);
      const [input, image] = dropzone.children;

      dropzone.addEventListener("dragover", handleDragOver);
      dropzone.addEventListener("drop", handleDragDrop(input, image));
      input.addEventListener("change", handleSelectFile(dropzone, image));
      wrapper.appendChild(dropzone);
    }

    content.appendChild(wrapper);
  },
  banners: () => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("content-dynamic", "content-dynamic_small");

    for (let i = 0; i < 2; i++) {
      const dropzone = dropzoneHtml.cloneNode(1);
      const [input, image] = dropzone.children;

      dropzone.addEventListener("dragover", handleDragOver);
      dropzone.addEventListener("drop", handleDragDrop(input, image));
      input.addEventListener("change", handleSelectFile(dropzone, image));
      wrapper.appendChild(dropzone);
    }

    content.appendChild(wrapper);
  },
  receitas: () => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("content-dynamic");

    for (let i = 0; i < 2; i++) {
      const dropzone = dropzoneHtml.cloneNode(1);
      const [input, image] = dropzone.children;

      dropzone.addEventListener("dragover", handleDragOver);
      dropzone.addEventListener("drop", handleDragDrop(input, image));
      input.addEventListener("change", handleSelectFile(dropzone, image));
      wrapper.appendChild(dropzone);
    }

    content.appendChild(wrapper);
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
