import { HomePage, DetailPage, Register } from "pages";

const routeList = [
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/home",
    component: HomePage,
  },
  {
    path: "/home/transaction/:id",
    component: DetailPage,
  },
];

export default routeList;
