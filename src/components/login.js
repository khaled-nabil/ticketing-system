import React, {Component, Fragment} from "react";
import {Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'test@test.com',
            password: '123'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.fetchToken(this.state);
    }

    render() {
        return (
            <div>
                <Row id={"login-panel"} className={"justify-content-sm-center"}>
                    <Col sm="4" className={"border mt-5 py-3"}>
                        <h1 className={"h4 text-center"}>"Login"</h1>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="emailAddress">Email</Label>
                                <Input type="email" name="email" id="emailAddress" placeholder="with a placeholder"
                                       value={this.state.email} onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="userPassword">Password</Label>
                                <Input type="password" name="password" id="userPassword"
                                       placeholder="password placeholder" value={this.state.password}
                                       onChange={this.handleChange}/>
                            </FormGroup>
                            <Button>Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Login;
