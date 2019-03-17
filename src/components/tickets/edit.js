import React, {Component} from "react";
import TicketForm from "./ticketForm"
import {createTicket} from "../../constants/queries";

class Create extends Component {
    constructor(props) {
        super(props);
        console.log(props.match.params.id);
        //TODO: Get ticket by id, pass ticket data, and pass id which will be used to update. Create update mutation accordingly.
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
