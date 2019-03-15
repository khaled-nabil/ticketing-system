import React, {Component} from "react";
import {Row, Col, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                email: 'test@test.com',
                password: '123'
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
        this.setState({error:false});
        let valid = await this.props.fetchToken(this.state.formData);
        this.setState({error:!valid});
    }

    render() {
        return (
            <div>
                <Row id={"login-panel"} className={"justify-content-sm-center"}>
                    <Col sm="4" className={"border mt-5 py-3"}>
                        <h1 className={"h4 text-center"}>Login</h1>
                        {this.state.error && <Alert color="danger">
                            Incorrect credentials
                        </Alert>}
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="emailAddress">Email</Label>
                                <Input type="email" name="email" id="emailAddress" placeholder="with a placeholder"
                                       value={this.state.formData.email} onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="userPassword">Password</Label>
                                <Input type="password" name="password" id="userPassword"
                                       placeholder="password placeholder" value={this.state.formData.password}
                                       onChange={this.handleChange}/>
                            </FormGroup>
                            <Button type={"submit"} className={"submitForm"}>Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Login;
