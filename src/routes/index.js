import HomePage from "../views/HomePage";
import ProductsPage from "../views/ProductsPage";
import SingleProductPage from "../views/SingleProductPage";
import MainSlider from "../views/MainSliderPage";
import OrdersPage from "../views/OrdersPage";
import SingleOrderPage from "@/views/SingleOrderPage";
import SettingsPage from "../views/SettingsPage";

const routes = [
  { path: "/", component: HomePage, name: "Головна" },
  { path: "/products", component: ProductsPage, name: "Товари" },
  { path: "/products/:id", component: SingleProductPage, name: "Товар" },
  { path: "/main-slider", component: MainSlider, name: "Слайдер" },
  { path: "/orders/all", component: OrdersPage, name: "Всі замовлення" },
  {
    path: "/orders/all/:page",
    component: OrdersPage,
    name: "Більше замовлень",
  },
  { path: "/orders/:id", component: SingleOrderPage, name: `Замовлення` },
  { path: "/settings", component: SettingsPage, name: "Налаштування" },
  { path: "*", redirect: "/" },
];
export default routes;
