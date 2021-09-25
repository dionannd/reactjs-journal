import { HomePage, DetailPage } from "pages";

const routeList = [
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
