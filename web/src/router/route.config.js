import asyncComponent from '../lib/asyncComponent';
const Home = asyncComponent(() => import("../views/home"));
export default {
    Home
}