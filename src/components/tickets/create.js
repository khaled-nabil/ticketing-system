import React, {Component, Fragment} from "react";
import {Col, Row, Button, Form, FormGroup, Label, Input, CardDeck} from 'reactstrap';
import {Query} from "react-apollo";
import {getTicketTypes} from "../../constants/queries";

const RenderTypes = (data) => {
    return (<FormGroup>
        <Label for="ticketType">Select</Label>
        <Input type="select" name="type" id="ticketType" value={data.val} onChange={data.handleChange} >
            <option>-- SELECT A TYPE --</option>
            {data.types.map(element => <option key={element.name} value={element.name}>{element.name.charAt(0)}{element.name.substr(1).toLowerCase()}</option>)}
        </Input>
    </FormGroup>);
};

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            body: "",
            type: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        //TODO: Use apollo client to commit mutation to the server. Server must get user ID from token (Node.js change)
    }
    render() {
        return (<Fragment>
            <h1>Create a new ticket</h1>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="ticketTitle">Title</Label>
                    <Input type="text" name="title" id="ticketTitle" placeholder="Ticket Title" value={this.state.title} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="ticketBody">Body</Label>
                    <Input type="textarea" name="body" id="ticketBody" value={this.state.body} onChange={this.handleChange} />
                </FormGroup>
                <Query query={getTicketTypes}>
                    {({loading, error, data}) => {
                        if (loading) return <p>Loading ticket types</p>;
                        if (error) return <p>Error loading ticket types</p>;
                        return <RenderTypes handleChange={this.handleChange} val={this.state.type} types={data.types.values}/>
                    }}
                </Query>
                <Button>Create</Button>
            </Form>

        </Fragment>);
    }
}

export default Create;
