import React from "react";
import {Link} from "react-router-dom";
import {Card, CardHeader, CardBody, CardSubtitle, CardText, CardTitle} from "reactstrap";

const card = ({_id, title, type, body, user}) => {
    return (<Card key={_id} className={"my-2"}>
        <CardHeader>{type} <Link to={`/tickets/edit/${_id}`}> <i className="far fa-edit"><span className={"sr-only"}>Edit Ticket</span></i></Link><i
            className="far fa-trash-alt"><span className={"sr-only"}>Delete Ticket</span></i></CardHeader>
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
