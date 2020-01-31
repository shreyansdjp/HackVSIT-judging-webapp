import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import { getAuthInfo } from "@/shared/helpers";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (getAuthInfo()) {
        next({
          name: "home"
        });
      }
      next();
    }
  },
  {
    path: "/home",
    component: () => import("@/views/dashboard/Dashboard.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/dashboard/TeamSearch.vue")
      },
      {
        path: "/team/:teamId",
        name: "review",
        component: () => import("@/views/dashboard/Score.vue")
      }
    ],
    beforeEnter: (to, from, next) => {
      if (!getAuthInfo()) {
        next("/");
      }
      next();
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
