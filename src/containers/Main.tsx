import { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ConversationsProvider } from "../context/ConversationsProvider";
import { UserContext } from "../context/UserContext";
import Conversations from "./Conversations";
import Homepage from "./Homepage";
import Login from "./Login";
import Posts from "./Posts";
import Register from "./Register";

interface Props {}

const Main = (props: Props) => {
  const { userData } = useContext(UserContext);

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route exact path="/categories/:categoryId/posts">
          <Posts />
        </Route>
        {userData ? (
          <Route exact path="/conversations">
            <ConversationsProvider token={userData.token}>
              <Conversations />
            </ConversationsProvider>
          </Route>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </>
  );
};

export default Main;
