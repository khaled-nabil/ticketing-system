import React, {Fragment} from "react";
import {CardDeck, Col, Row } from "reactstrap";
import {Query} from "react-apollo";
import {getTickets} from "../../constants/queries";
import {TicketCard} from "../shared/renderers/ticket-cards";

const Create = ({match}) => {
    return (<Fragment>
        <Row>
            <Col>
                <h1>Current tickets in the system</h1>
            </Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <CardDeck>
                    <Query query={getTickets}>
                        {({loading, error, data}) => {
                            if (loading) return <Col><p>Loading...</p></Col>;
                            if (error) return <Col><p>Error {error}</p></Col>;
                            return <TicketCard tickets={data.Tickets}/>
                        }}
                    </Query>
                </CardDeck>
            </Col>
        </Row>
    </Fragment>);
};
export default Create;
