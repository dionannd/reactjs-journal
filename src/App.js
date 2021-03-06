import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "routes/PrivateRoute";
import { LoginPage, RegisterPage } from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <Route component={LoginPage} exact path="/" />
        <Route component={RegisterPage} exact path="/register" />
        <PrivateRoute />
      </Switch>
    </Router>
  );
}

export default App;
