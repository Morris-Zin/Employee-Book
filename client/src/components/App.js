import React from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import AuthForm from "./Auth/AuthForm";
import LandingPage from "./LandingPage/LandingPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <CssBaseline>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route exact path="/auth" component={AuthForm} />
            <Route component={Home} />
          </Switch>
        </CssBaseline>
      </BrowserRouter>
    </div>
  );
};

export default App;
