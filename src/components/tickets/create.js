import React, {Component, Fragment} from "react";
import {Col, Row, Button, Form, FormGroup, Label, Input, CardDeck, Alert} from 'reactstrap';
import {Query} from "react-apollo";
import {getTicketTypes, createTicket} from "../../constants/queries";

const RenderTypes = (data) => {
    return (<FormGroup>
        <Label for="ticketType">Select</Label>
        <Input type="select" name="type" id="ticketType" value={data.val} onChange={data.handleChange}>
            <option>-- SELECT A TYPE --</option>
            {data.types.map(element => <option key={element.name}
                                               value={element.name}>{element.name.charAt(0)}{element.name.substr(1).toLowerCase()}</option>)}
        </Input>
    </FormGroup>);
};

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                title: "",
                body: "",
                type: ""
            },
            error: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({formData: {...this.state.formData, [event.target.name]: event.target.value}});
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({error: false});
        let valid = await this.props.client.mutate({
            mutation: createTicket,
            variables: {title: this.state.formData.title, body: this.state.formData.body, type:this.state.formData.type}
        }).then(response => {
            return response.data
        }).catch(error => {
            console.error(error);
            return false
        });
        this.setState({error: !valid});
    }

    render() {
        return (<Fragment>
            <h1>Create a new ticket</h1>
            {this.state.error && <Alert color="danger">
                An error occurred while creating ticket
            </Alert>}
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="ticketTitle">Title</Label>
                    <Input type="text" name="title" id="ticketTitle" placeholder="Ticket Title" value={this.state.formData.title}
                           onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="ticketBody">Body</Label>
                    <Input type="textarea" name="body" id="ticketBody" value={this.state.formData.body}
                           onChange={this.handleChange}/>
                </FormGroup>
                <Query query={getTicketTypes}>
                    {({loading, error, data}) => {
                        if (loading) return <p>Loading ticket types</p>;
                        if (error) return <p>Error loading ticket types</p>;
                        return <RenderTypes handleChange={this.handleChange} val={this.state.formData.type}
                                            types={data.types.values}/>
                    }}
                </Query>
                <Button>Create</Button>
            </Form>

        </Fragment>);
    }
}

export default Create;
