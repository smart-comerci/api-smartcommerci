const api_host = "https://api-smartcomerci.com.br:7070";
getCategories();
const categoriesObject = {
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
function addCategory() {
  let categoria = new Category(categoriesObject.categories.length);
  categoriesObject.categories.push(categoria);
  console.log(categoriesObject);
}
async function getCategories() {
  const resultado = await $.ajax({
    type: "GET",
    url: api_host + "/categorie_find/" + localStorage.AFFILIATE_ID,
    headers: {
      "x-access-token": localStorage.token,
    },
    data: "",
    success: function (data) {},
    error: function (data) {},
    complete: function () {},
  });
  if (!resultado) {
    const criaPrimeiroAcesso = await criarPrimeiroAcesso();
    console.log("Primeiro acesso", criaPrimeiroAcesso);
  } else {
    categoriesObject = resultado.data;
  }
  console.log(resultado, categoriesObject);
}
async function criarPrimeiroAcesso() {
  const resultado = await $.ajax({
    type: "POST",
    url: api_host + "/categorie_create",
    headers: {
      "x-access-token": localStorage.token,
    },
    data: categoriesObject,
    success: function (data) {},
    error: function (data) {},
    complete: function () {},
  });
  console.log(resultado);
}
