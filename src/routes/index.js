
import AppProducts from "../components/pages/AppProducts";
const routes = [
    { path: '/products', component: AppProducts, name: "Товари"},
    { path: '*', redirect: '/' }
]
export default routes;