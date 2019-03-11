import React, {Component, Fragment} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Create from "./create";
import View from "./view";

class Tickets extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<BrowserRouter>
            <Switch>
                <Route exact path='/tickets' render={() => <View/>}/>
                <Route path='/tickets/create' render={() => <Create/>}/>
            </Switch>
        </BrowserRouter>);
    }
}

export default Tickets;