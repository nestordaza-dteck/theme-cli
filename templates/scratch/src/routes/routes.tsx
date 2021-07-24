import { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { WebsiteContext } from "../data/website.context";
import Home from "../pages/home/home";

const Routes = () => {
  const { website } = useContext(WebsiteContext);

  return (
    <div id="theme">
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default Routes;
