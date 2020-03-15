import Vue from "vue";
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const Home = () => import('../views/home/Home');
const Category = () => import('../views/category/Category');
const Cart = () => import('../views/cart/Cart');
const Profile = () => import('../views/profile/Profile');
const Detail = () => import('../views/detail/Detail');


export default new VueRouter({
   routes:[
      {
         path: '',
         redirect: '/home'
      },
      {
         path: '/home',
         component: Home
      },
      {
         path: '/category',
         component: Category
      },
      {
         path: '/cart',
         component: Cart
      },
      {
         path: '/profile',
         component: Profile
      },
      {
         path:'/detail/:id',
         component: Detail
      }
   ],
   mode:'history'
})

