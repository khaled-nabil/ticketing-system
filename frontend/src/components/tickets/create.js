import React, {Component} from "react";
import TicketForm from "./ticketForm"
import {createTicket} from "../../constants/queries";

class Create extends Component {
    constructor(props) {
        super(props);
        this.formData = {
            title: "",
            body: "",
            type: ""
        }
    }

    render() {
        return (<TicketForm {...(this.props)} formData={this.formData} mutation={createTicket}/>)
    }
}

export default Create;
