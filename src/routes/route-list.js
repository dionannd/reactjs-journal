import { Register, HomePage, DetailPage } from "pages";

const routeList = [
  {
    path: "/register",
    components: Register,
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
