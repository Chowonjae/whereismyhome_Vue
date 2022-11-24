import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import NewsView from "../views/NewsView.vue";
import HospitalView from "../views/HospitalView.vue";
import CoronaView from "../views/CoronaView.vue";
import HouseView from "../views/HouseView.vue";
import AppBoard from "@/views/AppBoard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/hospital",
    name: "hospital",
    component: HospitalView,
  },
  {
    path: "/corona",
    name: "corona",
    component: CoronaView,
  },
  {
    path: "/house",
    name: "house",
    component: HouseView,
  },
  {
    path: "/mypage",
    name: "mypage",
    component: () => import("@/components/member/MyPage"),
  },
  {
    path: "/news",
    name: "news",
    component: NewsView,
  },
  {
    path: "/board",
    component: AppBoard,

    children: [
      {
        path: "",
        name: "boardlist",
        component: () => import("@/components/board/BoardList"),
      },
      {
        path: "write",
        name: "boardwrite",
        component: () => import("@/components/board/BoardWrite"),
      },
      {
        path: "view/:articleNo",
        name: "boardview",
        component: () => import("@/components/board/BoardView"),
      },
      {
        path: "modify",
        name: "boardmodify",
        component: () => import("@/components/board/BoardModify"),
      },
    ],
  },
  {
    path: "/qna",
    component: () => import("@/views/QnaBoard"),
    children: [
      {
        path: "",
        name: "qnalist",
        component: () => import("@/components/qna/QnaList"),
      },
      {
        path: "write",
        name: "qnawrite",
        component: () => import("@/components/qna/QnaWrite"),
      },
      {
        path: "view/:articleNo",
        name: "qnaview",
        component: () => import("@/components/qna/QnaView"),
      },
      {
        path: "modify/:articleNo",
        name: "qnamodify",
        component: () => import("@/components/qna/QnaModify"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
