import React, {Component, Fragment} from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Create extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (<Fragment>
            <h1>Create a new ticket</h1>
            <Form>
                <FormGroup>
                    <Label for="ticketTitle">Title</Label>
                    <Input type="text" name="title" id="ticketTitle" placeholder="Ticket Title" />
                </FormGroup>
                <FormGroup>
                    <Label for="ticketBody">Body</Label>
                    <Input type="textarea" name="text" id="ticketBody" />
                </FormGroup>
                <Button>Create</Button>
            </Form>

        </Fragment>);
    }
}

export default Create;
