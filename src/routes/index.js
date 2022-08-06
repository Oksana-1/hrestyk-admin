import HomePage from "../views/HomePage";
import ProductsPage from "../views/ProductsPage";
import SingleProductPage from "../views/SingleProductPage";
import MainSlider from "../views/MainSliderPage";
import OrdersPage from "../views/OrdersPage";
import SingleOrderPage from "@/views/SingleOrderPage";
import SettingsPage from "../views/SettingsPage";
import LoginPage from "@/views/LoginPage";

const routes = [
  { path: "/", component: HomePage, name: "Головна", props: true },
  { path: "/products", component: ProductsPage, name: "Товари", props: true },
  {
    path: "/products/:id",
    component: SingleProductPage,
    name: "Товар",
    props: true,
  },
  { path: "/main-slider", component: MainSlider, name: "Слайдер", props: true },
  {
    path: "/orders/all",
    component: OrdersPage,
    name: "Всі замовлення",
    props: true,
  },
  {
    path: "/orders/all/:page",
    component: OrdersPage,
    name: "Більше замовлень",
    props: true,
  },
  {
    path: "/orders/:id",
    component: SingleOrderPage,
    name: `Замовлення`,
    props: true,
  },
  {
    path: "/settings",
    component: SettingsPage,
    name: "Налаштування",
    props: true,
  },
  { path: "/login", component: LoginPage, name: "Логін", props: true },
  { path: "*", redirect: "/" },
];
export default routes;
