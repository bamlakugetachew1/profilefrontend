import { createWebHistory, createRouter } from "vue-router";
import room from './components/room.vue'
import homepage from './components/homepage.vue'
import login from './components/login.vue'

import App from './App.vue'


// import App from './App.vue'
const routes = [
    {
        path: "/room",
        name: "room",
        component: room,
      },
      {
        path: "/",
        name: "login",
        component: login,
      },

      {
        path: "/homepage",
        name: "homepage",
        component: homepage,
      },

      {
        path: "/home",
        name: "App",
        component: App,
      },

    ];

    
    const router = createRouter({
        history: createWebHistory(),
        routes,
      });
      
    export default router;

