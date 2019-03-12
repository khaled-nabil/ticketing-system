import React, {Component, Fragment} from "react";
import {Query} from "react-apollo";
import {getTickets} from "../constants/queries";
import {Row, Col, Card, Button, CardImg, CardTitle, CardText, CardDeck, CardSubtitle, CardBody} from 'reactstrap';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <Row className="mt-5">
                    <Col>
                        Welcome to the homepage
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <CardDeck>
                            <Query query={getTickets}>
                                {({loading, error, data}) => {
                                    if (loading) return <p>Loading...</p>;
                                    if (error) return <p>Error :(</p>;
                                    return data.Tickets.map(({_id, title, body, user}) => (
                                        <Card key={_id}>
                                            <CardBody>
                                                <CardTitle>{title}</CardTitle>
                                                <CardSubtitle>Created
                                                    by: {user.firstName} {user.lastName}</CardSubtitle>
                                                <CardText>{body}</CardText>
                                            </CardBody>
                                        </Card>
                                    ));
                                }}
                            </Query>
                        </CardDeck>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

export default Home;
