import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Rapport from "../components/Rapport.vue";
import HelloWorld from "../views/HelloWorld.vue";
import store from "../store";
import Operations from "../views/Operations.vue";
import Sidebar from "../components/SideBar.vue";
Vue.use(VueRouter);

const router= new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes:[
    {
      path: "/",
      name: "Tunisie",
      component: HelloWorld,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        guest:true
      }
    },
    {
      path: "/Dashboard",
      name: "Home",
      component: Home,
      meta:{
        secure:true
      },
    },
    {
      path: "/operations/:id",
      name: "Operations",
      component: Operations,
      meta:{
        secure:true
      },
    },
    {
      path: "/Sidebar/",
      name: "Sidebar",
      component: Sidebar,
      meta:{
        secure:true
      },
    },
  {
    path: "/pointage",
    name: "Pointage",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
      meta:{
        secure:true
      }
  },
  {
    path: "/ta9wa",
    name: "Ta9wa",
    component: () => import("../views/Takwa.vue"),
    meta:{
      secure:true
    },
  },
  {
    path: "/Clients",
    name: "Clients",
    component: () => import("../views/Clients.vue"),
    meta:{
      secure:true
    },
  },

    {
      path: "/Employees",
      name: "employees",
      component: () => import("../views/Employees.vue"),
      meta:{
        secure:true
      },
    },
    {
      path: "/clientmissions",
      name: "clientmissions",
      component: () => import("../views/Clientmissions.vue"),
      meta:{
        secure:true
      },
    },
    {
      path: "/Articles/:id",
      name: "Articles",
      component: () => import("../views/Article.vue"),
      meta:{
        secure:true
      },
    },

  {
    path: "/Missions",
    name: "missions",
    component: () => import("../views/Missions.vue"),
    meta:{
      secure:true
    },
  },
  {
    path: "/rapport/:id",
    name: "rapport",
    component: Rapport,
    meta:{
      secure:true
    },
    
  },
  {
    path :'/*',
    name: "Home",
    component: Home,
    meta:{
      secure:true
    },}
]
});

router.beforeEach((to, from, next) => {
if(store.getters.getRole=="client"&&to.name!="clientmissions"&&to.name!="login"
&&to.name!="Tunisie"&&to.name!="Operations"){
  next('/clientmissions')

}else if(store.getters.getRole=="responsable"&&to.name!="missions"&&to.name!="login"
&&to.name!="Tunisie"&&to.name!="Operations"){
  next('/missions')
}
else
  if (to.matched.some(record=>record.meta.secure)){
 
    if(!store.state.loggedIn){
      next({
        path:'/login'
      })
    }else{
      next()
    }
  }else{
    next();
  }
  if (to.matched.some(record=>record.meta.guest)){
    if(!store.state.loggedIn){
      next()
    }else{
      next({
        path:'/Dashboard'
      })
    }
  }else{
    next()
  }
})
export default router;
