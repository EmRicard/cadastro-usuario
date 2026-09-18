import { createRouter, createWebHistory } from "vue-router";
import AnimeView from "../views/AnimeView.vue";
import FormView from "../views/FormView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "animes",
      component: AnimeView,
    },
    {
      path: "/login",
      name: "login",
      component: FormView,
    },
  ],
});

export default router;
