import React from "react";
import {Card, CardBody, CardSubtitle, CardText, CardTitle} from "reactstrap";

const card = ({_id, title, body, user}) => {
    return (<Card key={_id}>
        <CardBody>
            <CardTitle>{title}</CardTitle>
            <CardSubtitle>Created
                by: {user.firstName} {user.lastName}</CardSubtitle>
            <CardText>{body}</CardText>
        </CardBody>
    </Card>)

};

const TicketCard = (props) => props.tickets.map((ticket) => (card(ticket)));

export {TicketCard}
