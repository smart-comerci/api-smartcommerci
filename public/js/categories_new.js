const api_host = "https://api-smartcomerci.com.br:7070";

const categoriesObject = {
  affiliateId: localStorage.AFFILIATE_ID,
  masterId: localStorage.MASTER_ID,
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

async function publicarAlteracoes() {
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
