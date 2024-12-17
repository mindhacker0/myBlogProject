import asyncComponent from '@/components/hoc/asyncComponent';
const Home = asyncComponent(() => import("../views/home"));

export default {
    Home
}