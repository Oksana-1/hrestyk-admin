
import AppProducts from "../components/pages/AppProducts";
const routes = [
    { path: '/products', component: AppProducts },
    { path: '*', redirect: '/' }
]
export default routes;