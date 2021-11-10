import { HomePage, TransactionPage, RegisterPage } from "pages";

const routeList = [
  {
    path: "/register",
    component: RegisterPage,
  },
  {
    path: "/home",
    component: HomePage,
  },
  {
    path: "/home/transaction/:id",
    component: TransactionPage,
  },
];

export default routeList;
