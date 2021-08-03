import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

interface Props {}

const Main = (props: Props) => {
  return (
    <>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route exact path="/">
          Homepage
        </Route>
      </Switch>
    </>
  );
};

export default Main;
