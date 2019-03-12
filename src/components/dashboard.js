import React, {Component, Fragment} from "react";
import {Query} from "react-apollo";
import {getTickets} from "../constants/queries";
import {Row, Col, CardDeck} from 'reactstrap';
import {TicketCard} from "./shared/renderers/ticket-cards";

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Row className="mt-5">
                    <Col>
                        <h1>Welcome to the homepage</h1>
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
            </Fragment>
        )
    }
}

export default Dashboard;
