import asyncComponent from '@/components/hoc/asyncComponent';
const Home = asyncComponent(() => import("../views/home"));
// const Editor = asyncComponent(() => import("../views/editor"));
// const Myblogs = asyncComponent(() => import("../views/myblogs"));
// const BlogDetail = asyncComponent(() => import("../views/blogDetail"));
// const MyProducts = asyncComponent(() => import("../views/myproducts"));
// const Recommands = asyncComponent(() => import("../views/recommands"));

export default {
    Home,
    // Editor,
    // Myblogs,
    // BlogDetail,
    // MyProducts,
    // Recommands
}