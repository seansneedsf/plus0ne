import * as React from "react";
import { Provider } from "react-redux";
import Home from "./components/Home";
import Preview from "./components/Preview";
import Details from "./components/Details";

import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./css/index.css";

class App extends React.Component{
    public render() {
        return (
            <Provider store={store}>
                <Router>
                    <Route exact={true} path="/" component={Home} />
                    <Route path="/event/:id" component={Preview} />
                    <Route path="/details/:id" component={Details} />
                </Router>
            </Provider>
        );
    }
}

export default App;
