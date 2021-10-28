import asyncComponent from '../lib/asyncComponent';
const Home = asyncComponent(() => import("../views/home"));
const Editor = asyncComponent(() => import("../views/editor"));
export default {
    Home,
    Editor
}