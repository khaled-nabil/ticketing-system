import React, {Fragment} from "react";
import {Card, CardBody, CardDeck, CardSubtitle, CardText, CardTitle, Col, Row} from "reactstrap";
import {Query} from "react-apollo";
import {getTickets} from "../../constants/queries";

const Create = ({ match }) => {
    return (<Fragment>
        <Row>
            <Col>
                Current tickets in the system
            </Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <CardDeck>
                    <Query query={getTickets}>
                        {({loading, error, data}) => {
                            if (loading) return <Col><p>Loading...</p></Col>;
                            if (error) return <Col><p>Error {error}</p></Col>;
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
    </Fragment>);
};
export default Create;
