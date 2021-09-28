import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "routes/PrivateRoute";
import { Login, Register } from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <Route component={Login} exact path="/" />
        <Route component={Register} exact path="/register" />
        <PrivateRoute />
      </Switch>
    </Router>
  );
}

export default App;
