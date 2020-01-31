import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
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
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
