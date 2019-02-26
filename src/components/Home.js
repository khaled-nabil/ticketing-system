import React, {Component} from "react";
import {Query} from "react-apollo";
import {getUsers} from "../constants/queries";
import {Row, Col} from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <Row className="mt-5">
                <Col sm={4}>
                    Welcome to the homepage
                </Col>
                <Col sm={8}> <Query query={getUsers}>
                    {({loading, error, data}) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;
                        return data.users.map(({_id, firstName, lastName, email}) => (
                            <div key={_id}>
                                <p>{`${firstName} ${lastName} by ${email}`}</p>
                            </div>
                        ));
                    }}
                </Query>
                </Col>
            </Row>
        )
    }
}

export default Home;
