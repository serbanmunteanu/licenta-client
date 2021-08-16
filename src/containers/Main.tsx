import { Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import Conversations from "./Conversations";
import Homepage from "./Homepage";
import Login from "./Login";
import Posts from "./Posts";
import Register from "./Register";

interface Props {}

const Main = (props: Props) => {
  return (
    <>  
      <Navbar />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route exact path="/categories/:categoryId/posts">
          <Posts />
        </Route>
        <Route exact path="/conversations">
          <Conversations />
        </Route>
        <Route exact path="/">
          <Homepage />
        </Route>
      </Switch>
    </>
  );
};

export default Main;
