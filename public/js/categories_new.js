class Category {
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
  constructor() {}
}
class Subcategory {
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
  constructor() {}
}
const categoriesObject = {
  affiliateId: localStorage.AFFILIATE_ID,
  masterId: localStorage.MASTER_ID,
  limitToShow: 8,
  categories: [],
};
