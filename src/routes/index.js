import Index from "../views/Index";
import Products from "../views/Products";
import MainSlider from "../views/MainSlider";
import Orders from "../views/Orders";
import Settings from "../views/Settings";
const routes = [
    { path: '/', component: Index, name: "Головна"},
    { path: '/products', component: Products, name: "Товари"},
    { path: '/main-slider', component: MainSlider, name: "Слайдер"},
    { path: '/orders', component: Orders, name: "Замовлення"},
    { path: '/settings', component: Settings, name: "Налаштування"},
    { path: '*', redirect: '/' }
]
export default routes;